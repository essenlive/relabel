import styles from '@styles/components/Footer.module.css'
import Link from 'next/link';


export default function Footer() {
  
  return (
    <footer className={styles.footer}>
    <div className={styles.container}>

      <div className={styles.items}>
        <div>
          <h3>Structures </h3>
          <p><Link href={{ pathname: '/structures/' }}><span className={'link-simple'}>Carte des structures</span></Link></p>
          <p><Link href={{ pathname: '/structures/add' }}><span className={'link-simple'}>Référencer la votre</span></Link></p>
        </div>
        <div>
          <h3>Communautés </h3>
          <p><Link href={{ pathname: '/communities/' }}><span className={'link-simple'}>Liste des communautés</span></Link> </p>
          <p><Link href={{ pathname: '/communities/add' }}><span className={'link-simple'}>Proposer une communauté</span></Link></p>
        </div>
        <div>
          <h3> Productions </h3>
          <p><Link href={{ pathname: '/projects/' }}><span className={'link-simple'}>Portfolio</span></Link> </p>
          <p><Link href={{ pathname: '/projects/add' }}><span className={'link-simple'}>Labeliser un projet</span></Link></p>
        </div>
      </div>
        <div className={styles.header}>
          <h2> A propos </h2>
          <p>
            Le projet <strong>RE-label</strong> est porté à Paris dans le cadre du projet ReFlow, par l'équipe de Ars Longa. Si vous avez des questions, des suggestions ou autre, contactez nous directement à <Link href="mailto:info@arslonga.fr"><span className={'link'}>info@arslonga.fr</span></Link>
          </p>
          <div className={styles.logos}>
            <img src='/assets/horizon2020_logo_black.png' />
            <img src='/assets/reflow.png'/>
            <img src='/assets/LOGO AL couleurs.png' />
          </div>
        </div>
      </div>
    </footer>
  );
}