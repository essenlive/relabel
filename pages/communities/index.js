import Layout from '@components/Layout';
import Link from 'next/link'
import styles from "@styles/pages/Communities.module.css";
import airtable_api from '@libs/airtable_api.js'


export default function Communities({ communities }) {
  const Card = (props) => (
    <div className={styles.card}>
      <div className={styles.recto}>
        <img
          src="/assets/label-comm-placeholder.png"
          height={200}
          alt="Photo d'illustration"
        />
        <h2> {props.title}</h2>
        <h4> {props.year}</h4>
      </div>
      <div className={styles.verso}>
        <h2> {props.title}</h2>
        <p>{props.description}</p>
        <Link
          href={{
            pathname: '/communities/[id]',
            query: { id: props.id },
          }}>
          <p className='link'>Voir la communautée</p>
          </Link>
      </div>
    </div>
  )

  return (
    <Layout
      title='Communautées'
      padded
    >
      <div className={"grid"}>

        {communities.map((item, i) => {
          return (
            <Card 
              title={item.name}
              description={item.description}
              website={item.website}
              year={item.year}
              id={item.id}
            />
          )
        })}

        <div className={styles.add}>
            <h2>La votre ?</h2>
            <p>Vous faites partie d'une communauté qui peuvre pour des pratiques plus reponsables et solidaires dans la fabrication et la production ?</p>

            <Link
              href={{
                pathname: '/communities/add',
              }}>
              <p className='link'>Proposer une communauté</p>
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