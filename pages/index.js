import {useState} from 'react';
import Layout from '@components/Layout'
import Label from '@components/Label';


export default function Home({data}) {
  const [partners, setPartners] = useState(6)
  const [production, setProduction] = useState(0.5)
  const [gestion, setGestion] = useState(0.2)
  const [materials, setMaterials] = useState(0.4)

  return (
    <Layout title='Home' padded>
      <article>
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

        <Label 
          title={'WoMa'}
          status={'Association'}
          date={'15.11.90'}
          data={{
            partners: partners ,
            production: production ,
            gestion: gestion ,
            materials: materials ,
          }}
          
        />
      </article>
    </Layout>
  );
}