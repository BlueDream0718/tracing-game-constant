import "../../stylesheets/styles.css";
import "../../stylesheets/button.css";

import { useEffect, useRef } from "react";
import BaseImage from "../../components/BaseImage";
import { prePathUrl, Switch } from "../../components/CommonFunctions";
import { Player } from '@lottiefiles/react-lottie-player';

import Scene1 from "../IntroScenes/Scene1"
import Scene2 from "../IntroScenes/Scene2"
import Scene3 from "../IntroScenes/Scene3"
import Scene4 from "../IntroScenes/Scene4"
import Scene5 from "../IntroScenes/Scene5"
import Scene6 from "../IntroScenes/Scene6"
import Scene7 from "../IntroScenes/Scene7"
import Scene8 from "../IntroScenes/Scene8"
import Scene9 from "../IntroScenes/Scene9"
import Scene10 from "../IntroScenes/Scene10"
import Scene11 from "../IntroScenes/Scene11"
import Scene12 from "../IntroScenes/Scene12"
import Scene13 from "../IntroScenes/Scene13"
import Scene14 from "../IntroScenes/Scene14"
import Scene15 from "../IntroScenes/Scene15"
import Scene16 from "../IntroScenes/Scene16"
import Scene17 from "../IntroScenes/Scene17"
import Scene18 from "../IntroScenes/Scene18"
import Scene19 from "../IntroScenes/Scene19"
import Scene20 from "../IntroScenes/Scene20"
import Scene21 from "../IntroScenes/Scene21"
import Scene22 from "../IntroScenes/Scene22"
import Scene23 from "../IntroScenes/Scene23"
import Scene24 from "../IntroScenes/Scene24"
import Scene25 from "../IntroScenes/Scene25"
import Scene26 from "../IntroScenes/Scene26"
import Scene27 from "../IntroScenes/Scene27"
import Scene28 from "../IntroScenes/Scene28"
import Scene29 from "../IntroScenes/Scene29"
import Scene30 from "../IntroScenes/Scene30"
import Scene31 from "../IntroScenes/Scene31"
import Scene32 from "../IntroScenes/Scene32"
import Scene33 from "../IntroScenes/Scene33"
import Scene34 from "../IntroScenes/Scene34"
import Scene35 from "../IntroScenes/Scene35"
import Scene36 from "../IntroScenes/Scene36"
import Scene37 from "../IntroScenes/Scene37"
import Scene38 from "../IntroScenes/Scene38"

export default function Scene({ currentLetterNum
}) {

    useEffect(() => {
    }, [])

    return (
        <div
            style={{
                position: "absolute", width: "100%"
                , height: "100%",
                left: '0%',
                top: '0%',
            }}
        >
            <Switch test={currentLetterNum}>
                <Scene1 value={0} />
                <Scene2 value={1} />
                <Scene3 value={2} />
                <Scene4 value={3} />
                <Scene5 value={4} />
                <Scene6 value={5} />
                <Scene7 value={6} />
                <Scene8 value={7} />
                <Scene9 value={8} />
                <Scene10 value={9} />
                <Scene11 value={10} />
                <Scene12 value={11} />
                <Scene13 value={12} />
                <Scene14 value={13} />
                <Scene15 value={14} />
                <Scene16 value={15} />
                <Scene17 value={16} />
                <Scene18 value={17} />
                <Scene19 value={18} />
                <Scene20 value={19} />
                <Scene21 value={20} />
                <Scene22 value={21} />
                <Scene23 value={22} />
                <Scene24 value={23} />
                <Scene25 value={24} />
                <Scene26 value={25} />
                <Scene27 value={26} />
                <Scene28 value={27} />
                <Scene29 value={28} />
                <Scene30 value={29} />
                <Scene31 value={30} />
                <Scene32 value={31} />
                <Scene33 value={32} />
                <Scene34 value={33} />
                <Scene35 value={34} />
                <Scene36 value={35} />
                <Scene37 value={36} />
                <Scene38 value={37} />
            </Switch>
        </div>
    );
}

var list = []