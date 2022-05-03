import "../../stylesheets/styles.css";
import "../../stylesheets/button.css";

import BaseImage from "../../components/BaseImage";
import { prePathUrl } from "../../components/CommonFunctions";
import { Player } from '@lottiefiles/react-lottie-player';

let folderName = 'ScaleBG/27/'
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
                url={folderName + "sb06_sb06_goat_bg.svg"}
            />

            <BaseImage
                url={folderName + "sb06_sb06_goat_mg.svg"}
            />
            <BaseImage
                scale={0.5}
                posInfo={{
                    l: -0.1, t: -0.2
                }}
                url={folderName + "sb06_sb06_goat_bg_tree_01.svg"}
            />
            <BaseImage
                scale={0.15}
                posInfo={{
                    l: 0.38, t: 0.4
                }}
                url={folderName + "SB01_G_Goat.svg"}
            />
            <BaseImage
                scale={0.036}
                posInfo={{
                    l: 0.404, t: 0.495
                }}
                url={folderName + "SB01_G_Goat_Eye_01.svg"}
            />

            <BaseImage
                scale={0.5}
                posInfo={{
                    l: 0.5, t: -0.1
                }}
                url={folderName + "sb06_sb06_goat_bg_tree_02.svg"}
            />
            <BaseImage
                url={folderName + "sb06_sb06_goat_fg.svg"}
            />

            <BaseImage
                scale={0.5}
                posInfo={{
                    l: -0.1, t: -0.2
                }}
                url={"SB06/character/.svg"}
            />
        </div>
    );
}

var list = []