import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from "@styles/Navigation.module.css";

const Navigation = (props)=>{

  const router = useRouter()

    return (
      <nav  className={styles.nav}>
        <Link href="/">
          <div className={styles.title}>
            <a>Re-Label</a>
          </div>
        </Link>
        <Link href="/manifesto">
          <div className={router.route === '/manifesto' ? styles.linkActive : styles.links}>
            <a>Manifeste</a>
          </div>
        </Link>
        <Link href="/community">
          <div className={router.route === '/community' ? styles.linkActive : styles.links}>
            <a>Communauté</a>
          </div>
        </Link>
        <Link href="/catalog">
          <div className={router.route === '/catalog' ? styles.linkActive : styles.links}>
            <a>Catalogue</a>
          </div>
        </Link>
        <Link href="/good-practices">
          <div className={router.route === '/good-practices' ? styles.linkActive : styles.links}>
            <a>Bonnes Pratiques</a>
          </div>
        </Link>
        <Link href="/get-labeled">
          <div className={router.route === '/get-labeled' ? styles.linkActive : styles.links}>
            <a>Obtenir le label</a>
          </div>
        </Link>
      </nav>
    );
}


export default Navigation