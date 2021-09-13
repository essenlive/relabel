import Layout from '@components/Layout'
import { Title, Image, Text, Button } from '@mantine/core'
import classNames from "classnames"
import Link from 'next/link'
import styles from "@styles/pages/Communities.module.css";
import airtable_api from '@libs/airtable_api.js'


export default function Communities({ communities }) {
  const Card = (props) => (
    <div className={styles.card}>
      <div className={styles.recto}>
        <Image
          src="/assets/label-comm-placeholder.png"
          height={200}
          alt="Photo d'illustration"
        />
        <Title order={2}> {props.title}</Title>
      </div>
      <div className={styles.verso}>
        <Title order={2}> {props.title}</Title>
        <Text size="xl">{props.description}</Text>

        <Link
          href={{
            pathname: '/communities/[id]',
            query: { id: props.id },
          }}>
          <Button variant="light" color="gray">Voir la communautée</Button>
          </Link>
      </div>
    </div>
  )

  return (
    <Layout
      title='Communautées'
      padded
    >
      <div id="communities-grid" className={styles.communities}>

        {communities.map((item, i) => {
          return (
            <Card 
              title={item.name}
              description={item.description}
              website={item.website}
              id={item.id}
            />
          )
        })}

        <div className={styles.add}>
            <Title order={2}>La votre ?</Title>
            <Text size="xl">Vous faites partie d'une communauté qui peuvre pour des pratiques plus reponsables et solidaires dans la fabrication et la production ?</Text>

              <Link href="">
                <Button variant="light" color="gray">Proposer une communauté</Button>
              </Link>
        </div>



      </div>
    </Layout>
  );
}


export async function getStaticProps() {
  let communities = await airtable_api.getCommunities({ status: true });
  return { props: { communities } }

}