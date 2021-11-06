import ColorScheme from 'color-scheme'

export const getColors = (seed) => {
        const scheme = new ColorScheme;
        scheme.from_hue(seed)
            .scheme('tetrade')
            .variation('pastel');
        return scheme.colors().filter((el, i) => (i % 4 === 0)).slice(0, 4).map((el) => `#${el}`)
    };
export const  seed = () => Math.round(Math.random() * 35) * 10;