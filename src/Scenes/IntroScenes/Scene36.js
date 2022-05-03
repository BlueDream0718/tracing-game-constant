import "../../stylesheets/styles.css";
import "../../stylesheets/button.css";

import BaseImage from "../../components/BaseImage";
import { prePathUrl } from "../../components/CommonFunctions";
import { Player } from '@lottiefiles/react-lottie-player';

let folderName = 'ScaleBG/36/'
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
                url={folderName + "sb06_bg_ground.svg"}
            />
            <BaseImage
                scale={0.15}
                posInfo={{
                    l: 0.425,
                    t: 0.55
                }}
                url={folderName + "sb06_fg_shatkon.svg"}
            />
        </div>
    );
}

var list = []