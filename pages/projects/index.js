import AirtablePlus from 'airtable-plus';
import Layout from '@components/Layout';
import Card from '@components/Card';
import styles from "@styles/pages/Projects.module.css";


const airtable = new AirtablePlus({
    baseID: process.env.AIRTABLE_BASEID,
    apiKey: process.env.AIRTABLE_APIKEY,
    tableName: 'Structure',
});
export default function Projects({ data }) {
  return (
    <Layout title='Projets' padded>
      <article>
        <section className={styles.projectGrid}>
          {data.map((item, i) => {
                  return (
                    <div 
                      className={styles.projectItem}
                      key={i}>
                      <Card
                        image={{
                          url: item.illustrations[0].thumbnails.large.url,
                          alt:"Photo d'illustration"
                        }}
                        title={item.name}
                        subtitle={item.typology}
                        tags={item.team}
                        link={{
                            pathname: '/projects/[id]',
                          query: { id: item.name },
                          }}
                      />
                    </div>

                  )
              })}
        </section>
      </article>
    </Layout>
  );
}


export async function getStaticProps({ params }){
  const rawData = await airtable.read({
    filterByFormula: `NOT({Illustration} = '')`
  }, {
    tableName: 'Projects'
  });
  const mapping = {
    name: "Name",
    illustrations: "Illustration",
    typology: "Typology",
    team: "Team",
    duration: "Duration",
  }
  const data = Array(rawData.length)
  rawData.forEach((el, i)=>{
    data[i] = {};
    for (const key in mapping) {
      data[i][key] = typeof (el.fields[mapping[key]]) !== 'undefined' ? el.fields[mapping[key]] : null;
    }
  })
  return { props: {data} }
}