import AirtablePlus from 'airtable-plus';
import Layout from '@components/Layout'
// import styles from "@styles/Catalog.module.css";


const airtable = new AirtablePlus({
    baseID: process.env.AIRTABLE_BASEID,
    apiKey: process.env.AIRTABLE_APIKEY,
    tableName: 'Structure',
});
export default function Catalog({data}) {
  return (
    <Layout title='Catalog'>
      <article>
        <h1>
          Catalogue
        </h1>
        <section>
          {data.map((item, i) => {
                  return (
                      <div key={item.id}>
                        <h2>
                          {item.fields.StrucID}
                        </h2>
                        <div>
                          Gestion : {item.fields.StrucGESTION}
                        </div>
                        <div>
                          Production : {item.fields.StrucPRODUCTION}
                        </div>
                        <div>
                          Partenaires : {item.fields.StrucPARTENAIRES}
                        </div>
                        <div>
                          Matériaux : {item.fields.StrucMATERIAUX}
                        </div>
                      </div>
                  )
              })}
        </section>
      </article>
    </Layout>
  );
}

export async function getServerSideProps() {
  const data = await airtable.read();
  return { props: { data } }
}