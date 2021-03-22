import Head from "next/head";
import Navigation from "@components/Navigation";
import styles from "@styles/Layout.module.css";

const Layout = (props)=>{
  return (
    <div className={styles.layout}>
      <Head>
        <title>Re-label | {props.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.sideBar}>
        <Navigation />
      </div>

        <main className={styles.content}>
          {props.children}
        </main>
    </div>
  );
}

export default Layout