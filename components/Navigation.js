import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from "@styles/components/Navigation.module.css";

export default function Navigation(props) {
  const router = useRouter()

    return (
      <nav  className={styles.nav}>
        <Link href="/">
          <div className={styles.logo}>
            <a>
              <img src="/assets/logo.png" alt="logo relabel" />
            </a>
          </div>
        </Link>
        <div className={styles.menu}>
          <Link href="/structures">
            <div className={router.route === '/structures' ? styles.linkActive : styles.links}>
              <a>Carte</a>
            </div>
          </Link>
          <Link href="/communities">
            <div className={router.route === '/communities' ? styles.linkActive : styles.links}>
              <a>Communautés</a>
            </div>
          </Link>
          <Link href="/projects">
            <div className={router.route === '/projects' ? styles.linkActive : styles.links}>
              <a>Productions</a>
            </div>
          </Link>
          {/* <Link href="/practices">
            <div className={router.route === '/practices' ? styles.linkActive : styles.links}>
              <a>Pratiques</a>
            </div>
          </Link> */}
          {/* <Link href="/contact">
            <div className={router.route === '/contact' ? styles.linkActive : styles.linksEmphasis}>
              <a>Nous contacter</a>
            </div>
          </Link> */}
        </div>

      </nav>
    );
}