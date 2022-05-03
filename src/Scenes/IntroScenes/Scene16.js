import "../../stylesheets/styles.css";
import "../../stylesheets/button.css";

import BaseImage from "../../components/BaseImage";
import { prePathUrl } from "../../components/CommonFunctions";
import { Player } from '@lottiefiles/react-lottie-player';

let folderName = 'ScaleBG/16/'
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
                url={folderName + "sb06_sb06_dholak_bg.svg"}
            />


            <BaseImage
                url={folderName + "sb06_sb06_dholak_mg.svg"}
            />


            <BaseImage
                scale={0.45}
                posInfo={{
                    l: -0.01, t: -0.02
                }}
                url={folderName + "sb06_sb06_dholak_bg_asset_01.svg"}
            />



            <BaseImage
                scale={0.5}
                posInfo={{
                    l: 0.60, t: -0.13
                }}
                url={folderName + "sb06_sb06_dholak_bg_asset_03.svg"}
            />

            <BaseImage
                scale={0.6}
                posInfo={{
                    l: 0.25, t: 0.32
                }}
                url={folderName + "sb06_sb06_dholak_bg_asset_02.svg"}
            />
            <BaseImage
                scale={0.18}
                posInfo={{
                    l: 0.43, t: 0.25
                }}
                url={"SB06/character/SB06_CI_Boy_With_Dholak.svg"}
            />

        </div>
    );
}

var list = []