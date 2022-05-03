import "../../stylesheets/styles.css";
import "../../stylesheets/button.css";

import BaseImage from "../../components/BaseImage";
import { prePathUrl } from "../../components/CommonFunctions";
import { Player } from '@lottiefiles/react-lottie-player';

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
                url={"ScaleBG/07/sb06_key_hanging_bg.svg"}
            />

            <BaseImage
                scale={0.3}
                posInfo={{
                    l: -0.1, t: 0.44
                }}
                url={"ScaleBG/07/sb06_fg_prop_02.svg"}
            />
            <BaseImage
                 scale={0.3}
                 posInfo={{
                     l: 0.8, t: 0.44
                 }}
                url={"ScaleBG/07/sb06_fg_prop_01.svg"}
            />
            <BaseImage
                scale={0.3}
                posInfo={{
                    l: 0.33, t: 0.3
                }}
                url={"ScaleBG/07/sb06_key_hanging_mg.svg"}
            />
        </div>
    );
}

var list = []