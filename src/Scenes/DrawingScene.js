import "../stylesheets/styles.css";
import "../stylesheets/button.css";

import { useEffect, useRef, useState } from "react";
import { prePathUrl } from "../components/CommonFunctions";
import Phaser from "phaser"
import BaseImage from "../components/BaseImage";
import { Player } from '@lottiefiles/react-lottie-player';
import { returnAudioPath } from "../utils/loadSound";

import {
    maskInfoList, animtionList, letterPosList,
    lineLengthList, firstPosList, movePath, brushColorList, showingLayoutList,
    notJudgeBackList, letterList,
    preFixList, firstSubPosList, lastSubPosList, seaLetters, missedList
} from "../components/CommonVariants"

import { setRepeatAudio, startRepeatAudio, stopRepeatAudio, isRepeating } from "../components/CommonFunctions";



var repeatStep = 0;

const firstPos = { x: 380, y: 255 }
//state variants
var movingImage
let stepCount = 0;

//gameObjects
var highlightGame
var drawingGame

// drawing variants

let isFirst = true;
var curves = [];
var curve = null;

var subCurves = [];
var subCurve = null;


// lemming varients
var graphics
var subGraphics

var nearestStepNum = 0;
var circleObj
var highCurrentNum = 0;

var currentImgNumOriginal = 0;
var currentLingLength = 40

let completedIndex = 0;

var isExlaining = false;
var timerList = []

var rememberX = 0;
var rememberIsLeft = false;
var geometryInfo

let lastObjectList = []
let firstObjectList = []

let totalObjectCount = -1;
let isObjectEmpty = false;

export default function Scene({ nextFunc, _geo,
    currentLetterNum, startTransition, audioList
}) {


    if (totalObjectCount == -1)
        missedList.map(value => {
            if (value[0] - 1 == currentLetterNum)
                totalObjectCount = value[1]
        })

    if (totalObjectCount == 0) {
        totalObjectCount = 1
        isObjectEmpty = true;
    }
    if (totalObjectCount == -1)
        totalObjectCount = 3


    const letterNum = currentLetterNum;



    const wordVoiceList = [audioList.wordAudio1, audioList.wordAudio2, audioList.wordAudio3]

    const parentObject = useRef()
    const drawingPanel = useRef();
    const showingImg = useRef();
    const animationRef = useRef();
    const playerRef = useRef();
    const markParentRef = useRef();

    const turtleBaseRef = useRef();
    const turtleAniRef = useRef();
    const introturtle = useRef();

    const highlightRefList =
        Array.from({ length: letterPosList[letterNum].highlight }, ref => useRef())
    const outLineRefList = [useRef(), useRef()]

    const letterRefList = Array.from({ length: 3 }, ref => useRef());
    const subLetterList = Array.from({ length: 3 }, ref => useRef());

    const markRefList = [useRef(), useRef(), useRef()]
    const reviewImgList = [useRef(), useRef(), useRef()]
    const markBaseList = [useRef(), useRef(), useRef()]
    const showingHighImgList = [useRef(), useRef(), useRef()]
    const showingOriginImgList = [useRef(), useRef(), useRef()]

    const sparkBaseRef = useRef();
    const sparkRefList = [useRef(), useRef(), useRef()]

    const [rendering, setRendering] = useState(0)

    const drawingGaameconfig = {
        type: Phaser.AUTO,
        width: 1280,
        height: 720,
        parent: 'DrawingDiv',
        mipmapFilter: 'LINEAR_MIPMAP_LINEAR',
        transparent: true,
        physics: {
            default: 'matter',
            matter: {
                gravity: {
                    y: 0.8
                },
                enableSleep: true,
                debug: false
            }
        },
        scene: {
            preload: preload,
            create: create,
            update: update

        }
    };

    const highlightGameConfig = {
        type: Phaser.AUTO,
        width: 1280,
        height: 720,
        transparent: true,
        parent: 'highlightDiv',
        scene: {
            preload: highlight_preload,
            create: highlight_create,
        }
    };


    //this are common voices....
    const explainVoices = [
        '30', '31', '32', '32', '38_A'
    ]

    const clapVoices = [
        '09', '09', '09'
    ]

    const fullImgPreFix = prePathUrl() + 'images/SB06/tracing/' + preFixList[letterNum] + '/' + preFixList[letterNum] + '_'
    const shortImgPreFix = 'SB06/tracing/' + preFixList[letterNum] + '/' + preFixList[letterNum] + '_'

    let currentPath = movePath[letterNum][stepCount]



    useEffect(() => {



        audioList.bodyAudio1.src = returnAudioPath(explainVoices[0], true)
        audioList.bodyAudio2.src = returnAudioPath(clapVoices[0])

        setTimeout(() => {
            stopAnimation()
            setTimeout(() => {
                introturtle.current.play();

                audioList.bodyAudio1.play().catch(error => { }).catch(error => { });

                setTimeout(() => {
                    introturtle.current.stop();
                    playerRef.current.play();
                    audioList.bodyAudio1.src = returnAudioPath(explainVoices[1], true)
                }, audioList.bodyAudio1.duration * 1000);
            }, 500);

        }, 1500);


        currentLingLength = lineLengthList[letterNum]

        drawingPanel.current.className = 'hideObject'
        markParentRef.current.className = 'hideObject'
        turtleBaseRef.current.className = 'hideObject'
        // animationRef.current.className = 'hideObject'

        //1-explain
        //2-clap
        //3-word

        // showingDrawingPanel()

        highlightGame = new Phaser.Game(highlightGameConfig)

        setTimeout(() => {
            drawingGame = new Phaser.Game(drawingGaameconfig);
        }, 500);

        setRepeatAudio(audioList.bodyAudio1)

        return () => {
            currentImgNumOriginal = 0;
            repeatStep = 0;
            stepCount = 0;
            nearestStepNum = 0;
            highCurrentNum = 0;
            currentImgNumOriginal = 0;

            isFirst = true;
            curve = null;

            curves = [];


            subCurves = [];
            subCurve = null;

            highlightGame.destroy(true)
            drawingGame.destroy(true)

            graphics = null;
            subGraphics = null;

            isExlaining = false;
            stopRepeatAudio()
        }
    }, [])



    const stopAnimation = () => {
        // clearInterval(runInterval)
        // turtleBaseRef.current.style.transition = '0.0s'
        // turtleAniRef.current.className = 'showObject'
        // turtleListRef.map(turtle => {
        //     turtle.current.setClass('hideObject')
        // })
    }

    const showingDrawingPanel = () => {
        introturtle.current.stop();
        setTimeout(() => {
            startTransition(2)
            setTimeout(() => {
                turtleBaseRef.current.className = 'hideObject'
                drawingPanel.current.className = 'showObject'
                markParentRef.current.className = 'showObject'
                animationRef.current.className = 'hideObject'
            }, 300);

            timerList[7] = setTimeout(() => {
                audioList.letterAudio.play().catch(error => { });
                isExlaining = true;

                timerList[8] = setTimeout(() => {
                    audioList.bodyAudio1.play().catch(error => { });
                    startRepeatAudio();

                    timerList[9] = setTimeout(() => {
                        isExlaining = false;
                    }, audioList.bodyAudio1.duration * 1000);
                }, 1500);

            }, 1000);
        }, 500);

    }
    geometryInfo = _geo
    function reviewFunc() {
        stopRepeatAudio();
        audioList.bodyAudio1.src = returnAudioPath(explainVoices[4], true)
        startTransition(3)
        setTimeout(() => {
            markBaseList.map(value => {
                if (value.current)
                    value.current.className = 'hideObject'
            }
            )
            drawingPanel.current.className = 'hideObject'
        }, 300);

        let sparkPosList = [0.1, 0.41, 0.7]

        if (totalObjectCount == 2)
            sparkPosList = [0.22, 0.62]

        if (totalObjectCount == 1)
            sparkPosList = [0.42]

        letterRefList.map((letter, index) => {
            if (index < totalObjectCount)
                setTimeout(() => {
                    reviewImgList[index].current.style.transition = '0.5s'
                    reviewImgList[index].current.style.transform = 'scale(1.12)'


                    sparkBaseRef.current.style.left =
                        (geometryInfo.left + geometryInfo.width * sparkPosList[index]) + 'px'

                    letter.current.className = 'appear'
                    setTimeout(() => {
                        wordVoiceList[index].play().catch(error => { })
                    }, 300);


                    setTimeout(() => {
                        letter.current.className = 'disapear'
                        letter.current.style.transform = 'scale(0.5)'

                        setTimeout(() => {
                            showingHighImgList[index].current.setClass('appear')
                            subLetterList[index].current.setClass('appear')

                            audioList.audioTing.currentTime = 0
                            audioList.audioTing.play();

                            let showIndex = 0;
                            sparkRefList[showIndex].current.setClass('showObject')
                            let showInterval = setInterval(() => {
                                sparkRefList[showIndex].current.setClass('hideObject')
                                if (showIndex < 2) {
                                    showIndex++
                                    sparkRefList[showIndex].current.setClass('showObject')
                                }
                                else {
                                    clearInterval(showInterval)
                                }
                            }, 200);
                        }, 400);

                        setTimeout(() => {
                            reviewImgList[index].current.style.transition = '0.5s'
                            reviewImgList[index].current.style.transform = 'scale(1)'
                            setTimeout(() => {
                                showingHighImgList[index].current.setClass('disappear')
                                showingOriginImgList[index].current.setClass('appear')

                                if (index == totalObjectCount - 1) {
                                    setTimeout(() => {
                                        selfReviewFunc()
                                    }, 1000);
                                }
                            }, 300);
                        }, 4000);
                    }, 2000);
                }, index * 6500 + 2000);
        })
    }

    function selfReviewFunc() {
        audioList.bodyAudio1.play().catch(error => { });
        setTimeout(() => {
            audioList.bodyAudio1.pause();

            reviewImgList.map((img, index) => {
                if (index < totalObjectCount)
                    setTimeout(() => {
                        showingHighImgList[index].current.setClass('appear')
                        showingOriginImgList[index].current.setClass('disappear')
                        setTimeout(() => {
                            img.current.style.transform = 'scale(1.12)'
                            audioList.selfLetterAudio.play().catch(error => { })
                            setTimeout(() => {
                                img.current.style.transform = 'scale(1)'
                                setTimeout(() => {
                                    showingHighImgList[index].current.setClass('disappear')
                                    showingOriginImgList[index].current.setClass('appear')

                                    if (index == totalObjectCount - 1) {
                                        setTimeout(() => {
                                            nextFunc()
                                        }, 1000);
                                    }
                                }, 500);
                            }, 4000);
                        }, 1000);
                    }, 6000 * index);
            })
        }, audioList.bodyAudio1.duration * 1000);
    }

    function preload() {
    }

    let posList = []
    var path

    function create() {

        graphics = this.add.graphics();
        subGraphics = this.add.graphics();

        curve = new Phaser.Curves.Spline([firstPosList[letterNum][0].x, firstPosList[letterNum][0].y]);
        subCurve = new Phaser.Curves.Spline([currentPath[0].x, currentPath[0].y]);

        circleObj = this.add.circle(movePath[letterNum][0][0].x, movePath[letterNum][0][0].y, 60, 0xffffdd, 0.0)

        rememberX = movePath[letterNum][0][0].x;

        circleObj.setInteractive({ cursor: 'grab' })

        let isMoving = false;

        firstSubPosList.map((obj, index) => {
            firstObjectList[index] = (obj[4] == 'rect' ? this.add.rectangle(
                obj[0], obj[1],
                obj[2], obj[3],
                brushColorList[repeatStep]) :
                this.add.circle(
                    obj[0], obj[1],
                    obj[2],
                    brushColorList[repeatStep], 1))

            if (obj.length == 6)
                firstObjectList[index].rotation = obj[5]

            // if (index != 4)
            firstObjectList[index].visible = false
        })


        lastSubPosList.map((obj, index) => {
            lastObjectList[index] = (obj[4] == 'rect' ? this.add.rectangle(
                obj[0], obj[1],
                obj[2], obj[3],
                brushColorList[repeatStep]) :
                this.add.circle(
                    obj[0], obj[1],
                    obj[2],
                    brushColorList[repeatStep], 1))

            if (obj.length == 6)
                lastObjectList[index].rotation = obj[5]

            // if (index != 0)
            lastObjectList[index].visible = false

        })


        circleObj.on('pointerdown', function (pointer) {

            if (isExlaining) {
                clearTimeout(timerList[7])
                clearTimeout(timerList[8])
                clearTimeout(timerList[9])

                audioList.bodyAudio1.pause();
                audioList.bodyAudio1.currentTime = 0;

                audioList.letterAudio.pause();
                audioList.letterAudio.currentTime = 0;

                timerList.map(timer => {
                    clearTimeout(timer)
                })

                isExlaining = false;
            }

            if (isRepeating())
                stopRepeatAudio()

            if (!isMoving) {

                if (firstPosList[letterNum][stepCount].firstObj != null) {
                    firstObjectList[firstPosList[letterNum][stepCount].firstObj].visible = true
                }

                circleObj.on('pointermove', moveFunc, this);
                // if (!isFirst) {
                //     curve = new Phaser.Curves.Spline([pointer.x, pointer.y]);
                //     isFirst = !isFirst
                // }
                curves.push(curve);
                subCurves.push(subCurve);

                isMoving = true;
            }

            if (firstPosList[letterNum][stepCount].p != null && firstPosList[letterNum][stepCount].p == true) {


                isMoving = false;

                nearestStepNum = 0;
                curve.addPoint(firstPosList[letterNum][stepCount].x, firstPosList[letterNum][stepCount].y);
                currentPath.map(path => {
                    curve.addPoint(path.x, path.y);
                })

                graphics.lineStyle(100, brushColorList[repeatStep]);

                if (stepCount == movePath[letterNum].length - 1) {

                    outLineRefList[1].current.setClass('appear')
                    graphics.lineStyle(100, brushColorList[repeatStep]);

                    highlightRefList[highlightRefList.length - 1].current.setClass('disappear')

                    let showingTime = 2000

                    if (!isObjectEmpty) {
                        showingImg.current.className = 'appear'

                        setTimeout(() => {
                            showingImg.current.style.transform = 'scale(1.1)'
                            setTimeout(() => {
                                showingImg.current.className = 'disapear'
                                showingImg.current.style.transform = 'scale(1)'
                            }, 4000);
                            wordVoiceList[repeatStep].play().catch(error => { })
                        }, 3000);
                        showingTime = 6000
                    }

                    circleObj.y = 10000;
                    movingImage.y = 10000

                    curves.forEach(function (c) {
                        c.draw(graphics, 100);
                    });

                    markRefList[repeatStep].current.setUrl('SB_04_Progress bar/SB_04_progress bar_03.svg')

                    audioList.audioSuccess.play().catch(error => { });
                    setTimeout(() => {
                        if (repeatStep == totalObjectCount - 1)
                            audioList.bodyAudio2.play().catch(error => { });
                    }, 1000);

                    audioList.bodyAudio1.src = returnAudioPath(explainVoices[repeatStep + 2], true)

                    setTimeout(() => {
                        setTimeout(() => {
                            isExlaining = false;
                            if (repeatStep < totalObjectCount - 1) {
                                timerList[0] = setTimeout(() => {
                                    isExlaining = true;
                                    audioList.bodyAudio1.play().catch(error => { });
                                    timerList[2] = setTimeout(() => {
                                        isExlaining = false;
                                    }, audioList.bodyAudio1.duration * 1000);
                                }, 1000);

                                currentImgNumOriginal++
                                setRendering(currentImgNumOriginal);

                                outLineRefList[1].current.setClass('disappear')

                                highlightRefList.map((highlight, index) => {
                                    if (index > 0)
                                        highlight.current.setClass('disappear')
                                    else
                                        highlight.current.setClass('appear')
                                })

                                // fomart values....

                                highCurrentNum = 0
                                currentLingLength = lineLengthList[letterNum]

                                stepCount = 0;
                                currentPath = movePath[letterNum][stepCount]

                                repeatStep++;
                                isFirst = true;
                                nearestStepNum = 0;
                                let optimizedPosition = movePath[letterNum][0][0]
                                //.............

                                circleObj.x = optimizedPosition.x;
                                circleObj.y = optimizedPosition.y;

                                movingImage.x = optimizedPosition.x;
                                movingImage.y = optimizedPosition.y

                                graphics.clear();
                                subGraphics.clear()

                                lastObjectList.map(obj => {
                                    if (obj != null) {
                                        obj.visible = false;
                                        obj.setFillStyle(brushColorList[repeatStep], 1)
                                    }
                                })
                                firstObjectList.map(obj => {
                                    if (obj != null) {
                                        obj.visible = false;
                                        obj.setFillStyle(brushColorList[repeatStep], 1)
                                    }
                                })

                                curve = null;
                                curve = new Phaser.Curves.Spline([firstPosList[letterNum][0].x, firstPosList[letterNum][0].y]);
                                curves = []

                                subCurve = null;
                                subCurve = new Phaser.Curves.Spline([currentPath[0].x, currentPath[0].y]);
                                subCurves = []
                            }
                            else {
                                if (!isObjectEmpty)
                                    reviewFunc();
                                else
                                    nextFunc()
                            }
                        }, showingTime);

                    }, 4000);

                }
                else {

                    if (firstPosList[letterNum][stepCount].lastObj != null) {
                        lastObjectList[firstPosList[letterNum][stepCount].lastObj].visible = true
                    }

                    curves.forEach(function (c) {
                        c.draw(graphics, 100);
                    });


                    circleObj.off('pointermove', moveFunc, this);

                    stepCount++
                    currentPath = movePath[letterNum][stepCount]

                    circleObj.x = movePath[letterNum][stepCount][0].x;
                    circleObj.y = movePath[letterNum][stepCount][0].y;

                    movingImage.x = movePath[letterNum][stepCount][0].x;
                    movingImage.y = movePath[letterNum][stepCount][0].y;

                    setTimeout(() => {

                        if (firstPosList[letterNum][stepCount].letter_start) {

                            audioList.audioTing.currentTime = 0
                            audioList.audioTing.play();

                            highlightRefList[highCurrentNum].current.setClass('disappear')

                            highCurrentNum++

                            highlightRefList[highCurrentNum].current.setClass('appear')
                        }

                        curve = new Phaser.Curves.Spline([firstPosList[letterNum][stepCount].x, firstPosList[letterNum][stepCount].y]);
                        curves = []


                        curve.addPoint(circleObj.x, circleObj.y);
                    }, 200);
                }
            }
        }, this);


        circleObj.on('pointermove', moveFunc, this);

        function moveFunc(pointer) {
            if (pointer.isDown && isMoving) {

                if (isExlaining) {

                    clearTimeout(timerList[7])
                    clearTimeout(timerList[8])
                    clearTimeout(timerList[9])

                    audioList.bodyAudio1.pause();
                    audioList.bodyAudio1.currentTime = 0;

                    audioList.letterAudio.pause();
                    audioList.letterAudio.currentTime = 0;

                    timerList.map(timer => {
                        clearTimeout(timer)
                    })

                    isExlaining = false;
                }



                var x = (pointer.x.toFixed(2));
                var y = (pointer.y.toFixed(2));

                let minDistance = 1000;
                let currentMinDisIndex = nearestStepNum;
                let lastIndex = nearestStepNum + 2;
                if (lastIndex > currentPath.length)
                    lastIndex = currentPath.length

                for (let i = nearestStepNum; i < lastIndex; i++) {
                    if (minDistance > Phaser.Math.Distance.Between(x, y, currentPath[i].x, currentPath[i].y)) {
                        minDistance = Phaser.Math.Distance.Between(x, y, currentPath[i].x, currentPath[i].y)
                        currentMinDisIndex = i;
                    }
                }

                let pairIndex;
                if (currentMinDisIndex == 0)
                    pairIndex = 1;
                else if (currentMinDisIndex == currentPath.length - 1)
                    pairIndex = currentMinDisIndex - 1;

                else {
                    if (Phaser.Math.Distance.Between(x, y, currentPath[currentMinDisIndex + 1].x, currentPath[currentMinDisIndex + 1].y) >
                        Phaser.Math.Distance.Between(x, y, currentPath[currentMinDisIndex - 1].x, currentPath[currentMinDisIndex - 1].y))
                        pairIndex = currentMinDisIndex - 1;
                    else
                        pairIndex = currentMinDisIndex + 1;

                    if (completedIndex < currentMinDisIndex - 1)
                        completedIndex = currentMinDisIndex - 1
                    pairIndex = completedIndex;

                    if (pairIndex == currentMinDisIndex)
                        pairIndex += 1
                }

                if (currentMinDisIndex >= nearestStepNum && currentMinDisIndex - nearestStepNum <= 1) {

                    let fromIndex = currentPath[currentMinDisIndex].x > currentPath[pairIndex].x ? pairIndex : currentMinDisIndex
                    let toIndex = currentPath[currentMinDisIndex].x > currentPath[pairIndex].x ? currentMinDisIndex : pairIndex

                    let x1 = currentPath[fromIndex].x
                    let x2 = currentPath[toIndex].x
                    let y1 = currentPath[fromIndex].y
                    let y2 = currentPath[toIndex].y

                    let optimizedPosition = currentPath[currentMinDisIndex]
                    minDistance = 1000


                    if (x1 != x2)
                        for (let i = 0; i < Math.abs(currentPath[fromIndex].x
                            - currentPath[toIndex].x) / 0.1; i += 0.1) {
                            let currentXPos = x1 + i;
                            let currentYPos = y1 + (y2 - y1) / (x2 - x1) * (currentXPos - x1)

                            if (minDistance > Phaser.Math.Distance.Between(x, y, currentXPos, currentYPos)) {
                                minDistance = Phaser.Math.Distance.Between(x, y, currentXPos, currentYPos)
                                optimizedPosition = { x: currentXPos, y: currentYPos }
                            }
                        }

                    else {
                        let addY = y2 > y1 ? y1 : y2;
                        for (let i = 0; i < Math.abs(y1 - y2) / 0.1; i += 0.1) {
                            let currentXPos = x1;
                            let currentYPos = addY + i

                            if (minDistance > Phaser.Math.Distance.Between(x, y, currentXPos, currentYPos)) {
                                minDistance = Phaser.Math.Distance.Between(x, y, currentXPos, currentYPos)
                                optimizedPosition = { x: currentXPos, y: currentYPos }
                            }
                        }

                    }


                    if (currentMinDisIndex >= nearestStepNum) {
                        if (minDistance < 60) {

                            if (nearestStepNum != currentMinDisIndex && currentMinDisIndex > 0) {

                                subGraphics.lineStyle(currentLingLength, brushColorList[repeatStep]);

                                if (currentPath[currentMinDisIndex].w && subCurve.points.length > 5) {
                                    let oldPosList = subCurve.points
                                    subCurve = new Phaser.Curves.Spline([oldPosList[oldPosList.length - 1].x, oldPosList[oldPosList.length - 1].y]);

                                    subCurves = []
                                    subCurves.push(subCurve)
                                }

                                subCurve.addPoint(
                                    currentPath[currentMinDisIndex - 1].x,
                                    currentPath[currentMinDisIndex - 1].y
                                )

                                subCurves.forEach(function (c) {
                                    c.draw(subGraphics, currentLingLength);
                                });
                            }

                            x = optimizedPosition.x
                            y = optimizedPosition.y

                            let isPassable = false;

                            if (currentPath.length == 2)
                                isPassable = true;

                            let fIndex = nearestStepNum > pairIndex ? pairIndex : nearestStepNum
                            let tIndex = nearestStepNum > pairIndex ? nearestStepNum : pairIndex

                            if (currentPath.length > 2 &&
                                !notJudgeBackList.includes([letterNum, stepCount]) &&
                                currentPath[fIndex] != null && !isPassable
                                && currentPath[tIndex] != null) {

                                if (currentPath[fIndex].x < currentPath[tIndex].x)
                                    rememberIsLeft = false
                                else if (currentPath[fIndex].x > currentPath[tIndex].x)
                                    rememberIsLeft = true

                                if ((x > rememberX && !rememberIsLeft) ||
                                    currentPath[fIndex].x == currentPath[tIndex].x
                                    || (x < rememberX && rememberIsLeft))
                                    isPassable = true;
                            }

                            if (isPassable) {
                                rememberX = x;
                                nearestStepNum = currentMinDisIndex

                                let compDistance = Phaser.Math.Distance.Between(x, y,
                                    currentPath[currentPath.length - 1].x,
                                    currentPath[currentPath.length - 1].y)

                                if (compDistance < 40 && currentMinDisIndex == currentPath.length - 1) {
                                    isMoving = false;

                                    x = currentPath[currentPath.length - 1].x
                                    y = currentPath[currentPath.length - 1].y

                                    nearestStepNum = 0;
                                    completedIndex = 0
                                    curve.addPoint(x, y);

                                    if (stepCount == movePath[letterNum].length - 1) {

                                        outLineRefList[1].current.setClass('appear')
                                        graphics.lineStyle(100, brushColorList[repeatStep]);

                                        highlightRefList[highlightRefList.length - 1].current.setClass('disappear')

                                        let showingTime = 2000

                                        if (!isObjectEmpty) {
                                            showingImg.current.className = 'appear'

                                            setTimeout(() => {
                                                showingImg.current.style.transform = 'scale(1.1)'
                                                setTimeout(() => {
                                                    showingImg.current.className = 'disapear'
                                                    showingImg.current.style.transform = 'scale(1)'
                                                }, 4000);
                                                wordVoiceList[repeatStep].play().catch(error => { });
                                            }, 3000);
                                            showingTime = 6000
                                        }

                                        // alert('finished')
                                        circleObj.y = 10000;
                                        movingImage.y = 10000

                                        curves.forEach(function (c) {
                                            c.draw(graphics, 100);
                                        });

                                        subCurves.forEach(function (c) {
                                            c.draw(subGraphics, 100);
                                        });

                                        markRefList[repeatStep].current.setUrl('SB_04_Progress bar/SB_04_progress bar_03.svg')
                                        audioList.audioSuccess.play().catch(error => { });

                                        setTimeout(() => {
                                            if (repeatStep == totalObjectCount - 1)
                                                audioList.bodyAudio2.play().catch(error => { });
                                        }, 1000);
                                        audioList.bodyAudio1.src = returnAudioPath(explainVoices[repeatStep + 2], true)

                                        setTimeout(() => {
                                            setTimeout(() => {
                                                isExlaining = false;
                                                if (repeatStep < totalObjectCount - 1) {
                                                    timerList[0] = setTimeout(() => {
                                                        isExlaining = true;
                                                        // audioList.letterAudio.play().catch(error => { });
                                                        // timerList[1] = setTimeout(() => {
                                                        audioList.bodyAudio1.play().catch(error => { });
                                                        timerList[2] = setTimeout(() => {
                                                            isExlaining = false;
                                                        }, audioList.bodyAudio1.duration * 1000);
                                                        // }, 1000);
                                                    }, 1000);

                                                    startRepeatAudio(7000, 9000)

                                                    currentImgNumOriginal++
                                                    setRendering(currentImgNumOriginal);

                                                    outLineRefList[1].current.setClass('disappear')

                                                    highlightRefList.map((highlight, index) => {
                                                        if (index > 0)
                                                            highlight.current.setClass('disappear')
                                                        else
                                                            highlight.current.setClass('appear')
                                                    })

                                                    // fomart values....

                                                    highCurrentNum = 0
                                                    currentLingLength = lineLengthList[letterNum]
                                                    stepCount = 0;
                                                    repeatStep++;
                                                    isFirst = true;
                                                    nearestStepNum = 0;
                                                    optimizedPosition = movePath[letterNum][0][0]

                                                    //.............

                                                    currentPath = movePath[letterNum][stepCount]
                                                    rememberX = currentPath[0].x

                                                    circleObj.x = optimizedPosition.x;
                                                    circleObj.y = optimizedPosition.y;

                                                    movingImage.x = optimizedPosition.x;
                                                    movingImage.y = optimizedPosition.y


                                                    graphics.clear();
                                                    subGraphics.clear()

                                                    lastObjectList.map(obj => {
                                                        if (obj != null) {
                                                            obj.visible = false;
                                                            obj.setFillStyle(brushColorList[repeatStep], 1)
                                                        }
                                                    })
                                                    firstObjectList.map(obj => {
                                                        if (obj != null) {
                                                            obj.visible = false;
                                                            obj.setFillStyle(brushColorList[repeatStep], 1)
                                                        }
                                                    })

                                                    curve = new Phaser.Curves.Spline([firstPosList[letterNum][0].x, firstPosList[letterNum][0].y]);
                                                    curves = []

                                                    subCurve = new Phaser.Curves.Spline([currentPath[0].x, firstPosList[letterNum][0].y]);
                                                    subCurves = []
                                                }
                                                else {
                                                    if (!isObjectEmpty)
                                                        reviewFunc();
                                                    else
                                                        nextFunc()
                                                }

                                            }, showingTime);
                                        }, 4000);
                                    }
                                    else {

                                        if (firstPosList[letterNum][stepCount].lastObj != null) {
                                            lastObjectList[firstPosList[letterNum][stepCount].lastObj].visible = true
                                        }

                                        curves.forEach(function (c) {
                                            c.draw(graphics, 100);
                                        });


                                        subCurves.forEach(function (c) {
                                            c.draw(subGraphics, 100);
                                        });

                                        circleObj.off('pointermove', moveFunc, this);
                                        parentObject.current.style.pointerEvents = 'none'

                                        circleObj.x = x;
                                        circleObj.y = y;

                                        movingImage.x = x;
                                        movingImage.y = y;


                                        stepCount++
                                        let timeDuration = 0
                                        if (firstPosList[letterNum][stepCount].letter_start) {
                                            timeDuration = 750
                                        }

                                        setTimeout(() => {

                                            currentPath = movePath[letterNum][stepCount]

                                            setTimeout(() => {
                                                rememberX = currentPath[0].x

                                                if (firstPosList[letterNum][stepCount].letter_start) {

                                                    audioList.audioTing.currentTime = 0
                                                    audioList.audioTing.play();

                                                    highlightRefList[highCurrentNum].current.setClass('disappear')
                                                    highCurrentNum++
                                                    highlightRefList[highCurrentNum].current.setClass('appear')
                                                }

                                                circleObj.x = movePath[letterNum][stepCount][0].x;
                                                circleObj.y = movePath[letterNum][stepCount][0].y;

                                                movingImage.x = movePath[letterNum][stepCount][0].x;
                                                movingImage.y = movePath[letterNum][stepCount][0].y;

                                                curve = new Phaser.Curves.Spline([firstPosList[letterNum][stepCount].x, firstPosList[letterNum][stepCount].y]);
                                                curves = []

                                                subCurve = new Phaser.Curves.Spline([currentPath[0].x, currentPath[0].y]);
                                                subCurves = []

                                                curve.addPoint(circleObj.x, circleObj.y);

                                                currentLingLength = firstPosList[letterNum][stepCount].w
                                                    ? firstPosList[letterNum][stepCount].w : lineLengthList[letterNum]

                                                parentObject.current.style.pointerEvents = ''
                                                circleObj.on('pointermove', moveFunc, this);
                                            }, 200);
                                        }, timeDuration);

                                    }
                                }

                                else {

                                    let changable = false
                                    if (currentPath[currentMinDisIndex].w && currentLingLength != currentPath[currentMinDisIndex].w) {
                                        currentLingLength = currentPath[currentMinDisIndex].w
                                        changable = true;
                                    }

                                    graphics.lineStyle(currentLingLength, brushColorList[repeatStep]);

                                    if (currentPath[currentMinDisIndex].w && curve.points.length > 1 && changable) {
                                        let oldPosList = curve.points
                                        curve = new Phaser.Curves.Spline([
                                            oldPosList[oldPosList.length - 1].x,
                                            oldPosList[oldPosList.length - 1].y
                                        ]
                                        );

                                        curves = []
                                        curves.push(curve)
                                    }

                                    curve.addPoint(x, y);
                                    curves.map(function (c) {
                                        c.draw(graphics, 200);
                                    });

                                    circleObj.x = optimizedPosition.x;
                                    circleObj.y = optimizedPosition.y;
                                    movingImage.x = optimizedPosition.x;
                                    movingImage.y = optimizedPosition.y

                                    if (Phaser.Math.Distance.Between(optimizedPosition.x, optimizedPosition.y,
                                        currentPath[currentMinDisIndex].x, currentPath[currentMinDisIndex].y) < 3)
                                        completedIndex = currentMinDisIndex
                                }

                            }
                        }
                    }

                }
            }
        }


        // var fs = this.add.circle(firstPos.x, firstPos.y, 3, 0x000000, 0.5)
        path = new Phaser.Curves.Path(firstPos.x, firstPos.y);

        this.input.on('pointerdown1', function (pointer) {

            posList.push({ x: pointer.x, y: pointer.y })

            posList.map(pos => {
                path.lineTo(pos.x, pos.y);
            })

            console.log('{x:' + pointer.x.toFixed(0) + ', y:' + pointer.y.toFixed(0) + '},')
            // graphics.clear()

            posList = []



            graphics.lineStyle(2, 0x000000, 1);
            path.draw(graphics);
            graphics.fillStyle(0x000000, 1);

            path = new Phaser.Curves.Path(pointer.x, pointer.y);

        }, this);
    }


    function update() {

    }

    // highlight game

    function highlight_preload() {
        this.load.image('foot', prePathUrl() + 'images/SB_04_Icon/sb06_tracing_icon.svg');
    }

    function highlight_create() {

        movingImage = this.add.image(movePath[letterNum][0][0].x, movePath[letterNum][0][0].y, 'foot');
        movingImage.setScale(0.6)

        // console.log(movingImage)
        // movingImage.visible = false;
    }


    let baseX = 0.1, stepX = 0.3
    if (totalObjectCount == 2) {
        baseX = 0.2
        stepX = 0.4
    }
    if (totalObjectCount == 1) {
        baseX = 0.4
    }

    return (
        <div
            ref={parentObject}
        >
            {/* <BaseImage
                    scale={0.05}
                    posInfo={{ r: 0.03 + 0.075, t: 0.05 }}
                    url="SB_04_hand_tool/hand.svg"
                /> */}

            <div
                ref={showingImg}
                className='hideObject'
                style={{
                    position: 'fixed', width: _geo.width * 0.18 + 'px',
                    height: _geo.height * 0.18 + 'px',
                    right: _geo.left + _geo.width * 0.02 + 'px',
                    bottom: _geo.top + _geo.height * 0.12 + 'px',
                    pointerEvents: 'none',
                    transform: 'scale(1)'
                }}>
                <BaseImage
                    scale={showingLayoutList[letterNum][currentImgNumOriginal].s}
                    posInfo={{ b: 1.1, r: showingLayoutList[letterNum][currentImgNumOriginal].r }}
                    url={"SB06/prop/white/sb06_pi_01_" + showingLayoutList[letterNum][currentImgNumOriginal].wPath + ".svg"}

                />
                <BaseImage
                    posInfo={{ r: 0.02, b: showingLayoutList[letterNum][currentImgNumOriginal].tb }}
                    style={{ transform: 'scale(' + (0.8 * showingLayoutList[letterNum][currentImgNumOriginal].ts) + ')' }}
                    url={"SB06/text/sb06_ti_01_" + showingLayoutList[letterNum][currentImgNumOriginal].wPath + ".svg"}
                />
            </div>
            {
                Array.from(Array(totalObjectCount).keys()).map(value =>
                    <div
                        ref={reviewImgList[value]}
                        // className='hideObject'
                        style={{
                            position: 'fixed', width: _geo.width * 0.2 + 'px',
                            height: _geo.height * 0.18 + 'px',
                            left: _geo.left + _geo.width * (baseX + stepX * value) + 'px',
                            bottom: _geo.top + _geo.height * 0.175 + 'px',
                            pointerEvents: 'none',
                            transform: 'scale(1)',
                        }}>
                        <BaseImage
                            ref={showingOriginImgList[value]}
                            className='hideObject'
                            scale={showingLayoutList[letterNum][value].s}
                            posInfo={{ b: 1.2, r: showingLayoutList[letterNum][value].r }}
                            url={"SB06/prop/white/sb06_pi_01_" + showingLayoutList[letterNum][value].wPath + ".svg"}
                        />

                        <BaseImage
                            ref={showingHighImgList[value]}
                            className='hideObject'
                            scale={showingLayoutList[letterNum][value].s}
                            posInfo={{ b: 1.2, r: showingLayoutList[letterNum][value].r }}
                            url={"SB06/prop/yellow/sb06_pi_03_" + showingLayoutList[letterNum][value].wPath + ".svg"}
                        />

                        <BaseImage
                            posInfo={{ r: 0.02, b: showingLayoutList[letterNum][value].tb }}
                            className='hideObject'
                            ref={subLetterList[value]}
                            style={{ transform: 'scale(' + (0.8 * showingLayoutList[letterNum][value].ts) + ')' }}
                            url={"SB06/text/sb06_ti_01_" + showingLayoutList[letterNum][value].wPath + ".svg"}

                        />

                        <div
                            ref={letterRefList[value]}
                            className='hideObject'
                            style={{
                                position: 'absolute',
                                width: letterList[letterNum].s * 100 + '%',
                                left: letterList[letterNum].l * 100 + '%',
                                bottom: letterList[letterNum].b * 100 + '%',
                                pointerEvents: 'none',
                                overflow: 'visible',
                            }}

                        >
                            <Player
                                style={{
                                    position: 'absolute',
                                    width: '100%',
                                    left: '0%',
                                    bottom: '0%',
                                    pointerEvents: 'none',
                                    overflow: 'visible'
                                }}

                                src={prePathUrl() + 'lottieFiles/sea_letters/' + letterList[letterNum].path + '.json'}

                            >
                            </Player>
                        </div>

                    </div>
                )
            }

            {
                <div
                    ref={sparkBaseRef}
                    style={{
                        position: 'fixed', width: _geo.width * 0.15 + 'px',
                        height: _geo.height * 0.15 + 'px',
                        left: _geo.left + _geo.width * (0.1) + 'px',
                        bottom: _geo.top + _geo.height * 0.2 + 'px',
                        pointerEvents: 'none',
                    }}>
                    {[0, 1, 2].map(value =>
                        <BaseImage
                            ref={sparkRefList[value]}
                            className='hideObject'
                            posInfo={{
                                b: 1,
                                l: 0.0
                            }}
                            style={{ transform: 'scale(' + [0.3, 1.7, 2.4][value] + ')' }}
                            url={"Magic/sb_52_magic_wand_sparkels_" + (value + 1) + ".svg"}
                        />
                    )}
                </div>
            }
            <div ref={markParentRef}>
                {
                    Array.from(Array(totalObjectCount).keys()).map(value =>
                        <div
                            ref={markBaseList[totalObjectCount - value - 1]}
                            style={{
                                position: 'fixed',
                                width: _geo.width * 0.06 + 'px',
                                height: _geo.width * 0.06 + 'px',
                                right: _geo.width * (0.06 + 0.075 * value) + 'px',
                                top: 0.05 * _geo.height + 'px',
                                pointerEvents: 'none'
                            }}>
                            <BaseImage
                                ref={markRefList[totalObjectCount - value - 1]}
                                url="SB_04_Progress bar/SB_04_progress bar_04.svg"
                            />
                        </div>
                    )
                }
            </div>

            <div ref={drawingPanel}

            >
                <div id='DrawingDiv'
                    style={{
                        position: 'fixed', width: _geo.width, height: _geo.height, left: _geo.left, top: _geo.top,
                        WebkitMaskImage: 'url("' + fullImgPreFix + 'gray.svg")',
                        WebkitMaskPosition: maskInfoList[letterNum].position,
                        WebkitMaskSize: maskInfoList[letterNum].size,
                        WebkitMaskRepeat: "no-repeat",
                        overflow: 'hidden',
                        background: '#999999'
                    }}
                >
                </div>

                <div
                    // ref={subObjectsRef}
                    style={{
                        position: 'fixed',
                        width: _geo.width, height: _geo.height,
                        left: _geo.left, top: _geo.top,
                        pointerEvents: 'none',
                    }}
                >
                    {
                        Array.from(Array(letterPosList[letterNum].highlight).keys()).map((value, index) =>
                            <BaseImage
                                ref={highlightRefList[index]}
                                scale={letterPosList[letterNum].layout.s}
                                posInfo={{
                                    t: letterPosList[letterNum].layout.t + (letterPosList[letterNum].gap ? letterPosList[letterNum].gap.y : 0),
                                    l: letterPosList[letterNum].layout.l + (letterPosList[letterNum].gap ? letterPosList[letterNum].gap.x : 0)
                                }}
                                className={index > 0 ? 'hideObject' : ''}
                                url={shortImgPreFix + 'tracing_arrow_0' + (index + 1) + '.svg'}
                            />
                        )
                    }
                    <BaseImage
                        ref={outLineRefList[0]}
                        scale={letterPosList[letterNum].layout.s}
                        posInfo={{
                            t: letterPosList[letterNum].layout.t,
                            l: letterPosList[letterNum].layout.l
                        }}
                        url={shortImgPreFix + 'white_glow.svg'}
                    />

                    <BaseImage
                        ref={outLineRefList[1]}
                        scale={letterPosList[letterNum].layout.s}
                        posInfo={{
                            t: letterPosList[letterNum].layout.t,
                            l: letterPosList[letterNum].layout.l
                        }}
                        className='hideObject'
                        url={shortImgPreFix + 'yellow_glow.svg'}
                    />



                </div>
                <div id='highlightDiv'
                    style={{
                        position: 'fixed', width: _geo.width, height: _geo.height, left: _geo.left, top: _geo.top,
                        pointerEvents: 'none',
                    }}
                >
                </div>

            </div>


            <div
                ref={animationRef}
            >
                <Player
                    ref={playerRef}
                    onEvent={(e) => {
                        if (e == 'complete')
                            showingDrawingPanel();
                    }}
                    keepLastFrame={true}

                    src={prePathUrl() + 'lottieFiles/letters/' + animtionList[letterNum].path + '.json'}
                    style={{
                        position: 'fixed',
                        width: _geo.width * animtionList[letterNum].scale,
                        left: _geo.left + _geo.width * animtionList[letterNum].left,
                        top: _geo.top + _geo.height * animtionList[letterNum].top,
                        pointerEvents: 'none',
                        overflow: 'visible',
                    }}
                >
                </Player>
            </div>

            <div
                ref={turtleBaseRef}
                style={{
                    position: "fixed", width: _geo.width + "px"
                    , height: _geo.height + "px",
                    left: _geo.left + 'px',
                    top: _geo.top + 'px',
                    pointerEvents: 'none'
                }}
            >
                <div
                    ref={turtleAniRef}
                    // className='hideObject'
                    style={{
                        position: 'absolute',
                        width: '26%',
                        height: '20%',
                        left: '5%',
                        top: '35%',
                        pointerEvents: 'none',
                        overflow: 'visible',
                        transform: 'rotateY(180deg)'
                    }}
                >
                    <Player
                        ref={introturtle}
                        src={prePathUrl() + 'lottieFiles/character/turtle.json'}
                        loop
                        style={{
                            position: 'absolute',
                            width: '100%',
                            left: '0%',
                            top: '0%',
                            pointerEvents: 'none',
                            overflow: 'visible'
                        }}
                    >
                        {/* <Controls visible={false} buttons={['play', 'frame', 'debug']} /> */}
                    </Player>
                </div>
            </div>
        </div >
    );
}

