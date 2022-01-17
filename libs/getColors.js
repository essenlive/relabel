import ColorScheme from 'color-scheme'

export const getColors = (seed) => {
        const scheme = new ColorScheme;
        scheme.from_hue(seed)
            .scheme('tetrade')
            .variation('pastel');
        return scheme.colors().filter((el, i) => (i % 4 === 0)).slice(0, 4).map((el) => `#${el}`)
    };
export const seed = () => Math.round(Math.random() * 35) * 10; 
export const createMap = (colors = ["#D3494E", "#FFE5AD", "#13BBAF", "#7BC8F6"]) => {
    let colorMap = new Map();
    colorMap.set("designer", colors[0] ? colors[0] : "#D3494E")
    colorMap.set("atelier", colors[1] ? colors[1] : "#FFE5AD")
    colorMap.set("stockage", colors[2] ? colors[2] : "#13BBAF")
    colorMap.set("autre", colors[3] ? colors[3] : "#7BC8F6")
    return colorMap
}