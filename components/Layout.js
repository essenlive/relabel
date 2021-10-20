import Head from "next/head";
import Navigation from "@components/Navigation";
import classNames from "classnames"
import styles from "@styles/components/Layout.module.css";

const Layout = ({title, full, padded, children, grid})=>{
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

      <main className={classNames(styles.content, { [`${styles.padded}`]: padded }, { [`${styles.full}`]: full }, { [`${styles.grid}`]: grid })}>
          {children}
        </main>

      <svg className="background--custom" id="demo" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path fill={"var(--primary)"} fillOpacity="0.3" d="M-100 -100L200 -100L200 30L-100 30Z" style={{ animation: "path0 20s linear infinite alternate" }} /><path fill={"var(--secondary)"} fillOpacity="0.1" d="M-100 -100L200 -100L200 60L-100 60Z" style={{ animation: "path1 100s linear infinite alternate" }} /><path fill={"var(--tertiary)"} fillOpacity="0.2" d="M-100 -100L200 -100L200 60L-100 60Z" style={{animation: "path2 50s linear infinite alternate"}} />
      </svg>
    </div>
  );
}

export default Layout