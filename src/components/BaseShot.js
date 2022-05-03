
import { useRef, useEffect, useState } from "react";
import loadSound from "../utils/loadSound"
import "../stylesheets/styles.css";
import "../stylesheets/button.css";
import App from "./App";
import { isMobile } from "react-device-detect";
import { LoadingCircleBar } from "./CommonButtons";

import { setLoop, initialAudio, onOffSound } from "./CommonFunctions";
import { prePathUrl } from "./CommonFunctions";

var oldBackgroundImage = 'SB_04_intro_BG_01';

let backAudio = loadSound('bMusic', true)
backAudio.loop = true;
backAudio.volume = 0.12;

let currentSceneNumber = 0;

let letterVoiceList = [
    '1_sb06_ka',
    '2_sb06_ksha',
    '3_sb06_kha',
    '4_sb06_ga',
    '5_sb_06_gha',
    '6_sb_06_Dda',
    '7_sb_06_cha',
    '8_sb_06_chha',
    '9_sb_06_ja',
    '10_sb_06_jna',
    '11_sb_06_jha',
    '12_sb_06_inya',
    '13_sb_06_ta',
    '14_sb_06_tha',
    '15_sb_06_da',
    '16_sb_06_dha',
    '17_sb_06_ana',
    '18_sb_06_adha',
    '19_sb_06_ta',
    '20_sb_06_tra',
    '21_sb_06_tha',
    '22_sb_06_da',
    '23_sb_06_dha',
    '24_sb_06_na',
    '25_sb_06_pa',
    '26_sb_06_pha',
    '27_sb_06_ba',
    '28_sb_06_bha',
    '29_sb_06_ma',
    '30_sb_06_ya',
    '31_sb_06_ra',
    '32_sb_06_la',
    '33_sb_06_va',
    '34_sb_06_sh',
    '35_sb_06_shra',
    '36_sb_06_shha',
    '37_sb_06_sa',
    '38_sb_06_ha'

]

let selfLetterVoiceList = [
    '07',
    '13',
    '18', '26',
    '31', '36',
    '41', '46',
    '50', '56',
    '59', '65',
    '70',

    '74', '80',
    '85', '89',
    '93', '99',
    '103', '108',
    '113', '118',
    '123', '128',
    '133',

    '138', '143',
    '148', '153',
    '158', '163',
    '168', '173',
    '177', '180',
    '185'
]

let wordVoiceList = [
    ['10', '07', '08'],
    ['13', '15', '16'],
    ['18', '22', '23'],
    ['26', '27', '28'],
    ['31', '32', '33'],
    ['38', '37', '36'],
    ['41', '42', '43'],
    ['46', '47', '48'],
    ['50', '52', '53'], //9
    ['56', '87', '87'], //missed......... default..  10
    ['59', '59_1', '60'], //
    ['59', '60', '62'], // missed......... default..  12
    ['65', '66', '67'],///13
    ['70', '71', '72'],  //14
    ['74', '76', '77'], //15
    ['80', '81', '82'], //16
    ['87', '86', '85'],
    ['89', '90', '90'],  //missed.......last voice is missed..18
    ['93', '94', '95'],
    ['99', '100', '100'], //missed.......last voice is missed..20
    ['103', '104', '105'],
    ['108', '109', '110'],

    ['113', '114', '115'],   //23

    ['118', '119', '120'],  //24
    ['123', '124', '125'],
    ['128', '129', '130'],
    ['133', '134', '135'], ///27
    ['138', '139', '140'],  //28
    ['143', '144', '145'],  //29
    ['148', '149', '150'],

    ['153', '154', '155'],
    ['158', '159', '160'],

    ['163', '164', '165'],
    ['168', '169', '170'],
    ['173', '174', '174'], //missed.......last voice is missed..35
    ['177', '177', '177'],  //whole missed...

    ['180', '181', '182'],
    ['185', '186', '187'],
]



let titleAudio = loadSound('SB_05_Audio_01')

let bodyAudio1 = loadSound('SB_05_Audio_02') //explain voice
let bodyAudio2 = loadSound('SB_05_Audio_03')   //clap voice
let bodyAudio3 = loadSound('SB_05_Audio_03')   //clap voice

let wordAudio1 = loadSound('sb_06_audio_' + wordVoiceList[currentSceneNumber][0])  //word voice
let wordAudio2 = loadSound('sb_06_audio_' + wordVoiceList[currentSceneNumber][1])  //word voice
let wordAudio3 = loadSound('sb_06_audio_' + wordVoiceList[currentSceneNumber][2])  //word voice

let letterAudio = loadSound('letter/' + letterVoiceList[currentSceneNumber])
let selfLetterAudio = loadSound('review/SB_06_Audio_' + selfLetterVoiceList[currentSceneNumber] + 'A')

let audioYeah = loadSound('yeah', true)
let audioWoo = loadSound('woo', true)
let audioBuzz = loadSound('buzz', true)
let audioClap = loadSound('clap', true)
let audioSuccess = loadSound('success', true)
let audioClick = loadSound('click', true)
let audioTing = loadSound('ting', true)
let audioReplay = loadSound('replayAudio', true)

audioSuccess.volume = 0.25
audioBuzz.volume = 0.4
audioClap.volume = 0.3
audioYeah.volume = 0.4
audioWoo.volume = 0.5
audioClick.volume = 0.0

let audioList = {
    backAudio, titleAudio, bodyAudio1, bodyAudio2, bodyAudio3,
    wordAudio1, wordAudio2, wordAudio3,
    audioYeah, audioWoo, audioSuccess,
    letterAudio, audioBuzz, audioClap, selfLetterAudio,
    audioClick, audioTing, audioReplay
}
var isOff = false;


var _isBackSoundPlaying = true;
let backgroundSize = { width: 0, height: 0, left: 0, bottom: 0 }

const animationColorList = [
    ['#51c9b5', '#cc55d9', '#f55185'],
    ['#43c9e0', '#15ed76', '#f2e01d'],
    ['#f2e01d', '#0269b8', '#a6074c'],
    ['#a6074c', '#361394', '#eb2f80'],
    ['#1e70eb', '#880a91', '#f0a11a'],
    ['#51c9b5', '#cc55d9', '#dfeb88']
]

let isGameLoaded = false;
let isGameStarted = false;

// console.log = function () { }

export default function BaseShot() {

    // const standardRate = 1920 / 969;
    // const backRate = 1600 / 900;

    const standardRate = 1600 / 900;
    const [_sizeState, setSizeState] = useState(true);
    const [isBackloaded, setBackLoaded] = useState(false);

    const myImage = useRef();
    const myImage1 = useRef();
    const playGameBtn = useRef();

    const appRef = useRef();
    const loadingBar = useRef();

    const refIntroText = useRef();

    const transitionObject = useRef();
    const coloredObjects = [useRef(), useRef(), useRef()];

    const [geometry, setGeometry] = useState({
        width: window.innerWidth, height: window.innerHeight,
        left: 0, top: 0
    });

    function backgroundLoaded() {
        setTimeout(() => {

            if (!isGameLoaded) {
                isGameLoaded = true
                setTimeout(() => {
                    loadingBar.current.className = 'hide'
                }, 300);
            }

            setBackLoaded(true)
        }, 50);
    }

    function controlBacksound() {
        if (_isBackSoundPlaying) {
            _isBackSoundPlaying = false;
            backAudio.pause();
        }
        else {
            _isBackSoundPlaying = true;
            backAudio.play().catch(error => { });
        }
    }

    function hideIntroTitle() {
        // refIntroText.current.style.left = geometry.left + -1 * geometry.width + "px"
        refIntroText.current.className = 'hide'
        playGameBtn.current.className = 'hide'

    }

    function starGame() {
        setTimeout(() => {
            appRef.current.nextFunc();
        }, 200);

        if (!isGameStarted)
            initialAudio(audioList)
        isGameStarted = true;
    }

    function showIntroTitle() {

        setTimeout(() => {
            titleAudio.currentTime = 0;
            // titleAudio.play().catch(error => { });
        }, 700);


        setTimeout(() => {
            playGameBtn.current.className = 'introText'
        }, 1000);


        setTimeout(() => {
            playGameBtn.current.className = 'commonButton'
        }, 2500);

    }

    function playGame() {

        showIntroTitle();

        var hidden = "hidden";

        if (hidden in document)
            document.addEventListener("visibilitychange", onOffContrl);
        else if ((hidden = "mozHidden") in document)
            document.addEventListener("mozvisibilitychange", onOffContrl);
        else if ((hidden = "webkitHidden") in document)
            document.addEventListener("webkitvisibilitychange", onOffContrl);
        else if ((hidden = "msHidden") in document)
            document.addEventListener("msvisibilitychange", onOffContrl);

        setLoop(backAudio)
    }

    function playBackSound() {
        setTimeout(() => {
            backAudio.play().catch(error => { });
            backAudio.loop = true;
        }, 400);
    }


    function onOffContrl() {

        let allkeys = Object.keys(audioList)

        if (isOff) {
            allkeys.map(audio => {
                audioList[audio].muted = false;
            })
        }
        else {
            allkeys.map(audio => {
                audioList[audio].muted = true;
            })
        }

        isOff = !isOff
    }

    useEffect(() => {

        setTimeout(() => {
            playGame();

        }, 1000);

        // starGame();

        let timeout;
        transitionObject.current.style.display = 'none'
        setLoop(backAudio)
        // startBtn.current.style.display = 'none'
        playGameBtn.current.className = 'hideObject'
        refIntroText.current.className = 'hideObject'

        setTimeout(() => {
            setWindowResizing();
        }, 10);


        const handleResize = () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                setWindowResizing();
            }, 100);
        }
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);


    function setBackground(imgUrl, optionNum = -1) {
        if (imgUrl != oldBackgroundImage) {

            setBackLoaded(false)
            let waitTime = 0;
            if (imgUrl == 'SB_05_BG_01')
                waitTime = 3000
            setTimeout(() => {

                oldBackgroundImage = imgUrl;
                myImage1.current.src = prePathUrl() + "images/BG/" + imgUrl + ".svg";
                if (imgUrl != 'intro')
                    myImage1.current.style.bottom = backgroundSize.bottom + 'px'
                else
                    myImage1.current.style.bottom = 0 + 'px'
                if (optionNum != 1)  // transition scenes
                    myImage1.current.className = 'background-move'

                setTimeout(() => {
                    myImage.current.src = prePathUrl() + "images/BG/" + imgUrl + ".svg";

                    if (imgUrl != 'intro')
                        myImage.current.style.bottom = backgroundSize.bottom + 'px'
                    else
                        myImage.current.style.bottom = 0 + 'px'

                    if (optionNum != 1)  // transition scenes
                        myImage1.current.className = ''
                }, 1500);
            }, waitTime);

        }

    }

    function startTransition(num = 0) {
        setTimeout(() => {
            audioWoo.play()
        }, 300);
        transitionObject.current.style.display = 'inline-block';
        if (innerHeight / innerWidth > 700 / 1024) {
            transitionObject.current.className = 'changeTran1';
        }
        else
            transitionObject.current.className = 'changeTran';

        for (let i = 0; i < 3; i++)
            coloredObjects[i].current.style.backgroundColor = animationColorList[num][i]
        setTimeout(() => {
            transitionObject.current.className = '';
            transitionObject.current.style.display = 'none';
        }, 3000);
    }


    function setWindowResizing() {
        let width = window.innerWidth;
        let height = window.innerHeight;
        let suitWidth = width;
        let suitHeight = height;
        let left = 0;
        let top = 0;

        backgroundSize.width = width;
        backgroundSize.height = height;

        backgroundSize.left = 0;
        backgroundSize.bottom = 0;

        if (height * standardRate > width) {
            suitHeight = width / standardRate;
            backgroundSize.width = height * standardRate;
            backgroundSize.left = -1 * (backgroundSize.width - width) / 2;

            top = (height - suitHeight) / 2;
        }
        else if (height * standardRate < width) {
            suitWidth = height * standardRate;
            backgroundSize.height = width / standardRate;;
            backgroundSize.bottom = -1 * (backgroundSize.height - height) / 2;

            left = (width - suitWidth) / 2;
        }
        if (isMobile && window.innerWidth < window.innerHeight)
            setSizeState(false);
        else
            setSizeState(true);

        // if (isIntroTitleShow) {
        //     refIntroText.current.style.transition = '0.0s'
        //     refIntroText.current.style.left = geometry.left + -1 * geometry.width + "px"
        // }


        setGeometry({ width: suitWidth, height: suitHeight, left: left, top: top, first: false })

    }

    // setTimeout(() => {
    //     if (isIntroTitleShow)
    //         showIntroTitle()
    //     else
    //         hideIntroTitle()
    // }, 100);

    return (
        <div
            style={{
                backgroundColor: "black", width: "100%", height: "100%", position: "fixed", left: "0px", top: "0px",
                textAlign: "center"
            }}
        >
            <div style={{
                position: "fixed", width: backgroundSize.width + "px"
                , height: backgroundSize.height + "px",
                left: backgroundSize.left + "px",
                bottom: 0 + "px",
                pointerEvents: 'none',
                userSelect: 'none'
            }} >
                <img draggable={false} height={"100%"}
                    ref={myImage}
                    src={prePathUrl() + "images/BG/intro.svg"}
                />
            </div>
            <div style={{

                position: "fixed", width: backgroundSize.width + "px"
                , height: backgroundSize.height + "px",
                left: backgroundSize.left + "px",
                bottom: 0 + "px",
                pointerEvents: 'none',
                userSelect: 'none'
            }} >
                <img draggable={false} height={"100%"}
                    onLoad={backgroundLoaded}
                    ref={myImage1}
                    src={prePathUrl() + "images/BG/intro.svg"}
                />
            </div>

            <div style={{ background: "transparent" }} >
                <App
                    ref={appRef}
                    key={'appRef'}
                    _startTransition={startTransition}
                    _hideIntroTitle={hideIntroTitle}
                    _showIntroTitle={showIntroTitle}
                    _isBackloaded={isBackloaded}
                    _audioList={audioList}
                    currentSceneNumber={currentSceneNumber}
                    geo={geometry} __controlBacksound={controlBacksound}
                    baseGeo={backgroundSize} _setBackground={setBackground} />
            </div>

            <div
                ref={refIntroText}
                style={{
                    position: "fixed", width: geometry.width * 0.8,
                    left: geometry.width * 0.2 + geometry.left
                    , top: (geometry.height * 0.0 + geometry.top) + "px",
                    pointerEvents: 'none',
                    userSelect: 'none'
                }}>
                <img draggable={false} width={"100%"}
                    src={prePathUrl() + "images/SB05_Intro_BG/SB_05_Intro_BG_2.svg"}
                />
            </div>


            <div
                ref={playGameBtn}
                className='hide'
                onClick={() => { starGame(); audioClick.play().catch(error => { }); }}
                style={{
                    position: "fixed", width: geometry.width * 0.1 + "px",
                    height: geometry.width * 0.1 + "px",
                    right: geometry.width * 0.42 + geometry.left + "px"
                    , bottom: geometry.height * 0.05 + geometry.top + "px"
                    , cursor: "pointer",
                    userSelect: 'none',
                }}>
                <img
                    width={"100%"}
                    draggable={false}
                    src={prePathUrl() + 'images/Buttons/Play_blue.svg'}
                />
            </div>


            <div
                ref={transitionObject}
                style={{ display: 'none' }}
            >
                <div
                    ref={coloredObjects[0]}
                    style={{
                        backgroundColor: '#7372f2', width: '18000%',
                        height: '500%', bottom: '-0%', right: '-200%', position: 'absolute'
                    }}>
                </div>

                <div
                    ref={coloredObjects[1]}
                    style={{
                        backgroundColor: '#1f77ff', width: '18000%',
                        height: '500%', bottom: '500%', right: '-200%', position: 'absolute'
                    }}>
                </div>

                <div
                    ref={coloredObjects[2]}
                    style={{
                        backgroundColor: '#3334f2', width: '18000%',
                        height: '5000%', bottom: '1000%', right: '-200%', position: 'absolute'
                    }}>
                </div>

            </div>

            <LoadingCircleBar ref={loadingBar} />

            {!_sizeState && <div className="block" style={{
                position: "fixed", left: "0px", top: "0px",
                width: "100%", height: "100%", backgroundColor: "black", opacity: "0.85",
                textAlign: "center"
            }}>
                <h1
                    style={{
                        fontSize: '10vw',
                        color: 'white',
                        position: 'absolute',
                        top: '38%',
                        left: '10%',
                        padding: '0px',
                        fontFamily: 'popin'
                    }}>
                    Rotate your device!
                </h1>
            </div>
            }

        </div>
    )
}