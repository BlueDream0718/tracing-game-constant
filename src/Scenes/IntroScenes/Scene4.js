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
                url={"ScaleBG/04/sb06_sb06_garden_bg.svg"}
            />
            <BaseImage
                url={"ScaleBG/04/sb06_sb06_garden_fg.svg"}
            />
            <BaseImage
                scale={0.12}
                posInfo={{
                    l: 0.4, t: 0.35
                }}
                url={"ScaleBG/04/sb06_sb06_garden_mg_pot_01.svg"}
            />
            <BaseImage
                scale={0.12}
                posInfo={{
                    l: 0.7, t: 0.35
                }}
                url={"ScaleBG/04/sb06_sb06_garden_mg_pot_02.svg"}
            />
            <BaseImage
                scale={0.18}
                posInfo={{
                    l: 0.5, t: 0.4
                }}
                url={"ScaleBG/04/sb06_sb06_garden_mg_pot_03.svg"}
            />
            <BaseImage
                scale={0.2}
                posInfo={{
                    l: 0.78, t: 0.38
                }}
                url={"ScaleBG/04/sb06_sb06_garden_mg_pot_04.svg"}
            />
            <BaseImage
                scale={0.2}
                posInfo={{
                    l: 0.23, t: 0.1
                }}
                url={"SB06/character/SB06_CI_Father_Watering_Pots.svg"}
            />
            

        </div>
    );
}

var list = []