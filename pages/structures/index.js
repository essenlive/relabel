import Layout from '@components/Layout'
import ReactMap from '@components/Map'
import airtable_api from '@libs/airtable_api.js'


export default function Structures({ structures }) {
  return <Layout title="Communauté">
    <ReactMap data={structures} />
  </Layout>;
}

export async function getStaticProps() {
  let structures = await airtable_api.getStructures({adress : true});

  structures = await Promise.all(structures.map(async (structure) => {
    structure.community = await Promise.all(structure.community.map(async (community) => {
      let communityName = await airtable_api.getCommunities({ id: community });
      return communityName[0].name
      }))
    return structure
  }))
  return { props: { structures } }
}