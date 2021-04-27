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
            partnersCount: '1',
            materials: '1',
            production: '1',
            gestion: '1',
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
          }) =>{
            console.log(values); 
            return(
            <>
              <div className={styles.form}>
                <form onSubmit={handleSubmit}>
                  <input
                    name="name"
                    placeholder="Nom de la structure"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  />
                  <input
                    name="status"
                    placeholder="Type de structure"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.status}
                  />
                  <input
                    name="partnersCount"
                    placeholder="Nombre de partenaires"
                    value={values.partnersCount}
                    onBlur={handleBlur}
                    onChange={handleChange} />
                  <input
                    name="materials"
                    placeholder="Pourcentage de materiaux"
                    value={values.materials}
                    onBlur={handleBlur}
                    onChange={handleChange} />
                  <input
                    name="production"
                    placeholder="Pourcentage de production"
                    value={values.production}
                    onBlur={handleBlur}
                    onChange={handleChange} />
                  <input
                    name="gestion"
                    placeholder="Pourcentage de gestion"
                    value={values.gestion}
                    onBlur={handleBlur}
                    onChange={handleChange} />
                  <button type="submit" disabled={isSubmitting}>
                    Submit
           </button>
                </form>
              </div>


              <Label
                title={values.name}
                status={values.status}
                date={'15.11.90'}
                size={'medium'}
                data={{
                  partners: Number(values.partnersCount),
                  production: Number(values.production),
                  gestion: Number(values.gestion),
                  materials: Number(values.materials),
                }} />
            </>
          )
          }}
        </Formik>


      </article>
    </Layout>
  );
}