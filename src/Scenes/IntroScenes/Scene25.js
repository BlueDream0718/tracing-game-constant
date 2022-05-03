import "../../stylesheets/styles.css";
import "../../stylesheets/button.css";

import BaseImage from "../../components/BaseImage";
import { prePathUrl } from "../../components/CommonFunctions";
import { Player } from '@lottiefiles/react-lottie-player';

let folderName = 'ScaleBG/25/'
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
                url={folderName + "sb06_sb06_kite_bg.svg"}
            />
            <BaseImage
                scale={0.3}
                posInfo={{
                    l: 0.00, t: 0.05
                }}
                url={folderName + "sb06_sb06_kite_bg_cloud_01.svg"}
            />
            <BaseImage
                scale={0.2}
                posInfo={{
                    l: 0.70, t: 0.05
                }}
                url={folderName + "sb06_sb06_kite_bg_cloud_02.svg"}
            />
            <BaseImage
                scale={0.25}
                posInfo={{
                    l: 0.40, t: 0.00
                }}
                url={folderName + "sb06_sb06_kite_bg_cloud_03.svg"}
            />
            <BaseImage
                scale={0.25}
                posInfo={{
                    l: 0.60, t: 0.2
                }}
                url={folderName + "sb06_sb06_kite_bg_cloud_04.svg"}
            />
            <BaseImage
                scale={0.2}
                posInfo={{
                    l: 0.45, t: 0.25
                }}
                url={folderName + "sb06_sb06_kite_fg_01.svg"}
            />

            <BaseImage
                scale={0.2}
                posInfo={{
                    l: 0.3, t: 0.2
                }}
                url={folderName + "sb06_sb06_kite_fg_02.svg"}
            />

        </div>
    );
}

var list = []