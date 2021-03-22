import Link from 'next/link'
import styles from "@styles/Navigation.module.css";

const Navigation = (props)=>{
    return (
      <nav>
        <Link href="/">
          <div className={styles.title}>
            <a>Re-Label</a>
          </div>
        </Link>
        <Link href="/manifesto">
          <div className={styles.links} >
            <a>Manifeste</a>
          </div>
        </Link>
        <Link href="/community">
          <div className={styles.links} >
            <a>Communauté</a>
          </div>
        </Link>
        <Link href="/catalog">
          <div className={styles.links} >
            <a>Catalogue</a>
          </div>
        </Link>
        <Link href="/good-practices">
          <div className={styles.links} >
            <a>Bonnes Pratiques</a>
          </div>
        </Link>
        <Link href="/get-labeled">
          <div className={styles.links} >
            <a>Obtenir le label</a>
          </div>
        </Link>
      </nav>
    );
}


export default Navigation