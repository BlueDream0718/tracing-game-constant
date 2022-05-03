import "../../stylesheets/styles.css";
import "../../stylesheets/button.css";

import BaseImage from "../../components/BaseImage";
import { prePathUrl } from "../../components/CommonFunctions";
import { Player } from '@lottiefiles/react-lottie-player';

let folderName = 'ScaleBG/35/'
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
                url={folderName + "sb06_bg_ground.svg"}
            />
            <BaseImage
                url={folderName + "sb06_fg_bag.svg"}
            />

            <BaseImage
                scale={0.2}
                posInfo={{
                    l: 0.4,
                    t: 0.2
                }}
                url={"SB06/character/SB06_CI_Shramik.svg"}
            />


        </div>
    );
}

var list = []