
async function initializePage() {
    // get the installed wallets for the user to select
    const cardano = await waitForCardano();
    populateWalletDropdown(cardano);

    // Retrieve dynamic data from the injected script
    const injectedScript = document.getElementById("injected-data");
    const injectedNetworkScript = document.getElementById("injected-network-data");
    const injectedData = JSON.parse(injectedScript.textContent || "{}");
    const injectedNetwork = JSON.parse(injectedNetworkScript.textContent || "");

    // we can change the status with this element
    const statusElement = document.getElementById("status");
    const txLinkElement = document.getElementById("tx_link");

    // we can push tx cbor for easy viewing here
    const txCborElement = document.getElementById("tx_cbor");
    txCborElement.textContent = injectedData.message;

    // we need to wait for the wallet, enable it, then sign the injected data
    try {
        const walletObject = await waitForWallet();
        const wallet = await walletObject.enable();

        // we need to make sure that the wallet is actually on the correct network
        const network_int = await wallet.getNetworkId();
        if (injectedNetwork.network === "preprod.") {
            if (network_int !== 0) {
                statusElement.textContent = "Wallet is not using pre-production. Please switch to the pre-production network and try again.";
                return;
            }
        } else {
            if (network_int !== 1) {
                statusElement.textContent = "Wallet is not using Mainnet. Please switch to mainnet and try again.";
                return;
            }
        }

        // the wallet should be enabled and on the correct network
        statusElement.textContent = "Wallet connected successfully!";

        try {
            const sig_part = await wallet.signTx(injectedData.message);

            // initialize these as they will be built out here
            let sig;
            let complete_tx;
            if (injectedData.message.indexOf("a105") === -1) {
                complete_tx = injectedData.message.replace("a0f5f6", sig_part + "f5f6")
            } else {
                // smart contract exists as there is a redeemer
                sig = "a2" + sig_part.slice(2);
                const redeemer_part = injectedData.message.slice(injectedData.message.indexOf("a105"));
                complete_tx = injectedData.message.replace(redeemer_part, sig) + redeemer_part.slice(2);
            }

            // lets use cardanoscan to view it
            let tx_hash = await wallet.submitTx(complete_tx);
            txLinkElement.href = "https://" + injectedNetwork.network + "cardanoscan.io/transaction/" + tx_hash; // Set the href attribute
            txLinkElement.textContent = "View Transaction On Cardanoscan";

            statusElement.textContent = "Transaction successfully submitted! It will take a few moments to hit the chain. Please close this tab and crtl-c the server in the terminal. The transaction can be viewed on Cardanoscan by clicking the View Transaction On Cardanoscan button.";
        } catch (error) {
            statusElement.textContent = "Failed to connect wallet: " + error.message;
        }
    } catch (error) {
        statusElement.textContent = "Failed to connect wallet: " + error.message;
    }
}

async function waitForWallet() {
    return new Promise((resolve, reject) => {

        let attempts = 0;
        const maxAttempts = 3000;
        let walletName = "";

        const interval = setInterval(async () => {
            if (window.cardano && window.cardano[walletName]) {
                if (await window.cardano[walletName].isEnabled() === true) {
                    clearInterval(interval);
                    resolve(window.cardano[walletName]);
                } else {
                    const statusElement = document.getElementById("status");
                    statusElement.textContent = "Wallet is not enabled. Please try a different wallet.";
                }
            } else if (attempts >= maxAttempts) {
                clearInterval(interval);
                reject(new Error("Wallet not found after waiting."));
            }
            attempts++;

            // we let the user select a wallet to use first
            const walletDropdownElement = document.getElementById("wallet_dropdown");
            walletName = walletDropdownElement.value;

        }, 100);
    });
}

async function waitForCardano() {
    return new Promise((resolve, reject) => {
        let attempts = 0;
        const maxAttempts = 3000; // Adjust attempts as needed
        const interval = setInterval(() => {
            if (window.cardano && Object.keys(window.cardano).length > 0) {
                clearInterval(interval);
                resolve(window.cardano); // Resolve with the wallets
            } else if (attempts >= maxAttempts) {
                clearInterval(interval);
                reject(new Error("Cardano wallets not found after waiting."));
            }
            attempts++;
        }, 100); // Check every 100ms
    });
}

function populateWalletDropdown(cardano) {
    // auto populate the dropdown with the installed wallets
    const walletDropdown = document.getElementById('wallet_dropdown');
    for (const key in cardano) {
        try {
            const _wallet = window.cardano[key];
            if (_wallet === undefined) continue;
            if (_wallet.name === undefined) continue;
            if (_wallet.icon === undefined) continue;
            if (_wallet.apiVersion === undefined) continue;

            const option = document.createElement('option');
            option.value = key;
            option.textContent = _wallet.name.charAt(0).toUpperCase() + _wallet.name.slice(1); // Capitalize first letter
            walletDropdown.appendChild(option);
        } catch (e) {}
    }
}

document.addEventListener("DOMContentLoaded", initializePage);
