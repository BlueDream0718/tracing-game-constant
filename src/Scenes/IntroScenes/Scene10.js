import "../../stylesheets/styles.css";
import "../../stylesheets/button.css";

import BaseImage from "../../components/BaseImage";
import { prePathUrl } from "../../components/CommonFunctions";
import { Player } from '@lottiefiles/react-lottie-player';

let folderName = 'ScaleBG/10/'
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
                url={folderName + "sb06_rushi_bg.svg"}
            />
            <BaseImage
                url={folderName + "sb06_rushi_fg.svg"}
            />
            <BaseImage
                url={folderName + "sb06_rushi_mg.svg"}
            />
            <BaseImage
                scale={0.6}
                posInfo={{
                    l: 0.2,
                    t: -0.11
                }}
                url={folderName + "sb06_rushi_mg_tree.svg"}
            />


            <BaseImage
                scale={0.2}
                posInfo={{
                    l: 0.4, t: 0.42
                }}
                url={"SB06/Character/SB06_CI_Rushi.svg"}
            />



        </div>
    );
}

var list = []