import {useState} from 'react';
import Layout from '@components/Layout'
import Label from '@components/Label';
import { Formik } from 'formik';


export default function Home({data}) {
  const [partners, setPartners] = useState(6)
  const [production, setProduction] = useState(0.5)
  const [gestion, setGestion] = useState(0.2)
  const [materials, setMaterials] = useState(0.4)

  return (
    <Layout title='Home' padded>
      <article>


        <Formik
          initialValues={{ email: '', password: '' }}
          validate={values => {
            const errors = {};
            if (!values.email) {
              errors.email = 'Required';
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address';
            }
            return errors;
          }}
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
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email && errors.email}
              <input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {errors.password && touched.password && errors.password}
              <button type="submit" disabled={isSubmitting}>
                Submit
           </button>
            </form>
          )}
        </Formik>

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
          size={'medium'}
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