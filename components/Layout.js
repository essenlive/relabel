import Head from "next/head";
import Navigation from "@components/Navigation";
import classNames from "classnames"
import styles from "@styles/components/Layout.module.css";

const Layout = ({title, padded, children})=>{
  return (
    <div className={styles.layout}>
      <Head>
        <title>Re-label | {title}</title>
        <link rel="icon" href="/Favicon.png" />
      </Head>
      <div className={styles.menu}>
        <Navigation />
      </div>

      <main className={classNames(styles.content, {[`${styles.padded}`] : padded})}>
          {children}
        </main>
    </div>
  );
}

export default Layout