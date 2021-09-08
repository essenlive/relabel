import Layout from '@components/Layout'
import { Title, Text } from '@mantine/core';
import classNames from "classnames"
import styles from "@styles/pages/Home.module.css";

export default function Manifesto() {
  return (
    <Layout
      title='Manifesto'
      padded
    >

      <div className={styles.banner}>
        <div className={styles.header}>
          <Title order={1}> Re-Label </Title>
          <Title order={2}> Valorisateur des pratiques du réemploi </Title>
          <Text size="xl" style={{ marginTop: 10 }}>
            <strong>RE-label</strong> est un agrégateur et valorisateur de pratiques collaboratives sur le réemploi à l'échelle d'un territoire restreint. Il offre aussi une lecture à plus grande échelle de toutes les initiatives RE-label.
          </Text>

        </div>
        <div className={styles.items}>
          <div>
            <div className={styles.icon}></div>
            <Title order={2}> Quantifier </Title>
            <Text size="xl" style={{ marginTop: 10 }}>
              <strong>RE-label</strong> qualifie, quantifie puis certifie des pratiques et des objets manufacturés en s'appuyant sur des informations utiles : matériau, provenance, travail et durabilité.
            </Text>
          </div>
          <div>
            <div className={styles.icon}></div>
            <Title order={2}> Accompagner </Title>
            <Text size="xl" style={{ marginTop: 10 }}>
              <strong>RE-label</strong> observe, accompagne et valorise des pratiques de gestion et d'utilisation de matériaux à recycler ou employé, et récompense des actes d'achats responsables tout en sensibilisant les consommateurs.
            </Text>
          </div>
          <div>
            <div className={styles.icon}></div>
            <Title order={2}> Local </Title>
            <Text size="xl" style={{ marginTop: 10 }}>
              <strong>RE-label</strong> est un outil de confiance qui se déploie sur un territoire restreint, un quartier, une commune ou une communauté de communes. Il est mis en place par une association, une coopérative, une collectivité qui en assure la gestion pour l'ensemble des parties prenantes.
            </Text>
          </div>
          <div>
            <div className={styles.icon}></div>
            <Title order={2}> Collectif </Title>
            <Text size="xl" style={{ marginTop: 10 }}>
              <strong>RE-label</strong> s'active lorsqu'un groupe d'utilisateurs est prêt à incarner les valeurs et les objectifs du label (créateurs-trices, designers, architectes, artisan-nes, gérant-es d'atelier, ressourceries ou stocks, et que les usagers favorisent son développement).
            </Text>
          </div>
          {/* <div>
            <Title order={2}> Manifeste </Title>
            <Text size="xl" style={{ marginTop: 10 }}>
              En adhérent à un groupe représentant RE-Label, les utilisateurs bénéficient de la méthode et des outils (générateur de label, certificat d'authenticité, cartographie, réseau, catalogue) pour construire un indicateur de confiance commun et un générateur de valeur dédié.
            </Text>
          </div> */}
        </div>
      </div>


    </Layout>
  );
}
