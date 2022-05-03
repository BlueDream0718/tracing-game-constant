import "../../stylesheets/styles.css";
import "../../stylesheets/button.css";

import BaseImage from "../../components/BaseImage";
import { prePathUrl } from "../../components/CommonFunctions";
import { Player } from '@lottiefiles/react-lottie-player';

let folderName = 'ScaleBG/14/'
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
                scale={1.2}

                posInfo={{
                    l: -0.1, t: -0.1
                }}
                url={folderName + "sb06_thela_bg.svg"}
            />


            <BaseImage
                scale={0.3}
                posInfo={{
                    l: 0.33,
                    t: 0.2
                }}
                url={folderName + "sb06_thela.svg"}
            />




        </div>
    );
}

var list = []