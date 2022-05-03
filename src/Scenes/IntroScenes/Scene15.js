import "../../stylesheets/styles.css";
import "../../stylesheets/button.css";

import BaseImage from "../../components/BaseImage";
import { prePathUrl } from "../../components/CommonFunctions";
import { Player } from '@lottiefiles/react-lottie-player';

let folderName = 'ScaleBG/15/'
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

                url={folderName + "sb06_bg_room.svg"}
            />


            <BaseImage
                scale={0.3}
                posInfo={{
                    l: 0.35, t: 0.2
                }}
                url={folderName + "sb06_bg_window.svg"}
            />

            <BaseImage
                scale={0.3}
                posInfo={{
                    l: 0.5, t: 0.3
                }}
                url={folderName + "sb06_mg_prop_01.svg"}
            />

            <BaseImage
                scale={0.2}
                posInfo={{
                    l: 0.8, t: 0.1
                }}
                url={folderName + "sb06_mg_prop_02.svg"}
            />
            <BaseImage
                scale={0.08}
                posInfo={{
                    l: 0.1, t: 0.2
                }}
                url={folderName + "sb06_mg_prop_03.svg"}
            />
            <BaseImage
                scale={0.14}
                posInfo={{
                    l: 0.42, t: 0.22
                }}
                url={"SB06/character/SB06_CI_Doctor.svg"}
            />

        </div>
    );
}

var list = []