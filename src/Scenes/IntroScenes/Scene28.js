import "../../stylesheets/styles.css";
import "../../stylesheets/button.css";

import BaseImage from "../../components/BaseImage";
import { prePathUrl } from "../../components/CommonFunctions";
import { Player } from '@lottiefiles/react-lottie-player';

let folderName = 'ScaleBG/28/'
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
                url={folderName + "sb06_sb06_bhoja_bg.svg"}
            />
            <BaseImage
                scale={0.24}
                posInfo={{
                    l: 0.38, t: 0.56
                }}
                url={folderName + "sb06_sb06_bhoja_asset_01.svg"}
            />
        </div>
    );
}

var list = []