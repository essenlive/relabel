import Layout from '@components/Layout';
import airtable_api from '@libs/airtable_api.js'
import LabelCommunity from '@components/LabelCommunity';
import Card from '@components/Card';


export default function Communities({ communities }) {
  return (
    <Layout
    title='Communautées'
    padded
    grid
    >

        {communities.map((community, i) => {
          return (
            <Card
              key={i}
              title={community.name}
              tags={community.cities}
              description={community.description}
              colorMap={community.colors }
              link={{ path: `/communities/${community.id}`, text: "Voir la communauté" }}
            >
              <LabelCommunity
                community={community}
              />
            </Card>
          )
        })}
      <Card
        title={"La votre ?"}
        description={"Vous faites partie d'une communauté qui peuvre pour des pratiques plus reponsables et solidaires dans la fabrication et la production ?"}
        link={{ path: `/communities/add`, text: "Proposer une communauté" }}
      />

    </Layout>
  );
}


export async function getStaticProps() {
  let communities = await airtable_api.getCommunities({ status: true });
  
  communities = await Promise.all(communities.map(async (community) => {
    community.structures = await Promise.all(community.structures.map(async (structure) => {
      let structureEntity = await airtable_api.getStructures({ id: structure });
      return structureEntity[0]
    }))
    return community
  }))

  return {
    props: { communities },
    revalidate: 1 }
}