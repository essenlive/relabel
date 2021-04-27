import { useState } from 'react';
import Layout from '@components/Layout'
import Label from '@components/Label';
import styles from "@styles/pages/Home.module.css";
import { Formik } from 'formik';


export default function Home({ data }) {
  const [partners, setPartners] = useState(6)
  const [production, setProduction] = useState(0.5)
  const [gestion, setGestion] = useState(0.2)
  const [materials, setMaterials] = useState(0.4)

  return (
    <Layout title='Home' padded>
      <article className={styles.home}>

        <div className={styles.form}>

        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                placeholder="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              <input
                name="numberOfPartners"
                type="number"
                value={partners}
                // onChange={handleChange}
                onBlur={handleBlur}
                onChange={e => setPartners(e.target.value)} />
              <input
                name="percentageOfMaterials"
                type="number"
                value={materials * 100}
                onBlur={handleBlur}
                onChange={e => setMaterials(e.target.value / 100)} />
              <input
                name="percentageOfProduction"
                type="number"
                value={production * 100}
                onBlur={handleBlur}
                onChange={e => setProduction(e.target.value / 100)} />
              <input
                name="percentageOfGestion"
                type="number"
                value={gestion * 100}
                onBlur={handleBlur}
                onChange={e => setGestion(e.target.value / 100)} />
              <button type="submit" disabled={isSubmitting}>
                Submit
           </button>
            </form>
          )}
        </Formik>
        </div>



        <Label
          title={'WoMa'}
          status={'Association'}
          date={'15.11.90'}
          size={'medium'}
          data={{
            partners: partners,
            production: production,
            gestion: gestion,
            materials: materials,
          }}

        />
      </article>
    </Layout>
  );
}