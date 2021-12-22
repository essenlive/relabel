import Layout from '@components/Layout'
import Link from 'next/link';
import styles from "@styles/pages/Home.module.css";

export default function Manifesto() {
  return (
    <Layout
      title='Valorisateur des pratiques du réemploi'
      padded
    >

      <div className={styles.banner}>
        <div className={styles.header}>
          <h1>Re-Label</h1>
          <h2>Un outils collaboratif qui recense et partage</h2>
          {/* <p>
            <strong>RE-label</strong> est un agrégateur et valorisateur de pratiques collaboratives sur le réemploi à l'échelle d'un territoire restreint. Il offre aussi une lecture à plus grande échelle de toutes les initiatives RE-label.
          </p> */}

        </div>
        <div className={styles.items}>
          <div>
            Des <strong className={"link"}><Link href="/projects">productions responsables</Link></strong> </div>
          <div> réalisées par des <strong className={"link"}><Link href="/structures">acteurs engagés</Link></strong> </div>
          <div>issues de <strong className={"link"}><Link href="/communities">communautées locales</Link></strong>.</div>
        </div>
        <div className={styles.guides}>
          <div>
          </div>
          <div>
          </div>
          <div>
          </div>
          <div>
          </div>
        </div>
        <div className={styles.image}>

          <img src="/assets/hero-blank.png" alt="logo relabel" />
        </div>
      </div>


    </Layout>
  );
}
