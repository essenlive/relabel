import ColorScheme from 'color-scheme'

export const getTriad = (seed) => {
        const scheme = new ColorScheme;
        scheme.from_hue(seed)
            .scheme('triade')
            .variation('pastel');
        return scheme.colors().filter((el, i) => (i % 4 === 0)).slice(0, 3).map((el) => `#${el}`)
    };
export const  seed = () => Math.round(Math.random() * 35) * 10;