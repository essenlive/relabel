import Layout from '@components/Layout'
import styles from '@styles/pages/Contact.module.css'
import Link from 'next/link';


export default function Contact() {
  
  return (
    <Layout 
      title='Contact'
      padded
    >
      <div className={styles.banner}>
        <div className={styles.header}>
          <h1> Nous contacter </h1>
          <p>
            Le projet <strong>RE-label</strong> est porté à Paris dans le cadre du projet ReFlow, par l'équipe de Ars Longa. Si vous avez des questions, des suggestions ou autre, contactez nous directement à <Link href="mailto:info@arslonga.fr"><span className={'link'}>info@arslonga.fr</span></Link>
          </p>
          <div className={styles.logos}>
            <img src='/assets/horizon2020_logo_black.png' />
            <img src='/assets/reflow.png'/>
            <img src='/assets/LOGO AL couleurs.png' />
          </div>
        </div>
        <div className={styles.items}>
          <div>
            <h3> Référencer une structure </h3>
            <p>
              Remplissez les informations liées à votre structure sur ce <Link href={{ pathname: '/structures/add' }}><span className={'link'}>formulaire</span></Link>.
            </p>
          </div>
          <div>
            <h3> Proposer une communauté </h3>
            <p>
              Remplissez le <Link href={{ pathname: '/communities/add' }}><span className={'link'}>formulaire</span></Link> et nous validerons votre communautée au plus vite.
            </p>
          </div>
          <div>
            <h3> Documenter une production </h3>
            <p>
              Utilisez le <Link href={{pathname: '/projects/add'}}><span className={'link'}>générateur de label</span></Link> et votre projet sera référencé dans la foulée.
            </p>
          </div>
          {/* <div>
            <h3> Partager une bonne pratique </h3>
            <p>
              Partagez une de vos bonnes pratiques en remplissant ce <Link href=""><span className={'link'}>formulaire</span></Link>.
            </p>
          </div> */}
        </div>
      </div>
    </Layout>
  );
}