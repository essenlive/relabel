import Layout from '@components/Layout';
import airtable_api from '@libs/airtable_api.js'
import { LabelCommunity } from '@components/Labels';
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
              description={community.description}
              link={{ path: `/communities/${community.id}`, text: "Voir la communauté" }}
            >
              <LabelCommunity
                name={community.name}
                year={community.year}
                data={{
                  partners: '0',
                  materials: '1',
                  gestion: '0.1',
                  production: '0.9'
                }}
                colors={community.colors}
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
  return {
    props: { communities },
    revalidate: 1 }

}