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
                url={"ScaleBG/06/sb06_chidiya_bg.svg"}
            />
            <BaseImage
                scale={0.2}
                posInfo={{
                    l: 0.1, t: 0.3
                }}
                url={"ScaleBG/06/sb06_chidiya_bg_cloud_01.svg"}
            />
            <BaseImage
                scale={0.12}
                posInfo={{
                    l: 0.5, t: 0.1
                }}
                url={"ScaleBG/06/sb06_chidiya_bg_cloud_02.svg"}
            />
            <BaseImage
                scale={0.2}
                posInfo={{
                    l: 0.7, t: 0.5
                }}
                url={"ScaleBG/06/sb06_chidiya_bg_cloud_01.svg"}
            />
            <BaseImage
                scale={0.1}
                posInfo={{
                    l: 0.8, t: 0.3
                }}
                url={"ScaleBG/06/sb06_chidiya_bg_cloud_03.svg"}
            />
            <BaseImage
                scale={1}
                posInfo={{
                    l: 0.0, t: 0.0
                }}
                url={"ScaleBG/06/sb06_chidiya_fg.svg"}
            />
            <BaseImage
                scale={0.3}
                posInfo={{
                    l: 0.3, t: 0.34
                }}
                url={"SB06/Character/SB06_CI_Chidiya.svg"}
            />
        </div>
    );
}

var list = []