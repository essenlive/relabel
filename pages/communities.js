import Layout from '@components/Layout'
import { Title, Text } from '@mantine/core'
import classNames from "classnames"
import styles from "@styles/pages/Communities.module.css";
import airtable_api from '@libs/airtable_api.js'


export default function Communities({communities}) {
  const Card = (props) =>(
    <div className={styles.card}>
      <div className={styles.icon}></div>
      <Title order={2}> {props.title}</Title>
      </div>
  )

  return (
    <Layout 
      title='Pratiques'
      padded
    >
      <div id="communities-grid" className={styles.communities}>

        {communities.map((item, i) => {
          return(
            <Card title={item.name} />
          )
        })}
      </div>
    </Layout>
  );
}


export async function getStaticProps() {
  let communities = await airtable_api.getCommunities({ status: true });
  return { props: { communities } }

}