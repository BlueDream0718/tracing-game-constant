import { prePathUrl } from "../components/CommonFunctions";

const loadSound = (name, isEffectSound = false) => {
    return new Audio(prePathUrl() + "sounds/" + (isEffectSound ? "effect/" : "") + name + ".mp3")
}

const returnAudioPath = (name, isCommon = false) => {
    return prePathUrl() + "sounds/" + (isCommon ? 'common/' : '') + "sb_06_audio_" + name + ".mp3"
}

export default loadSound
export { returnAudioPath }