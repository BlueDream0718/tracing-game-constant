import "../../stylesheets/styles.css";
import "../../stylesheets/button.css";

import BaseImage from "../../components/BaseImage";
import { prePathUrl } from "../../components/CommonFunctions";
import { Player } from '@lottiefiles/react-lottie-player';

let folderName = 'ScaleBG/22/'
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
                url={folderName + "sb06_sb06_door_bg.svg"}
            />
            <BaseImage

                scale={0.3}
                posInfo={{
                    l: 0.05, t: 0.53
                }}
                url={folderName + "sb06_sb06_door_bg_asset_01.svg"}
            />
            <BaseImage

                scale={0.38}
                posInfo={{
                    l: 0.6, t: 0.075
                }}
                url={folderName + "sb06_sb06_door_bg_asset_02.svg"}
            />
            <BaseImage

                scale={0.25}
                posInfo={{
                    l: 0.1, t: 0.13
                }}
                url={folderName + "sb06_sb06_door_bg_asset_03.svg"}
            />
        </div>
    );
}

var list = []