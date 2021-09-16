import Layout from '@components/Layout'
import { FiSliders, FiMessageCircle, FiMapPin, FiUsers } from 'react-icons/fi'
import styles from "@styles/pages/Home.module.css";

export default function Manifesto() {
  return (
    <Layout
      title='Valorisateur des pratiques du réemploi'
      padded
    >

      <div className={styles.banner}>
        <div className={styles.header}>
          <h1> Re-Label </h1>
          <h2> Valorisateur des pratiques du réemploi </h2>
          <p>
            <strong>RE-label</strong> est un agrégateur et valorisateur de pratiques collaboratives sur le réemploi à l'échelle d'un territoire restreint. Il offre aussi une lecture à plus grande échelle de toutes les initiatives RE-label.
          </p>

        </div>
        <div className={styles.items}>
          <div>
            <div className={styles.icon}><FiSliders/></div>
            <h2> Quantifier </h2>
            <p>
              <strong>RE-label</strong> qualifie, quantifie puis certifie des pratiques et des objets manufacturés en s'appuyant sur des informations utiles : matériau, provenance, travail et durabilité.
            </p>
          </div>
          <div>
            <div className={styles.icon}><FiMessageCircle /></div>
            <h2> Accompagner </h2>
            <p>
              <strong>RE-label</strong> observe, accompagne et valorise des pratiques de gestion et d'utilisation de matériaux à recycler ou employé, et récompense des actes d'achats responsables tout en sensibilisant les consommateurs.
            </p>
          </div>
          <div>
            <div className={styles.icon}><FiMapPin/></div>
            <h2> Local </h2>
            <p>
              <strong>RE-label</strong> est un outil de confiance qui se déploie sur un territoire restreint, un quartier, une commune ou une communauté de communes. Il est mis en place par une association, une coopérative, une collectivité qui en assure la gestion pour l'ensemble des parties prenantes.
            </p>
          </div>
          <div>
            <div className={styles.icon}> <FiUsers/></div>
            <h2> Collectif </h2>
            <p>
              <strong>RE-label</strong> s'active lorsqu'un groupe d'utilisateurs est prêt à incarner les valeurs et les objectifs du label (créateurs-trices, designers, architectes, artisan-nes, gérant-es d'atelier, ressourceries ou stocks, et que les usagers favorisent son développement).
            </p>
          </div>
        </div>
      </div>


    </Layout>
  );
}
