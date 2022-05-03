import "../../stylesheets/styles.css";
import "../../stylesheets/button.css";

import BaseImage from "../../components/BaseImage";
import { prePathUrl } from "../../components/CommonFunctions";
import { Player } from '@lottiefiles/react-lottie-player';

let folderName = 'ScaleBG/38/'
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
                url={folderName + "sb06_sb06_elephant_bg_sky.svg"}
            />
            <BaseImage
                url={folderName + "sb06_sb06_elephant_mg_ground.svg"}
            />


            <BaseImage
                scale={0.5}
                posInfo={{
                    l: 0.6,
                    t: 0.0
                }}
                url={folderName + "sb06_sb06_elephant_fg_tree_01.svg"}
            />
            <BaseImage
                scale={0.3}
                posInfo={{
                    l: 0.0,
                    t: 0.12
                }}
                url={folderName + "sb06_sb06_elephant_fg_tree_02.svg"}
            />
            <BaseImage
                scale={0.45}
                posInfo={{
                    l: 0.1,
                    t: 0.0
                }}
                url={folderName + "sb06_sb06_elephant_fg_tree_03.svg"}
            />
            <BaseImage
                scale={0.3}
                posInfo={{
                    l: 0.35,
                    t: 0.3
                }}
                url={"SB06/character/SB06_CI_Elephant.svg"}
            />


        </div>
    );
}

var list = []