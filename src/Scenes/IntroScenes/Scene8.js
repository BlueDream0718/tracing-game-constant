import "../../stylesheets/styles.css";
import "../../stylesheets/button.css";

import BaseImage from "../../components/BaseImage";
import { prePathUrl } from "../../components/CommonFunctions";
import { Player } from '@lottiefiles/react-lottie-player';

let folderName = 'ScaleBG/08/'
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
                url={folderName + "sb06_umbrella_bg.svg"}
            />

            <BaseImage
                scale={0.5}
                posInfo={{
                    l: 0.0, t: 0.1
                }}
                url={folderName + "sb06_umbrella_mg_tree_01.svg"}
            />

            <BaseImage
                posInfo={{
                    l: 0, t: 0.45
                }}
                url={folderName + "sb06_umbrella_fg_bushes.svg"}
            />



            <BaseImage
                scale={0.5}
                posInfo={{
                    l: 0.3, t: 0.3
                }}
                url={folderName + "sb06_umbrella_fg_tree_02.svg"}
            />
            <BaseImage

                url={folderName + "sb06_umbrella_mg.svg"}
            />

            <BaseImage
                scale={0.5}
                posInfo={{
                    l: 0.0, t: 0.2
                }}
                url={folderName + "sb06_umbrella_mg_tree_02.svg"}
            />
            <BaseImage
                scale={0.4}
                posInfo={{
                    l: 0.4, t: 0.1
                }}
                url={folderName + "sb06_umbrella_fg_tree_01.svg"}
            />

            <BaseImage
                url={folderName + "sb06_umbrella_fg_rain.svg"}
            />
            <BaseImage
                scale={0.35}
                posInfo={{
                    l: 0.35, t: 0.1
                }}
                url={"SB06/Character/SB06_CI_Umbrella_With_Characters.svg"}
            />


        </div>
    );
}

var list = []