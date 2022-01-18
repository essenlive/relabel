import Head from "next/head";
import Navigation from "@components/Navigation";
import classNames from "classnames"
import styles from "@styles/components/Layout.module.css";
import Footer from "@components/Footer";
import { useRouter } from "next/router";

const Layout = ({meta={}, title, full, padded, children, grid, relative})=>{
  console.log(`Rendering page : ${meta.title}`);
  const router = useRouter()
  return (
    <div className={styles.layout}>
      <Head>
        {meta.title && <title>Re-label | {meta.title}</title>}
        {meta.description && <meta name="description" content={meta.description} />}
        {meta.title && <meta name="og:title" content={meta.title} />}
        {meta.description && <meta name="og:description" content={meta.description} />}
        {meta.image && <meta name="og:image" content={meta.image} />}

        <link rel="icon" href="/Favicon.png" />
        <meta name="og:url" content={`https://re-label.eu${router.asPath}`} />
        <meta name="og:locale" content="fr_FR" />
        <meta name="og:site_name" content="Re-Label" />
        <meta property="og:type" content="website" />



      </Head>
      <div className={styles.menu}>
        <Navigation />
      </div>

      <main className={classNames(styles.content, { [`${styles.padded}`]: padded }, { [`${styles.full}`]: full }, { [`${styles.grid}`]: grid }, { [`${styles.relative}`]: relative })}>
          {children}
      </main>

      <Footer/>

    </div>
  );
}

export default Layout