import Document, { Html, Head, Main, NextScript } from 'next/document';
import { SheetsRegistry, JssProvider, createGenerateId } from 'react-jss';

export default class _Document extends Document {
    static async getInitialProps(ctx) {
        const registry = new SheetsRegistry();
        const generateId = createGenerateId();
        const originalRenderPage = ctx.renderPage;

        ctx.renderPage = () =>
            originalRenderPage({
                enhanceApp: (App) => (props) => (
                    <JssProvider registry={registry} generateId={generateId}>
                        <App {...props} />
                    </JssProvider>
                ),
            });

        const initialProps = await Document.getInitialProps(ctx);
        return {
            ...initialProps,
            styles: (
                <>
                    {initialProps.styles}
                    <style id="mantine-ssr-styles">{registry.toString()}</style>
                </>
            ),
        };
    }

    render() {
        const umami = !process.env.NEXT_PUBLIC_UMAMI ? null : JSON.parse(process.env.NEXT_PUBLIC_UMAMI);
        return (
            <Html lang="fr">
                <Head>
                    <link rel="icon" href="/Favicon.png" />
                    
                </Head>
                <body>
                    <Main />
                    <NextScript />
                    {umami && <script async defer data-website-id={umami.id} src={umami.url}></script>}
                </body>
            </Html>
        );
    }
}