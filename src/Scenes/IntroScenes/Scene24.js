import "../../stylesheets/styles.css";
import "../../stylesheets/button.css";

import BaseImage from "../../components/BaseImage";
import { prePathUrl } from "../../components/CommonFunctions";
import { Player } from '@lottiefiles/react-lottie-player';

let folderName = 'ScaleBG/24/'
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
                url={folderName + "sb06_tap_bg.svg"}
            />

            <BaseImage
                url={folderName + "sb06_tap_mg.svg"}
            />
            <BaseImage

                scale={0.4}
                posInfo={{
                    l: 0.3, t: 0.2
                }}
                url={folderName + "sb06_tap_asset_01.svg"}
            />

        </div>
    );
}

var list = []