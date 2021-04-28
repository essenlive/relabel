import { useState } from 'react';
import Layout from '@components/Layout'
import Label from '@components/Label';
import styles from "@styles/pages/Home.module.css";
import { Formik } from 'formik';


export default function Home() {

  return (
    <Layout title='Home' padded>
      <article className={styles.home}>
        <Formik
          initialValues={{
            name: '',
            date: '',
            status: '',
            partnersCount: 0,
            materials: 0,
            production: 0,
            gestion: 0,
          }}
        // onSubmit={(values, { setSubmitting }) => {
        //   setTimeout(() => {
        //     alert(JSON.stringify(values, null, 2));
        //     setSubmitting(false);
        //   }, 400);
        // }}
        >

          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => {
            return (
              <>
                <div className={styles.form}>
                  <form onSubmit={handleSubmit}>
                    <div className={styles.input}>
                      <span>
                        Nom : 
                      </span>
                      <input
                        name="name"
                        placeholder="Nom de la structure"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                      />
                    </div>
                    <div className={styles.input}>
                      <span>
                        Type :
                      </span>
                      <select
                        dir="rtl"
                        name="status"
                        placeholder="Type de structure"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.status}
                      >
                        <option value="SARL">SARL</option>
                        <option value="SAS">SAS</option>
                        <option value="SA">SA</option>
                        <option value="Association">Association</option>
                        <option value="SCOP">SCOP</option>
                        <option value="SCIC">SCIC</option>
                      </select>        
                    </div>
                    <div className={styles.input}>
                      <span>
                        Nombre de partenaires :
                      </span>
                      <input
                        type="number"
                        name="partnersCount"
                        placeholder="Nombre de partenaires"
                        value={values.partnersCount}
                        onBlur={handleBlur}
                        onChange={handleChange} />
                      <label>partenaire.s</label>
                    </div>
                    <div className={styles.input}>
                      <span>
                        Pourcentage de matériaux :
                      </span>
                      <input
                        type="number"
                        name="materials"
                        placeholder="Pourcentage de materiaux"
                        value={values.materials}
                        onBlur={handleBlur}
                        onChange={handleChange} />
                        <label>%</label>
                    </div>
                    <div className={styles.input}>
                      <span>
                        Pourcentage de production :
                      </span>
                      <input
                        type="number"
                        name="production"
                        placeholder="Pourcentage de production"
                        value={values.production}
                        onBlur={handleBlur}
                        onChange={handleChange} />
                      <label>%</label>
                    </div>
                    <div className={styles.input}>
                      <span>
                        Pourcentage de gestion :
                      </span>
                      <input
                        type="number"
                        name="gestion"
                        placeholder="Pourcentage de gestion"
                        value={values.gestion}
                        onBlur={handleBlur}
                        onChange={handleChange} />
                      <label>%</label>
                    </div>
                    {/* <button type="submit" disabled={isSubmitting}>
                    Submit
           </button> */}
                  </form>
                </div>


                <Label
                  title={values.name}
                  status={values.status}
                  date={'2021'}
                  size={'medium'}
                  data={{
                    partners: Number(values.partnersCount),
                    production: Number(values.production / 100),
                    gestion: Number(values.gestion / 100),
                    materials: Number(values.materials / 100),
                  }} />
              </>
            )
          }}
        </Formik>


      </article>
    </Layout>
  );
}