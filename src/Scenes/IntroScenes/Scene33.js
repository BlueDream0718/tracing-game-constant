import "../../stylesheets/styles.css";
import "../../stylesheets/button.css";

import BaseImage from "../../components/BaseImage";
import { prePathUrl } from "../../components/CommonFunctions";
import { Player } from '@lottiefiles/react-lottie-player';

let folderName = 'ScaleBG/33/'
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
                url={folderName + "sb06_sb06_aeroplane_bg.svg"}
            />
            <BaseImage
                scale={0.2}
                posInfo={{
                    l: 0.05,
                    t: 0.05
                }}
                url={folderName + "sb06_sb06_fg_cloud_01.svg"}
            />
            <BaseImage
                scale={0.2}
                posInfo={{
                    l: 0.05,
                    t: 0.65
                }}
                url={folderName + "sb06_sb06_fg_cloud_02.svg"}
            />
            <BaseImage
                scale={0.2}
                posInfo={{
                    l: 0.75,
                    t: 0.65
                }}
                url={folderName + "sb06_sb06_fg_cloud_03.svg"}
            />
            <BaseImage
                scale={0.2}
                posInfo={{
                    l: 0.45,
                    t: 0.25
                }}
                url={folderName + "sb06_sb06_fg_cloud_04.svg"}
            />
            <BaseImage
                scale={0.2}
                posInfo={{
                    l: 0.75,
                    t: 0.1
                }}
                url={folderName + "sb06_sb06_fg_cloud_05.svg"}
            />

            <BaseImage

                scale={0.25}
                posInfo={{
                    l: 0.375,
                    b: 0.25
                }}

                url={folderName + "sb06_sb06_aeroplane.svg"}
            />




        </div>
    );
}

var list = []