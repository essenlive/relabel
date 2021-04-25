import AirtablePlus from 'airtable-plus';
import {useState} from 'react';
import Layout from '@components/Layout'
import styles from "@styles/Home.module.css";
import Sketch from '@components/Sketch';


export default function Home({data}) {
  const [partners, setPartners] = useState(6)
  const [production, setProduction] = useState(0.5)
  const [gestion, setGestion] = useState(0.2)
  const [materials, setMaterials] = useState(0.4)

  return (
    <Layout title='Home'>
      <article>
          <h1>
            Generator
          </h1>
      <div> 

          <label>
            Number of partners:
          <input
              name="numberOfPartners"
              type="number"
              value={partners}
              onChange={e => setPartners(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Percentage of materials:
          <input
              name="percentageOfMaterials"
              type="number"
              value={materials * 100}
              onChange={e => setMaterials(e.target.value / 100)} />
          </label>
        </div>
        <div>
          <label>
            Percentage of production:
          <input
              name="percentageOfProduction"
              type="number"
              value={production * 100}
              onChange={e => setProduction(e.target.value / 100)} />
          </label>
          </div>
          <div>
          <label>
            Percentage of gestion:
          <input
              name="percentageOfGestion"
              type="number"
              value={gestion * 100}
              onChange={e => setGestion(e.target.value / 100)} />
          </label>
        </div>

        <Sketch 
          partners={partners}
          production={production}
          gestion={gestion}
          materials={materials}
        />
      </article>
    </Layout>
  );
}