import "../../stylesheets/styles.css";
import "../../stylesheets/button.css";

import BaseImage from "../../components/BaseImage";
import { prePathUrl } from "../../components/CommonFunctions";
import { Player } from '@lottiefiles/react-lottie-player';

let folderName = 'ScaleBG/30/'
export default function Scene() {
    return (
        <div
            style={{
                position: "absolute",
                width: "100%"
                , height: "100%",
                left: '0%',
                top: '0%',
            }}
        >
            <BaseImage
                url={folderName + "sb06_yuvak_bg.svg"}
            />
            <BaseImage
                scale={0.25}
                posInfo={{
                    l: 0.375,
                    b: -0.05
                }}
                url={"SB06/character/SB06_CI_Yuvak.svg"}
            />


        </div>
    );
}

var list = []