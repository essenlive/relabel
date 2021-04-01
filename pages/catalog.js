const AirtablePlus = require('airtable-plus');
import Layout from '@components/Layout'
// import styles from "@styles/Catalog.module.css";

const airtable = new AirtablePlus({
    baseID: process.env.AIRTABLE_BASEID,
    apiKey: process.env.AIRTABLE_APIKEY,
    tableName: 'Structure',
});

const Catalog = ({data})=> {
  console.log(data);
  return (
    <Layout title='Catalog'>
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
    </Layout>
  );
}



// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const data = await airtable.read();
  // Pass data to the page via props
  return { props: { data } }
}

export default Catalog