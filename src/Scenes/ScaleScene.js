import "../stylesheets/styles.css";
import "../stylesheets/button.css";

import { useEffect, useRef } from "react";
import BaseImage from "../components/BaseImage";
import { prePathUrl } from "../components/CommonFunctions";
import { returnAudioPath } from "../utils/loadSound";
import { Player } from '@lottiefiles/react-lottie-player';

const audioPath = [
    { first: '02', second: '03', third: '04' },
    { first: '02', second: '04', third: '44' },
    { first: '02', second: '05', third: '49' },
    { first: '02', second: '06', third: '54' },
    { first: '02', second: '07', third: '59' },
    { first: '02', second: '08', third: '64' },
    { first: '02', second: '15', third: '69' },
    { first: '02', second: '09', third: '74' },
    { first: '02', second: '10', third: '79' },
    { first: '02', second: '11', third: '84' },
    { first: '02', second: '12', third: '89' }, //77
    { first: '02', second: '13', third: '201' },

    { first: '02', second: '14', third: '39' },
]



export default function Scene({ nextFunc, _baseGeo, currentLetterNum, _geo,
    audioList
}) {
    const parentObject = useRef()
    const turtleBaseRef = useRef();
    const introturtle = useRef();
    const scaleRef = useRef()

    useEffect(() => {

        audioList.bodyAudio1.src = returnAudioPath(audioPath[currentLetterNum].first)
        audioList.bodyAudio2.src = returnAudioPath(audioPath[currentLetterNum].second)
        audioList.bodyAudio3.src = returnAudioPath(audioPath[currentLetterNum].third)


        setTimeout(() => {
            audioList.bodyAudio1.play()
            introturtle.current.play()

            setTimeout(() => {
                introturtle.current.stop()
                setTimeout(() => {
                    scaleRef.current.className = 'show-item'
                    setTimeout(() => {
                        audioList.bodyAudio2.play()
                        setTimeout(() => {
                            audioList.bodyAudio3.play()

                            setTimeout(() => {
                                scaleRef.current.style.transform = 'scale(1.4)'
                                scaleRef.current.style.transition = '3s'
                            }, 3000);

                            setTimeout(() => {
                                nextFunc()
                            }, audioList.bodyAudio3.duration * 1000 + 3000);
                        }, audioList.bodyAudio2.duration * 1000);
                    }, 800);
                }, 500);

            }, audioList.bodyAudio1.duration * 1000);
        }, 2500);

        return () => {
        }

    }, [])



    return (
        <div
            className="aniObject"
            ref={parentObject}
            style={{
                position: "fixed", width: _baseGeo.width + "px"
                , height: _baseGeo.height + "px",
                left: _baseGeo.left + 'px',
                top: _baseGeo.bottom + 'px',
            }}
        >

            <Player
                src={prePathUrl() + 'lottieFiles/character/fishes.json'}
                loop
                autoplay
                style={{
                    position: 'absolute',
                    width: '100%',
                    left: '0%',
                    top: '0%',
                    pointerEvents: 'none',
                    overflow: 'visible'
                }}
            >
            </Player>

            <Player
                className="aniObjectDelay"
                src={prePathUrl() + 'lottieFiles/sea_letters/ka.json'}
                style={{
                    position: 'absolute',
                    width: '20%',
                    left: '40%',
                    top: '30%',
                    pointerEvents: 'none',
                    overflow: 'visible'
                }}
            >
            </Player>

            <div
                ref={turtleBaseRef}
                style={{
                    position: "fixed", width: _baseGeo.width + "px"
                    , height: _baseGeo.height + "px",
                    left: _baseGeo.left + 'px',
                    top: _baseGeo.bottom + 'px',
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        width: '25%',
                        left: '58%',
                        top: '25%',
                        pointerEvents: 'none',
                        overflow: 'visible'
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
                    </Player>
                </div>
            </div>



            <img
                ref={scaleRef}
                className='hideObject'
                width={'100%'}
                style={{
                    position: 'absolute',
                    left: '0%',
                    top: '0%',
                }}
                src={prePathUrl() + "images/ScaleBG/SB06_Slide_003.svg"}
            />
        </div>
    );
}

var list = []