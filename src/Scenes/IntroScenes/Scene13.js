import "../../stylesheets/styles.css";
import "../../stylesheets/button.css";

import BaseImage from "../../components/BaseImage";
import { prePathUrl } from "../../components/CommonFunctions";
import { Player } from '@lottiefiles/react-lottie-player';

let folderName = 'ScaleBG/13/'
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
                url={folderName + "sb06_fg_ground.svg"}
            />

            <BaseImage
                scale={0.4}
                posInfo={{
                    l: -0.1,
                    t: 0.1
                }}
                url={folderName + "sb06_mg_prop_03.svg"}
            />

            <BaseImage
                scale={0.4}
                posInfo={{
                    l: 0.7,
                    t: 0.04
                }}
                url={folderName + "sb06_mg_prop_04.svg"}
            />

            <BaseImage
                scale={0.7}
                posInfo={{
                    l: 0.15,
                    t: 0.03
                }}
                url={folderName + "sb06_mg_prop_01.svg"}
            />


            <BaseImage
                scale={0.15}
                posInfo={{
                    l: 0.3,
                    t: 0.44
                }}
                url={folderName + "sb06_mg_prop_02.svg"}
            />
            <BaseImage
                scale={0.15}
                posInfo={{
                    l: 0.5,
                    t: 0.44
                }}
                url={folderName + "sb06_mg_prop_02.svg"}
            />



        </div>
    );
}

var list = []