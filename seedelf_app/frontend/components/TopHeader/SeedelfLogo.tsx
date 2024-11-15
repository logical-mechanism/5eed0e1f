import React from 'react';

function SeedelfLogo({ size = 40, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M0 0 C132 0 264 0 400 0 C400 112.2 400 224.4 400 340 C268 340 136 340 0 340 C0 227.8 0 115.6 0 0 Z " fill="#0F1C2D" transform="translate(0,30)"/>
      <path d="M0 0 C1.63136313 3.26272626 1.49170705 5.38428951 1 9 C-1.08522453 11.77671783 -3.6651972 13.89536498 -6.3125 16.125 C-7.79389381 17.44381178 -9.27042848 18.76810087 -10.7421875 20.09765625 C-11.47018555 20.7539502 -12.19818359 21.41024414 -12.94824219 22.08642578 C-24.63816258 32.98904311 -34.21786563 47.13490653 -40 62 C-40.46019531 63.12341797 -40.46019531 63.12341797 -40.9296875 64.26953125 C-43.87945989 72.51484742 -43.72636044 81.33789243 -44 90 C-27.17231542 88.34539503 -11.24323781 86.58397533 4.4921875 80.0234375 C6.16789695 79.33958099 7.86180037 78.69876279 9.5703125 78.1015625 C16.96137965 75.45705223 22.60460147 71.59309779 27 65 C27.99 65 28.98 65 30 65 C31.90234375 67.265625 31.90234375 67.265625 33.9375 70.25 C38.8418635 77.39572883 38.8418635 77.39572883 46 82 C43.476603 88.21983261 37.17455295 91.55867998 31.28125 94.234375 C28.54405499 95.25689038 25.79411476 96.14635249 23 97 C22.16082031 97.2990625 21.32164062 97.598125 20.45703125 97.90625 C12.05638307 100.65139373 3.72760161 100.27625468 -5 100 C-4.67 99.01 -4.34 98.02 -4 97 C1.02296004 95.86983399 4.97874074 96.22083908 10 97 C10 96.236875 10 95.47375 10 94.6875 C11 92 11 92 12.84765625 91.08129883 C13.57855469 90.83404053 14.30945313 90.58678223 15.0625 90.33203125 C15.79597656 90.07784424 16.52945313 89.82365723 17.28515625 89.56176758 C17.85105469 89.37638428 18.41695312 89.19100098 19 89 C3.62522294 91.71533057 3.62522294 91.71533057 -11 97 C-21.48794645 101.69044272 -31.69788792 103.53203824 -43 105 C-42.50925514 110.85346276 -41.61031699 116.28163625 -39.8125 121.875 C-39.59110352 122.56480957 -39.36970703 123.25461914 -39.14160156 123.96533203 C-34.78570487 137.01175902 -27.32433542 148.91216655 -14.984375 155.6953125 C-4.23843293 160.39314581 7.53901317 162.76592491 19 165 C19 165.99 19 166.98 19 168 C42.73185226 160.17518103 60.19769905 138.34393602 71.3125 116.8125 C75.03675146 109.05450251 78.00325702 101.26733537 79.5078125 92.77734375 C80 91 80 91 82 89 C84.27734375 88.76953125 84.27734375 88.76953125 86.9375 88.8125 C88.25041016 88.82216797 88.25041016 88.82216797 89.58984375 88.83203125 C92 89 92 89 95 90 C95.67293106 96.82408966 93.34061684 101.847263 90.5625 108 C89.87861206 109.5324939 89.87861206 109.5324939 89.1809082 111.09594727 C82.3496552 126.11996407 73.77445632 138.53072138 63 151 C62.49033691 151.59619141 61.98067383 152.19238281 61.45556641 152.80664062 C54.38953563 161.01235379 46.85286278 167.7794085 38 174 C37.41347656 174.41878418 36.82695312 174.83756836 36.22265625 175.26904297 C22.02922334 185.34561725 8.13741888 192.54515108 -9 196 C-9.70906494 196.17732666 -10.41812988 196.35465332 -11.14868164 196.53735352 C-18.95344734 198.37429421 -26.7217084 198.26466736 -34.6875 198.1875 C-36.21191264 198.17854619 -37.73632677 198.16984414 -39.26074219 198.16137695 C-43.32565395 198.13356531 -47.39012829 198.08697271 -51.45477295 198.03320312 C-54.0363896 197.99952529 -56.61803361 197.97036839 -59.19970703 197.94140625 C-63.54226691 197.88968532 -67.88418038 197.81880464 -72.22622681 197.73452759 C-73.88319793 197.70365185 -75.54025007 197.67680829 -77.19735718 197.65438843 C-104.75929359 197.25656117 -128.53040248 188.44404798 -150 171 C-151.54057855 169.83189686 -153.08218455 168.66514708 -154.625 167.5 C-174.3151063 152.05468111 -174.3151063 152.05468111 -177 144 C-177.66 144 -178.32 144 -179 144 C-180.64399895 141.84568911 -182.14716206 139.70296312 -183.625 137.4375 C-184.07012939 136.75856689 -184.51525879 136.07963379 -184.97387695 135.38012695 C-197.39678963 116.14959135 -209.41199287 92.0069728 -208.66015625 68.50390625 C-207.60883001 64.51633157 -205.24332833 62.55773752 -202.04296875 60.109375 C-200 59 -200 59 -197 59 C-196.87322876 60.01646606 -196.87322876 60.01646606 -196.74389648 61.0534668 C-192.63328214 92.98273777 -182.77461974 119.16078075 -162 144 C-161.40960938 144.74894531 -160.81921875 145.49789062 -160.2109375 146.26953125 C-152.46303848 155.68240431 -139.41429668 166.44821291 -127 168 C-127 167.34 -127 166.68 -127 166 C-122.52032789 163.48971935 -118.39845893 162.3707694 -113.375 161.625 C-99.51119848 159.27155228 -85.89867109 153.29142487 -77 142 C-69.91576503 131.26671569 -63.30056578 119.28901838 -65 106 C-66.48617175 104.51382825 -67.99448966 104.54014723 -70.05078125 104.16796875 C-70.88859131 104.01126709 -71.72640137 103.85456543 -72.58959961 103.69311523 C-73.48815674 103.52626221 -74.38671387 103.35940918 -75.3125 103.1875 C-82.15150577 101.87543882 -88.64541501 100.31400543 -95.203125 97.93359375 C-98.33458912 96.88831453 -101.4594795 96.18799976 -104.6875 95.5 C-110.21267982 94.2663494 -114.99775124 92.63723999 -120 90 C-120.92296875 89.51789063 -121.8459375 89.03578125 -122.796875 88.5390625 C-130.71140898 84.17171603 -137.21785487 78.91339874 -144 73 C-145.00353516 72.19755859 -145.00353516 72.19755859 -146.02734375 71.37890625 C-156.61430395 62.90453675 -164.88081429 49.98340535 -171 38 C-171 37.01 -171 36.02 -171 35 C-172.98 35 -174.96 35 -177 35 C-177.53796667 41.00096128 -177.53796667 41.00096128 -174.8125 46.25 C-171.76979989 49.22508455 -168.87945549 51.94305463 -165.15234375 54.0390625 C-160.02017191 56.94630435 -156.89941724 60.23220173 -153.4453125 65.01171875 C-152.0125106 67.09161832 -152.0125106 67.09161832 -150 69 C-150 69.99 -150 70.98 -150 72 C-149.071875 72.185625 -149.071875 72.185625 -148.125 72.375 C-146 73 -146 73 -144 75 C-144 75.99 -144 76.98 -144 78 C-142.515 78.495 -142.515 78.495 -141 79 C-141.0825 79.969375 -141.165 80.93875 -141.25 81.9375 C-141.28994907 86.81128713 -139.16626615 90.73516351 -137 95 C-138.65 94.34 -140.3 93.68 -142 93 C-142 92.34 -142 91.68 -142 91 C-142.72574219 90.89816406 -143.45148438 90.79632813 -144.19921875 90.69140625 C-157.73095071 87.35093685 -168.08225725 71.98256817 -174.91796875 60.88671875 C-182.27018243 47.54613486 -186.87850052 29.12615201 -183 14 C-179.88058585 12.44029292 -176.5582823 12.81599576 -173.1328125 12.796875 C-172.34284882 12.79117493 -171.55288513 12.78547485 -170.73898315 12.77960205 C-169.05940084 12.77014055 -167.37979987 12.76361352 -165.70019531 12.75976562 C-163.16957334 12.75016903 -160.63980241 12.71920465 -158.109375 12.6875 C-144.89500253 12.59705378 -134.03552803 14.2861412 -122.3125 20.75 C-121.49233398 21.1931958 -120.67216797 21.6363916 -119.82714844 22.09301758 C-114.11052784 25.24149141 -108.82735974 28.57758434 -104 33 C-103.40574219 33.50402344 -102.81148438 34.00804687 -102.19921875 34.52734375 C-93.08467389 42.79308399 -85.74181003 55.59137609 -84.765625 67.97265625 C-84.75234605 70.33298903 -84.81267024 72.64797083 -85 75 C-94.49784614 74.66079121 -99.64077291 69.73329927 -106 63 C-107.86376972 60.7996414 -107.86376972 60.7996414 -110.625 60.3125 C-114.48425132 58.81168004 -116.770735 56.83006272 -119.77734375 54.046875 C-120.51082031 53.37140625 -121.24429688 52.6959375 -122 52 C-122.49677246 51.52900879 -122.99354492 51.05801758 -123.50537109 50.57275391 C-127.89149195 46.57930728 -132.29614856 44.14772851 -137.75 41.875 C-138.54132324 41.535896 -139.33264648 41.19679199 -140.14794922 40.84741211 C-142.42506233 39.88044116 -144.70962857 38.93506949 -147 38 C-148.65128906 37.32517578 -148.65128906 37.32517578 -150.3359375 36.63671875 C-155.63279104 34.5966141 -160.36645672 33.61337733 -166 33 C-158.87977355 42.18605618 -151.65219144 51.24946562 -144 60 C-143.11441406 61.01513672 -143.11441406 61.01513672 -142.2109375 62.05078125 C-124.81542751 80.68882766 -95.54252586 88.24366435 -70.7734375 89.11328125 C-68.17785302 89.1231379 -65.59366726 89.09355914 -63 89 C-61.28575442 66.61957154 -68.56361847 49.06117817 -83 32 C-83 31.34 -83 30.68 -83 30 C-83.66 30 -84.32 30 -85 30 C-86.33984375 28.6015625 -86.33984375 28.6015625 -87.9375 26.625 C-91.79135496 22.01996992 -96.20697808 18.29575151 -100.83984375 14.4921875 C-103 12 -103 12 -103.41015625 8.84375 C-102.95712227 5.70271444 -102.12932946 4.30677358 -100 2 C-85.11605374 4.24989885 -69.53132083 27.63749008 -61.0234375 39.078125 C-58.58335195 42.60164622 -56.73101148 46.08640883 -55 50 C-53.14357274 49.97380293 -53.14357274 49.97380293 -51 49 C-49.33851712 46.92388681 -47.88673328 44.90287731 -46.4375 42.6875 C-42.23740694 36.53073391 -37.644181 31.08098071 -32.52734375 25.67578125 C-30.40974835 23.43381395 -28.37703958 21.15668953 -26.375 18.8125 C-8.83320309 -1.32498046 -8.83320309 -1.32498046 0 0 Z " fill="#DFECD9" transform="translate(242,158)"/>
      <path d="M0 0 C132 0 264 0 400 0 C400 112.2 400 224.4 400 340 C373.93 340 347.86 340 321 340 C321 339.67 321 339.34 321 339 C322.73636719 338.61521484 322.73636719 338.61521484 324.5078125 338.22265625 C337.98373254 334.83440799 350.89754295 326.88946796 358.375 315.0625 C359.72771956 312.77689218 359.72771956 312.77689218 361 310 C361.32564438 309.41299316 361.65128876 308.82598633 361.98680115 308.22119141 C366.28960913 299.39408147 365.58576188 290.04942996 365.57421875 280.46484375 C365.58667753 278.57579765 365.60101552 276.6867631 365.61714172 274.79774475 C365.65498689 269.85476244 365.67032754 264.91198018 365.67993164 259.96887207 C365.6997621 252.02613152 365.75639046 244.08354181 365.80869484 236.1409626 C365.82407328 233.3660919 365.83123499 230.59129683 365.83683777 227.81639099 C365.84384858 226.13011638 365.85094907 224.44384215 365.8581543 222.75756836 C365.85762558 221.98206131 365.85709686 221.20655426 365.85655212 220.407547 C365.88677545 215.11322455 365.88677545 215.11322455 367 214 C369.0202124 213.91990347 371.04128779 213.86123187 373.0625 213.8125 C380.88842308 213.24738958 384.68706461 210.79468215 389.74609375 205 C398.79001702 193.54870147 398.3734871 179.10297403 398.37060547 165.1328125 C398.37502051 162.73888065 398.41160483 160.34673804 398.44921875 157.953125 C398.53039634 147.36813969 398.53039634 147.36813969 394.86181641 137.54003906 C394 136 394 136 394 134 C393.2471875 133.75378906 392.494375 133.50757813 391.71875 133.25390625 C388.69555786 131.85958919 387.55448384 130.51027409 385.5 127.9375 C381.86998342 124.07059174 379.32364052 123.41888627 374.0625 123.125 C372.37833984 123.12886719 372.37833984 123.12886719 370.66015625 123.1328125 C369.78230469 123.08898437 368.90445312 123.04515625 368 123 C366.70460711 120.40921423 366.86121827 118.51224489 366.84228516 115.61083984 C366.82689194 113.91669449 366.82689194 113.91669449 366.81118774 112.18832397 C366.80388641 110.95828644 366.79658508 109.7282489 366.7890625 108.4609375 C366.76095698 105.85155662 366.73229236 103.24218172 366.703125 100.6328125 C366.66100497 96.52347228 366.6242405 92.41416515 366.59863281 88.3046875 C367.09430728 62.01710624 367.09430728 62.01710624 359.125 37.375 C358.79886719 36.73433594 358.47273438 36.09367187 358.13671875 35.43359375 C351.45296802 22.7162626 340.27015813 15.71640015 327 11 C326.03964844 10.63003906 325.07929688 10.26007812 324.08984375 9.87890625 C317.6818339 7.6216331 311.50420013 6.55024303 304.765625 5.92578125 C303.85565262 5.84135773 302.94568024 5.7569342 302.00813293 5.66995239 C289.92038951 4.63715474 277.81211614 4.52146216 265.6875 4.375 C263.68032618 4.34695691 261.6731524 4.31891166 259.66598034 4.29074287 C211.00694116 3.62201836 162.27948734 3.39255651 113.625 4.4375 C112.70405548 4.4570575 111.78311096 4.47661499 110.83425903 4.49676514 C101.9871875 4.69412624 93.14960437 5.00166376 84.3125 5.46875 C83.24571518 5.52360817 83.24571518 5.52360817 82.15737915 5.57957458 C67.47802864 6.41517238 55.73870675 9.57735961 43 17 C41.63681641 17.77923828 41.63681641 17.77923828 40.24609375 18.57421875 C29.56368791 25.17164368 22.36479341 35.96560349 19 48 C18.64032764 51.28726252 18.69870749 54.52243216 18.78637695 57.82495117 C18.80499535 59.24843117 18.80499535 59.24843117 18.82398987 60.70066833 C18.85200986 62.74794848 18.88667089 64.79514649 18.92733192 66.84221458 C18.9890422 70.08293007 19.02731121 73.32314161 19.05863953 76.56428528 C19.1500602 85.77419446 19.26953477 94.98331463 19.4387207 104.19213867 C19.54075209 109.83582265 19.60386033 115.47882563 19.64220238 121.12328529 C19.6645178 123.27128885 19.70173942 125.41919123 19.75414467 127.56667137 C19.82627958 130.56639014 19.84898885 133.56275592 19.8605957 136.56323242 C19.89407104 137.44906006 19.92754639 138.3348877 19.96203613 139.24755859 C19.94176594 141.74229393 19.84631714 143.65065954 19 146 C17.11136903 147.73620358 15.29503103 148.83797732 13.0005064 149.97556019 C10.11584523 151.45276703 8.17412175 153.63404398 6 156 C5.01 156.99 5.01 156.99 4 158 C1.34742351 162.71569153 1.36689993 167.74761421 2 173 C4.1431568 180.22880995 7.95371109 186.47630774 14.66796875 190.16796875 C15.76753906 190.77253906 16.86710937 191.37710938 18 192 C18.0232116 201.39711884 18.04095997 210.79422776 18.05181217 220.19136906 C18.05702173 224.5552427 18.06408429 228.91909666 18.07543945 233.28295898 C18.08633694 237.49749888 18.09229135 241.7120199 18.09487724 245.9265728 C18.09671915 247.5312473 18.10031587 249.13592081 18.10573006 250.74058723 C18.11303163 252.99513067 18.11398712 255.24959696 18.11352539 257.50415039 C18.115746 258.78544327 18.11796661 260.06673615 18.12025452 261.38685608 C18.00017059 264.99487436 17.55467848 268.43587568 17 272 C16.76868207 276.60287629 16.76929115 281.20432647 16.75 285.8125 C16.729375 287.03259766 16.70875 288.25269531 16.6875 289.50976562 C16.62510496 304.02441197 20.98390731 316.33151813 31 327 C40.5264648 335.25843706 50.87712134 338.59359051 63.35546875 338.609375 C64.38311844 338.62591125 65.41076813 338.64244751 66.46955872 338.65948486 C69.70893575 338.70755219 72.94784486 338.72924381 76.1875 338.75 C78.40171573 338.77819418 80.61591006 338.80812636 82.83007812 338.83984375 C88.21996825 338.91329929 93.60972903 338.96518217 99 339 C99 339.33 99 339.66 99 340 C66.33 340 33.66 340 0 340 C0 227.8 0 115.6 0 0 Z " fill="#E2EFDC" transform="translate(0,30)"/>
      <path d="M0 0 C1.63618253 0.00680344 3.27237495 0.01151717 4.90856934 0.01425171 C9.18202237 0.02756431 13.45462585 0.07172349 17.7277832 0.12182617 C21.2258612 0.15741091 24.723857 0.17033936 28.22208405 0.18224525 C32.39810844 0.19701375 36.57404427 0.22220822 40.75 0.25 C41.94209831 0.25736616 41.94209831 0.25736616 43.15827942 0.26488113 C45.40054011 0.28114383 47.64259946 0.30454166 49.88476562 0.33056641 C51.15952759 0.34342682 52.43428955 0.35628723 53.74768066 0.36953735 C56.84375 0.5234375 56.84375 0.5234375 59.84375 1.5234375 C63.81127106 7.25430126 63.0249098 15.51533148 63.08203125 22.21875 C63.090103 23.12922089 63.09817474 24.03969177 63.10649109 24.97775269 C63.12025333 26.8922133 63.13101022 28.80669765 63.13891602 30.72119141 C63.15049364 32.67634281 63.17103538 34.63146122 63.20043945 36.58642578 C63.24303406 39.42241725 63.25926664 42.2574788 63.26953125 45.09375 C63.28703934 45.96468292 63.30454742 46.83561584 63.32258606 47.73294067 C63.30833496 51.71711666 63.15812185 53.97976808 61.12963867 57.48779297 C56.12144516 61.94772221 50.99443612 61.9089601 44.578125 62.12890625 C43.66125916 62.16582077 42.74439331 62.20273529 41.79974365 62.24076843 C31.61830334 62.62075039 21.43409312 62.77965127 11.24609375 62.81860352 C9.12297993 62.83027801 6.99989875 62.85096384 4.87695312 62.88012695 C1.74589926 62.92281881 -1.38431644 62.93895211 -4.515625 62.94921875 C-5.45323669 62.96672684 -6.39084839 62.98423492 -7.35687256 63.00227356 C-15.66011685 62.97505703 -22.53075233 60.57389395 -28.71875 54.8984375 C-29.38003906 54.30804688 -30.04132813 53.71765625 -30.72265625 53.109375 C-32.15625 51.5234375 -32.15625 51.5234375 -32.15625 49.5234375 C-32.81625 49.5234375 -33.47625 49.5234375 -34.15625 49.5234375 C-39.85879186 40.68449761 -40.56497291 32.48418599 -38.4921875 22.2421875 C-36.23514153 14.47009878 -32.8368221 8.56857785 -25.96862793 4.10018921 C-17.43016856 -0.25005669 -9.3186513 -0.14006082 0 0 Z " fill="#E1EEDB" transform="translate(320.15625,168.4765625)"/>
      <path d="M0 0 C2.50732864 0.37946745 3.75251469 0.75135623 5.56469727 2.57202148 C6.06026123 3.24821533 6.5558252 3.92440918 7.06640625 4.62109375 C7.62924316 5.38292969 8.19208008 6.14476563 8.77197266 6.9296875 C9.36284668 7.75726563 9.9537207 8.58484375 10.5625 9.4375 C11.17657715 10.28699219 11.7906543 11.13648437 12.42333984 12.01171875 C29.43771822 35.84330598 29.43771822 35.84330598 33 49 C33.25716797 49.8976709 33.25716797 49.8976709 33.51953125 50.81347656 C36.67085106 65.15454373 34.74879883 81.10008341 27.42578125 93.7109375 C21.49899703 102.69091359 13.75131095 111.66212013 5 118 C4.34 118 3.68 118 3 118 C3.29773209 111.63469325 3.7215915 105.48464798 5.375 99.3125 C11.32419326 76.92243274 12.80211833 54.89754862 4 33 C3.34 32.01 2.68 31.02 2 30 C1.34 30 0.68 30 0 30 C-10.80662613 54.00463451 -5.8071202 81.44215659 -2.60975647 106.67103577 C-2.2174822 109.8261823 -2 112.81074978 -2 116 C-4.375 115.25 -4.375 115.25 -7 114 C-7.66666667 112.66666667 -8.33333333 111.33333333 -9 110 C-10.175625 109.5359375 -10.175625 109.5359375 -11.375 109.0625 C-14.71288629 107.71145079 -15.89735567 105.87361391 -18 103 C-18.47179687 102.56816406 -18.94359375 102.13632813 -19.4296875 101.69140625 C-29.66380367 90.66809207 -31.68432063 73.39490857 -31.40234375 59.0859375 C-30.97962179 51.12793337 -28.22716255 44.20297249 -25 37 C-24.69497559 36.30213379 -24.38995117 35.60426758 -24.07568359 34.88525391 C-19.88243891 25.43682478 -14.87298256 17.77826276 -8 10 C-6.46900307 8.11236485 -4.94765996 6.21684633 -3.4375 4.3125 C-2.77621094 3.48363281 -2.11492187 2.65476563 -1.43359375 1.80078125 C-0.96050781 1.20652344 -0.48742187 0.61226562 0 0 Z " fill="#E0EDDA" transform="translate(189,60)"/>
      <path d="M0 0 C1 1 1 1 1.01953125 2.9609375 C0.95121094 3.75757813 0.88289062 4.55421875 0.8125 5.375 C0.75707031 6.16648437 0.70164063 6.95796875 0.64453125 7.7734375 C-0 10 -0 10 -1.5859375 11.73046875 C-4.79413511 13.41762769 -7.88844089 13.64876013 -11.4375 13.9375 C-25.30114271 15.41616298 -36.87473114 20.411518 -49 27 C-49.78810059 27.42764648 -50.57620117 27.85529297 -51.38818359 28.29589844 C-61.32917029 33.74543993 -70.58811504 39.32930211 -79 47 C-80.25388662 48.09898073 -81.50779452 49.19793718 -82.76171875 50.296875 C-96.5437635 62.58378373 -107.62478694 76.50946538 -116 93 C-116.54865723 94.07072754 -116.54865723 94.07072754 -117.10839844 95.16308594 C-122.28056263 105.36434524 -126.49956193 115.61685764 -129.90625 126.53515625 C-131 130 -131 130 -132 132 C-138.75 131.25 -138.75 131.25 -141 129 C-144.09668804 114.39667115 -134.79834397 97.31744669 -128 85 C-127.32915544 83.74754129 -126.65857873 82.49493908 -125.98828125 81.2421875 C-121.98779779 73.88931069 -117.50201078 67.30743821 -112 61 C-111.30132812 60.19175781 -110.60265625 59.38351563 -109.8828125 58.55078125 C-101.83923534 49.43377297 -93.27373239 40.86215543 -84 33 C-83.03449219 32.14535156 -82.06898437 31.29070312 -81.07421875 30.41015625 C-59.911811 11.82050923 -28.93758981 -2.76609314 0 0 Z " fill="#DEEBD9" transform="translate(178,45)"/>
      <path d="M0 0 C29.84284294 -1.92880134 59.22246592 11.52706435 81.35400391 30.58300781 C82.65462656 31.70267763 83.97106096 32.80397892 85.29296875 33.8984375 C95.88388551 42.79571085 105.63484979 52.99764379 114 64 C114.90105469 65.15822266 114.90105469 65.15822266 115.8203125 66.33984375 C122.73882614 75.66277357 132.67464276 90.85641349 132.25 102.9375 C132.23453125 103.68902344 132.2190625 104.44054687 132.203125 105.21484375 C132 107 132 107 131 108 C128.98035801 108.07244053 126.95832876 108.08377188 124.9375 108.0625 C123.83277344 108.05347656 122.72804688 108.04445313 121.58984375 108.03515625 C120.73519531 108.02355469 119.88054687 108.01195312 119 108 C118.5978125 106.5459375 118.5978125 106.5459375 118.1875 105.0625 C110.29693088 77.64406727 94.66095068 56.95593702 72 40 C71.39091797 39.53207031 70.78183594 39.06414062 70.15429688 38.58203125 C51.78656478 24.55576311 28.52364521 13.81826364 5.3203125 11.75 C3 11 3 11 1.1796875 8.8125 C-0.14369222 5.65742252 -0.23637452 3.3880348 0 0 Z " fill="#DEEBD9" transform="translate(201,45)"/>
      <path d="M0 0 C4.03640842 3.09825881 5.61145035 5.95584795 6.3671875 10.97265625 C6.87254822 21.19877899 3.8968541 31.14699339 -2.6328125 39.046875 C-9.2967464 46.30104305 -20.75792001 45.10894382 -30 45.53515625 C-29.24617123 38.9713301 -26.93066037 36.64261072 -22 32.53515625 C-19.15456121 30.37857196 -16.27752604 28.28586074 -13.35546875 26.234375 C-10.00584588 23.95624352 -10.00584588 23.95624352 -8.5859375 20.37109375 C-8.51632812 19.55898437 -8.44671875 18.746875 -8.375 17.91015625 C-8.30023438 17.09289062 -8.22546875 16.275625 -8.1484375 15.43359375 C-8.09945312 14.80710938 -8.05046875 14.180625 -8 13.53515625 C-12.37370119 11.28203745 -15.27380538 11.17337136 -20 12.53515625 C-23.86734768 15.23650584 -27.09514126 18.33840759 -29.9375 22.09765625 C-34.15097392 27.07721634 -39.52090714 30.57529064 -46 31.53515625 C-46.80691871 22.00156107 -45.76395912 16.20122188 -40 8.53515625 C-39.4225 7.62765625 -38.845 6.72015625 -38.25 5.78515625 C-28.19325998 -4.27158377 -12.5609956 -7.41677208 0 0 Z " fill="#DEEBD9" transform="translate(286,113.46484375)"/>
      <path d="M0 0 C1.1438145 2.85953624 0.98800137 4.03704757 0.01953125 7.02734375 C-1.14939853 10.87649117 -1.05963316 14.3784945 -0.96972656 18.37133789 C-0.83216572 29.59192553 -0.83216572 29.59192553 -4.05078125 33.47265625 C-6.75 35.0625 -6.75 35.0625 -9.7578125 36.4375 C-13.63690626 38.30694278 -16.43594304 40.71397185 -19.625 43.5625 C-36.26189622 58 -36.26189622 58 -47 58 C-47.49822001 42.30606955 -41.51299447 29.93079756 -31.25 18.125 C-22.99235601 9.5834995 -12.48529443 -0.74911767 0 0 Z " fill="#E0EDDB" transform="translate(268,177)"/>
      <path d="M0 0 C1.155 0.556875 2.31 1.11375 3.5 1.6875 C4.53125 2.14125 5.5625 2.595 6.625 3.0625 C14.26389257 7.38013493 16.93370513 11.37055484 19.5 19.6875 C20.87622898 25.42178742 21.39005885 32.01732345 19.5 37.6875 C14.80000614 36.29244882 12.8193234 34.03232094 9.875 30.1875 C6.62757171 25.97541037 6.62757171 25.97541037 2.5 22.6875 C2.5 22.0275 2.5 21.3675 2.5 20.6875 C1.84 20.6875 1.18 20.6875 0.5 20.6875 C0.314375 19.90375 0.12875 19.12 -0.0625 18.3125 C-1.31807243 15.3619109 -1.31807243 15.3619109 -4.75 14.375 C-8.11925558 13.75730314 -11.08856809 13.52108869 -14.5 13.6875 C-15.44647192 17.8863936 -16.32642204 21.84846598 -14.51171875 25.88671875 C-11.36349248 30.20598336 -7.47195809 33.59824453 -3.40234375 37.02734375 C-0.69061875 39.39383887 1.41059843 41.74927904 3.5 44.6875 C3.5 46.0075 3.5 47.3275 3.5 48.6875 C-5.87717274 46.91822212 -13.76076229 42.12588325 -21.5 36.6875 C-21.5 38.0075 -21.5 39.3275 -21.5 40.6875 C-24.5 39.6875 -24.5 39.6875 -25.8515625 37.578125 C-26.48191406 36.27101563 -26.48191406 36.27101563 -27.125 34.9375 C-27.55039063 34.07640625 -27.97578125 33.2153125 -28.4140625 32.328125 C-31.43798114 24.9749991 -31.56799395 16.93785237 -29 9.4375 C-23.55682184 -2.46241362 -11.79554855 -4.21917698 0 0 Z " fill="#DEEBD9" transform="translate(122.5,112.3125)"/>
      <path d="M0 0 C0.886875 0.804375 1.77375 1.60875 2.6875 2.4375 C3.24566406 2.911875 3.80382812 3.38625 4.37890625 3.875 C7.95783054 7.32936776 9.12249137 10.00548735 9.3125 15 C8.94892458 21.17232686 6.83098815 24.4632346 2.3125 28.625 C-3.03740481 32.31898189 -7.17359418 34.12534671 -13.7109375 33.91796875 C-19.55132386 32.83933884 -23.82626221 29.37411288 -27.375 24.75 C-28.76188937 19.84965758 -29.30493955 15.4710963 -28.3125 10.4375 C-26.4597687 7.15286428 -24.18984582 4.84947628 -21.3125 2.4375 C-20.77238281 1.98246094 -20.23226563 1.52742187 -19.67578125 1.05859375 C-13.8245748 -3.00749886 -6.29665397 -2.9701198 0 0 Z " fill="#0F1C2C" transform="translate(328.3125,185.5625)"/>
      <path d="M0 0 C3.89001324 0.53984023 4.77106925 0.74708267 7.53515625 3.80078125 C8.39134869 4.96133885 9.23347216 6.13238463 10.0625 7.3125 C14.64749442 14.09278792 14.64749442 14.09278792 21 19 C20.67 17.68 20.34 16.36 20 15 C24.63970476 15.59388221 29.1503593 16.43708627 33.71362305 17.45996094 C42.17141809 19.3541234 50.31831286 20.68826976 59 21 C51.81267779 29.17212357 38.55675949 30.69311213 28.34936523 33.11376953 C22.17144278 34.61098071 16.47096044 36.55384535 10.62890625 39.08203125 C7.77952623 40.07698564 5.97698516 40.57154139 3 40 C-0.338464 35.85946352 -0.39974999 31.9571813 -0.29296875 26.85546875 C-0.28872391 26.08568192 -0.28447906 25.31589508 -0.28010559 24.52278137 C-0.26338597 22.07732354 -0.2257477 19.63270643 -0.1875 17.1875 C-0.17244441 15.52410049 -0.15875754 13.86068799 -0.14648438 12.19726562 C-0.11350465 8.13118918 -0.06177006 4.06573687 0 0 Z " fill="#0F1C2D" transform="translate(195,309)"/>
      <path d="M0 0 C0.99 0 1.98 0 3 0 C3.0999677 4.23170951 3.17197673 8.4627671 3.21972656 12.6953125 C3.23966189 14.13065587 3.26682074 15.56591997 3.30175781 17.00097656 C3.50812636 25.70487371 3.21315089 33.11756043 -1 41 C-7.63775687 40.51928943 -12.90076421 39.16208748 -19 36.5625 C-24.27617604 34.34119325 -29.30128463 32.61221033 -34.91552734 31.4675293 C-37.84647908 30.81014202 -40.54269385 29.77694587 -43.3125 28.625 C-44.79169922 28.02558594 -44.79169922 28.02558594 -46.30078125 27.4140625 C-49.10574456 25.94460271 -50.89800493 24.34664532 -53 22 C-52.25878906 21.97421875 -51.51757812 21.9484375 -50.75390625 21.921875 C-37.33422692 21.19915053 -16.76080404 19.03193748 -7 9 C-5.17321277 6.63664523 -3.38249425 4.26051229 -1.6484375 1.828125 C-0.83246094 0.92320312 -0.83246094 0.92320312 0 0 Z " fill="#101D2D" transform="translate(177,309)"/>
      <path d="M0 0 C4.36449679 2.56445009 7.31817478 5.48766022 9.57421875 10.09375 C10.36398336 14.13032469 9.53106489 16.60459383 7.57421875 20.09375 C3.55294214 26.04022702 -2.30192571 30.69691558 -9.42578125 32.09375 C-19.01615133 33.12939647 -19.01615133 33.12939647 -23.48828125 29.84375 C-27.64374442 23.94567324 -28.26139106 19.26954921 -27.42578125 12.09375 C-25.04522321 7.24107401 -21.38378009 3.71489787 -17.42578125 0.09375 C-11.91953052 -1.74166691 -5.48828945 -2.05037545 0 0 Z " fill="#E0EDDB" transform="translate(335.42578125,318.90625)"/>
      <path d="M0 0 C3.87850945 2.67801843 6.13291589 5.33624767 7.625 9.8125 C8.80060271 23.33193119 8.80060271 23.33193119 5.5 27.5 C0.00604869 31.91904779 -4.04679329 33.34524994 -11.046875 33.09375 C-15.7209425 32.52909755 -18.14275727 30.20870844 -21.125 26.8125 C-24.92755515 21.74242647 -25.02926499 16.95324429 -24.375 10.8125 C-22.83146041 5.96801732 -19.65891392 2.44467939 -15.43359375 -0.30859375 C-10.30622086 -2.49769982 -5.12575046 -1.80350479 0 0 Z " fill="#DEEBD9" transform="translate(269.375,271.1875)"/>
      <path d="M0 0 C3.12817897 2.27503925 5.23726919 4.08528834 6.5625 7.8125 C7.22128792 12.78259622 7.16592388 16.58244364 4.9375 21.125 C-2.45019106 29.48475567 -2.45019106 29.48475567 -7.609375 30.05078125 C-13.43030158 30.21835338 -16.98626934 29.95317968 -21.4375 25.8125 C-25.54334911 21.08587265 -27.37952976 16.58326612 -27.05859375 10.28125 C-25.69607341 4.86544589 -21.68414364 1.26978236 -17.125 -1.6875 C-10.95685288 -2.83506225 -5.56941238 -3.26766261 0 0 Z " fill="#DDEAD8" transform="translate(125.4375,275.1875)"/>
      <path d="M0 0 C5.41599388 2.81215067 9.93355232 7.14506491 12 13 C12.63585723 18.72271511 11.56000167 21.52456933 8 26 C7.5875 26.598125 7.175 27.19625 6.75 27.8125 C3.63831159 29.92400285 0.64811898 30.39372616 -3 30 C-9.80763206 27.31470908 -15.86012336 22.73765196 -19 16 C-19.23823885 11.39404892 -18.36912971 9.53318737 -15.75 5.75 C-10.92880639 0.92880639 -6.96469073 -1.23147773 0 0 Z " fill="#DEEBD9" transform="translate(56,321)"/>
      <path d="M0 0 C5.06813621 2.25894071 8.23415344 5.40779086 10.73828125 10.3515625 C11.85332138 13.83606289 12.09647207 15.45608546 10.73828125 18.8515625 C7.14764567 23.33985698 2.80540794 27.94261227 -3.07421875 28.7265625 C-7.40664518 28.21686527 -8.4605483 26.64293778 -11.26171875 23.3515625 C-11.78121094 22.78566406 -12.30070312 22.21976563 -12.8359375 21.63671875 C-16.65818402 17.40725952 -18.86210757 14.09175345 -19.69921875 8.3515625 C-19.10777982 4.29598129 -17.35101456 2.92597567 -14.26171875 0.3515625 C-10.00472907 -1.77693234 -4.48505408 -1.28587043 0 0 Z " fill="#DFECDA" transform="translate(329.26171875,65.6484375)"/>
      <path d="M0 0 C6.8 4.8 6.8 4.8 8 9 C8.59602437 15.05958109 7.85292294 19.10975166 4 24 C1.30590454 27.16172342 -1.15907996 29.55792658 -5.27734375 30.546875 C-9.51079104 30.8004592 -11.44031277 30.42584898 -14.875 27.8125 C-15.57625 26.884375 -16.2775 25.95625 -17 25 C-17.598125 24.21625 -18.19625 23.4325 -18.8125 22.625 C-20.45831584 18.98688078 -20.67237142 16.9669914 -20 13 C-15.69255157 6.60944127 -8.40914785 -1.40152464 0 0 Z " fill="#DEEBD9" transform="translate(59,62)"/>
      <path d="M0 0 C3.42958823 2.05401836 5.40536977 3.60610153 7.65234375 6.9765625 C8.27734375 9.6640625 8.27734375 9.6640625 7.65234375 12.9765625 C3.86833602 17.79175717 -0.46776481 22.43400857 -6.75 23.3125 C-10.93044259 23.3769136 -13.5979827 23.40722603 -17.28515625 21.2890625 C-20.29092417 17.91895908 -22.15309126 15.53308244 -22.72265625 10.9765625 C-22.27783162 7.41796549 -21.61817063 5.75977367 -19.34765625 2.9765625 C-13.46838935 -1.46288394 -7.00473395 -3.05364442 0 0 Z " fill="#DEEBD9" transform="translate(34.34765625,187.0234375)"/>
      <path d="M0 0 C0.66 0 1.32 0 2 0 C3.8220092 6.9829394 4.28107347 13.36336627 4.23046875 20.5625 C4.23001053 21.635 4.22955231 22.7075 4.2290802 23.8125 C4.22607681 26.06137205 4.21824846 28.31024237 4.20581055 30.55908203 C4.1874078 34.01732655 4.18530213 37.47530509 4.18554688 40.93359375 C4.18063651 43.12239817 4.1748103 45.31120077 4.16796875 47.5 C4.16685593 48.53842041 4.1657431 49.57684082 4.16459656 50.64672852 C4.15821671 51.59862061 4.15183685 52.5505127 4.14526367 53.53125 C4.14145187 54.37236328 4.13764008 55.21347656 4.13371277 56.08007812 C4 58 4 58 3 59 C1.33382885 59.04063832 -0.33388095 59.042721 -2 59 C-2.25306329 16.96424123 -2.25306329 16.96424123 0 0 Z " fill="#DEEBD9" transform="translate(349,94)"/>
      <path d="M0 0 C4.37069154 0.08246588 6.3635368 0.3635368 9.5 3.5 C11.38503044 7.89840436 11.45339353 11.43094849 10 16 C8.07650038 18.38666525 7.10930639 18.96435661 4.125 19.9375 C1 20 1 20 -1.75 18.25 C-4.6353334 15.3646666 -5.90710868 13.71659021 -6.4375 9.625 C-5.89243629 5.10875786 -4.43322884 3.84706782 -1 1 C-0.67 0.67 -0.34 0.34 0 0 Z " fill="#D9E6D5" transform="translate(136,84)"/>
      <path d="M0 0 C2.69306318 1.6740663 3.71433828 3.06637389 4.640625 6.09375 C5.41828895 10.41410529 5.48802348 12.29014767 2.9375 16 C-0.32413217 18.22068573 -2.04580452 19.16475814 -6 19 C-9.87323928 15.81533659 -11.78145069 13.65473048 -12.4375 8.6875 C-12 5 -12 5 -9.375 2.0625 C-5.72264019 -0.16949766 -4.17448686 -0.81674743 0 0 Z " fill="#DBE8D7" transform="translate(246,84)"/>
      <path d="M0 0 C3.25 1.1875 3.25 1.1875 4.37109375 2.921875 C5.13633463 4.59251076 5.88876646 6.26903634 6.6328125 7.94921875 C8.69264992 12.07386904 11.19301227 15.77602036 13.8125 19.5625 C14.28389404 20.252229 14.75528809 20.94195801 15.2409668 21.65258789 C17.68598397 25.16850968 20.20458302 28.16358008 23.25 31.1875 C23.25 31.8475 23.25 32.5075 23.25 33.1875 C23.8275 33.435 24.405 33.6825 25 33.9375 C27.5834875 35.37277083 29.22785783 37.03897394 31.25 39.1875 C31.9925 39.93 32.735 40.6725 33.5 41.4375 C34.0775 42.015 34.655 42.5925 35.25 43.1875 C34.59 43.8475 33.93 44.5075 33.25 45.1875 C29.46874975 43.92708325 29.23677673 42.49879455 27.25 39.1875 C25.765 38.6925 25.765 38.6925 24.25 38.1875 C23.19152899 36.55734145 22.19923404 34.88359331 21.25 33.1875 C16.48916716 26.29398638 11.97572033 21.58538626 4.25 18.1875 C4.25 17.5275 4.25 16.8675 4.25 16.1875 C3.6725 15.960625 3.095 15.73375 2.5 15.5 C-0.5027084 13.7484201 -1.93551589 12.16843817 -3.75 9.1875 C-4.1364874 6.3814956 -3.98825491 4.04655895 -3.75 1.1875 C-2.75 0.1875 -2.75 0.1875 0 0 Z " fill="#1D2A39" transform="translate(67.75,191.8125)"/>
      <path d="M0 0 C1.34980749 0.6326468 2.68701812 1.29409576 4 2 C4.77416328 11.01470128 4.77416328 11.01470128 1.9375 14.625 C-1.75155524 16.35179182 -3.97395413 16.65880751 -8 16 C-10.5 13.9375 -10.5 13.9375 -12 11 C-12.07517661 6.7149334 -11.69099731 4.76996843 -8.8125 1.5625 C-5.50745856 -0.27363413 -3.7271242 -0.47580309 0 0 Z " fill="#101D2E" transform="translate(119,281)"/>
      <path d="M0 0 C2.83336378 1.75863959 3.02887833 3.103962 3.9375 6.375 C4 10 4 10 2.4375 12.875 C-0.54116672 15.47178637 -2.04314116 16.16150444 -6 16 C-9.64076903 13.0064788 -11.72597038 10.80076609 -12.4375 6.125 C-12 3 -12 3 -9.375 0.5625 C-5.52535219 -1.21974436 -3.98286069 -1.32762023 0 0 Z " fill="#152232" transform="translate(265,280)"/>
      <path d="M0 0 C0.66 0 1.32 0 2 0 C2.03963867 0.65895264 2.07927734 1.31790527 2.12011719 1.99682617 C3.15916893 19.86772313 3.15916893 19.86772313 8 37 C5 36 5 36 3.140625 32.5625 C-1.55886556 21.67672241 -3.07118332 12.72232228 -1 1 C-0.67 0.67 -0.34 0.34 0 0 Z " fill="#1A2736" transform="translate(169,111)"/>
      <path d="M0 0 C4.7632312 4.51253482 4.7632312 4.51253482 6.0625 7.1875 C7.29365471 9.56773244 8.60764943 9.87418797 11 11 C12.37562854 12.28965176 13.70766393 13.62689293 15 15 C15.7425 15.7425 16.485 16.485 17.25 17.25 C17.8275 17.8275 18.405 18.405 19 19 C18.34 19.66 17.68 20.32 17 21 C13.21874975 19.73958325 12.98677673 18.31129455 11 15 C10.01 14.67 9.02 14.34 8 14 C6.95650161 12.36021682 5.96817992 10.68535024 5 9 C3.04769443 6.29680767 1.02886992 3.64606659 -1 1 C-0.67 0.67 -0.34 0.34 0 0 Z " fill="#303D48" transform="translate(84,216)"/>
      <path d="M0 0 C2.31 0.33 4.62 0.66 7 1 C7.33 2.65 7.66 4.3 8 6 C4.625 6.625 4.625 6.625 1 7 C0.34 6.34 -0.32 5.68 -1 5 C-0.625 2.375 -0.625 2.375 0 0 Z " fill="#222F3C" transform="translate(21,194)"/>
      <path d="M0 0 C1.32 0 2.64 0 4 0 C3.6875 1.875 3.6875 1.875 3 4 C0 6 0 6 -3 6 C-2.42655063 3.13275314 -2.1385485 2.1385485 0 0 Z " fill="#23303D" transform="translate(325,330)"/>
      <path d="M0 0 C1.90389849 2.85584773 2.69462177 4.9311762 3.625 8.1875 C3.88539063 9.08855469 4.14578125 9.98960937 4.4140625 10.91796875 C4.60742188 11.60503906 4.80078125 12.29210937 5 13 C2 12 2 12 0.25 8.75 C-0.97360642 5.07918075 -1.19463679 3.58391038 0 0 Z " fill="#394650" transform="translate(172,135)"/>
      <path d="M0 0 C3.01056424 2.85211349 5.25599001 5.2436708 7 9 C7.66 9.33 8.32 9.66 9 10 C6 10 6 10 4.17578125 8.25 C3.56089844 7.5075 2.94601563 6.765 2.3125 6 C1.68988281 5.2575 1.06726563 4.515 0.42578125 3.75 C-0.04472656 3.1725 -0.51523438 2.595 -1 2 C-0.67 1.34 -0.34 0.68 0 0 Z " fill="#435058" transform="translate(84,216)"/>
    </svg>
  );
}

export default SeedelfLogo;

