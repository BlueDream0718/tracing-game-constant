import "../../stylesheets/styles.css";
import "../../stylesheets/button.css";

import BaseImage from "../../components/BaseImage";
import { prePathUrl } from "../../components/CommonFunctions";
import { Player } from '@lottiefiles/react-lottie-player';

let folderName = 'ScaleBG/37/'
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
                url={folderName + "sb06_bg_sky.svg"}
            />
            <BaseImage
                url={folderName + "sb06_fg_bushes.svg"}
            />

            <BaseImage

                url={folderName + "sb06_mg_grass.svg"}
            />
            <BaseImage
                scale={0.5}
                posInfo={{
                    l: 0.0,
                    t: 0.0
                }}
                url={folderName + "sb06_mg_tree.svg"}
            />
            <BaseImage
                scale={0.15}
                posInfo={{
                    l: 0.4,
                    t: 0.55
                }}
                url={"SB06/character/SB06_CI_Snake.svg"}
            />


        </div>
    );
}

var list = []