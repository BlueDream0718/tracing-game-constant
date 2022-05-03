import "../../stylesheets/styles.css";
import "../../stylesheets/button.css";

import BaseImage from "../../components/BaseImage";
import { prePathUrl } from "../../components/CommonFunctions";
import { Player } from '@lottiefiles/react-lottie-player';

let folderName = 'ScaleBG/31/'
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
                url={folderName + "sb06_bg_wall.svg"}
            />
            <BaseImage
                url={folderName + "sb06_fg_table.svg"}
            />
            
            <BaseImage
                scale={0.25}
                posInfo={{
                    l: 0.375,
                    b: 0.25
                }}
                url={folderName + "sb06_bg_prop_roti.svg"}
            />


        </div>
    );
}

var list = []