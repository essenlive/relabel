import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from "@styles/Navigation.module.css";

export default function Navigation(props) {
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
        <Link href="/projects">
          <div className={router.route === '/projects' ? styles.linkActive : styles.links}>
            <a>Projets</a>
          </div>
        </Link>
        <Link href="/good-practices">
          <div className={router.route === '/good-practices' ? styles.linkActive : styles.links}>
            <a>Bonnes Pratiques</a>
          </div>
        </Link>
      </nav>
    );
}