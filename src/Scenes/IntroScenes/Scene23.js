import "../../stylesheets/styles.css";
import "../../stylesheets/button.css";

import BaseImage from "../../components/BaseImage";
import { prePathUrl } from "../../components/CommonFunctions";
import { Player } from '@lottiefiles/react-lottie-player';

let folderName = 'ScaleBG/23/'
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
                url={folderName + "sb06_sb06_dhoti_bg.svg"}
            />
            <BaseImage

                scale={0.2}
                posInfo={{
                    l: 0.75, t: 0.1
                }}
                url={folderName + "sb06_sb06_dhoti_bg_asset_01.svg"}
            />
            <BaseImage

                scale={0.2}
                posInfo={{
                    l: 0.0, t: 0.075
                }}
                url={folderName + "sb06_sb06_dhoti_bg_asset_02.svg"}
            />
            <BaseImage

                scale={0.25}
                posInfo={{
                    l: 0.1, t: 0.45
                }}
                url={folderName + "sb06_sb06_dhoti_bg_asset_03.svg"}
            />
            <BaseImage

                scale={0.4}
                posInfo={{
                    l: 0.35, t: 0.45
                }}
                url={folderName + "sb06_sb06_dhoti_bg_asset_04.svg"}
            />

            <BaseImage

                scale={0.13}
                posInfo={{
                    l: 0.48, t: 0.2
                }}
                url={"SB06/character/SB06_CI_Boy_Waring_Dhoti.svg"}
            />
        </div>
    );
}

var list = []