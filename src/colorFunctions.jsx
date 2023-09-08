import hexRgb from "hex-rgb"

export const SummaCorrection =  (hexColor)=>{
    let rgbColor = hexRgb(hexColor)

    let perceivedLightness = (rgbColor.red * 0.2126 + rgbColor.green * 0.7152 + rgbColor.blue * 0.0722)/255
    return 'hsl(0,0%,calc('+(perceivedLightness-0.8)+'*-10000000%))'
}