import Layout from '@components/Layout'
import airtable_api from '@libs/airtable_api.js'
import styles from "@styles/pages/Structures.module.css";
import Link from 'next/link'
import ReactMap, { prepareData } from '@components/ReactMap'
export default function Structures({ structures }) {

  return <Layout title="Carte" full>
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
  let structures = await airtable_api.getStructures({adress : true});

  structures = await Promise.all(structures.map(async (structure) => {
    structure.communities = await Promise.all(structure.communities.map(async (community) => {
      let communityEntity = await airtable_api.getCommunities({ id: community });
      return communityEntity[0]
      }))
      structure.data = [structure.projects_designer.length, structure.projects_other.length, structure.projects_supplier.length, structure.projects_workshop.length]
    return structure
  }))



  return {
    props: {
      structures: prepareData(structures)
    },
    revalidate: 1 }
}