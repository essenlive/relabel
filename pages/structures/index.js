import Layout from '@components/Layout'
import styles from "@styles/pages/Structures.module.css";
import Link from 'next/link'
import ReactMap, { prepareData } from '@components/ReactMap'
import prisma, { serialize } from '@libs/prisma'

export default function Structures({ structures }) {

  return <Layout
    meta={{
      title: "Carte",
      description: "Le Re-Label vise a mettre en valeur les structures du territoire qui portent une démarche responsable et écologique.",
      image: "/assets/logo.png"
    }}
    full>
    <div className={styles.add}>
      <Link
        href={{ pathname: '/structures/add' }}>
        <p className='link-simple'>Réferencer votre structure</p>
      </Link>
    </div>

    <ReactMap
      structures={structures}
      initialViewport={{
        latitude: 48.85658,
        longitude: 2.3518,
        zoom: 5
      }}
    />
  </Layout>;
}



export async function getStaticProps() {
  let communities = await prisma.community.findMany();
  let structures = await prisma.structure.findMany();

  structures = structures.map((structure) => {
    structure.communities = structure.communities.map((communityId) => {
      let community = communities.filter((el) => el.id === communityId);
      return community[0]
    })
    structure.data = [structure.projects_designer.length, structure.projects_other.length, structure.projects_supplier.length, structure.projects_workshop.length]
    return structure
  })
  structures = prepareData(structures)
  return {
    props: { structures : serialize(structures) },
    revalidate: 1
  }
}