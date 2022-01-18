import Head from "next/head";
import Navigation from "@components/Navigation";
import classNames from "classnames"
import styles from "@styles/components/Layout.module.css";
import Footer from "@components/Footer";


const Layout = ({title, full, padded, children, grid, relative})=>{
  console.log(`Rendering page : ${title}`);
  return (
    <div className={styles.layout}>
      <Head>
        <title>Re-label | {title}</title>
        <link rel="icon" href="/Favicon.png" />
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