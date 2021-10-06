import Layout from '@components/Layout'
import styles from "@styles/pages/Form.module.css";
import { LabelStructure } from '@components/Labels';
import { Formik } from 'formik';
import * as Yup from 'yup';
import classNames from 'classnames';

const Schema = Yup.object().shape({
    name: Yup.string().required('Requis'),
    date: Yup.date().default(function () { return new Date(); }),
    email: Yup.string().email('Email incorrect').required('Requis'),
    status: Yup.string().required('Requis'),
    type: Yup.string().required('Requis'),
    partnersCount: Yup.number().required().positive().required('Requis'),
    materials: Yup.number().min(0, 'Ca doit etre au minimum 0').max(100, 'Ca ne peut pas être plus de 1000').required('Requis'),
    production: Yup.number().min(0, 'Ca doit etre au minimum 0').max(100, 'Ca ne peut pas être plus de 1000').required('Requis'),
    gestion: Yup.number().min(0, 'Ca doit etre au minimum 0').max(100, 'Ca ne peut pas être plus de 1000').required('Requis'),
});


export default function AddProjects() {


    return (
        <Layout
            title='Labeliser un projet'
            padded
        >
            <Formik
                initialValues={{
                    name: '',
                    adress: '',
                    date: '',
                    status: 'Association',
                    type: 'Designer.s',
                    partnersCount: 0,
                    materials: 0,
                    production: 0,
                    gestion: 0,
                }}
                validationSchema={Schema}
                onSubmit={values => {
                    // same shape as initial values
                    console.log(values);
                }}
            // onSubmit={(values, { setSubmitting }) => {
            //   setTimeout(() => {
            //     alert(JSON.stringify(value, 2));
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
                    errors,
                    touched
                }) => {
                    return (
                        <div className={styles.form}>
                            <form className={styles.values} onSubmit={handleSubmit}>
                                <h2>Présentation de la structure</h2>
                                <div>
                                    <div className={classNames(styles.field, 'field')}>
                                        {errors.name && (
                                            <div className={'field__error'}>{errors.name}</div>
                                        )}
                                        <span className={'field__prefix'}>
                                            Nom :
                                        </span>
                                        <input
                                            className={'field__input'}
                                            name="name"
                                            placeholder="Nom de la structure"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.name}
                                        />
                                    </div>
                                    <div className={classNames(styles.field, 'field')}>
                                        {errors.adress && (
                                            <div className={'field__error'}>{errors.adress}</div>
                                        )}
                                        <span className={'field__prefix'}>
                                            Addresse :
                                        </span>
                                        <input
                                            className={'field__input'}
                                            name="adress"
                                            placeholder="Adresse de la structure"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.adress}
                                        />
                                    </div>
                                    <div className={classNames(styles.field, 'field')}>
                                        {errors.status && (
                                            <div className={'field__error'}>{errors.status}</div>
                                        )}
                                        <span className={'field__prefix'}>
                                            Statut :
                                        </span>
                                        <select
                                            className={'field__input'}
                                            dir="rtl"
                                            name="status"
                                            placeholder="Statut de la structure"
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
                                    <div className={classNames(styles.field, 'field')}>
                                        {errors.type && (
                                            <div className={'field__error'}>{errors.type}</div>
                                        )}
                                        <span className={'field__prefix'}>
                                            Type :
                                        </span>
                                        <select
                                            className={'field__input'}
                                            dir="rtl"
                                            name="type"
                                            placeholder="Type de structure"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.type}
                                        >
                                            <option value="Designer">Designer.s</option>
                                            <option value="Atelier">Atelier</option>
                                            <option value="Resourcerie">Resourcerie</option>
                                            <option value="Autre">Autre</option>
                                        </select>
                                    </div>
                                    <div className={classNames(styles.field, 'field')}>
                                        {errors.partnersCount && (
                                            <div className={'field__error'}>{errors.partnersCount}</div>
                                        )}
                                        <span className={'field__prefix'}>
                                            Nombre de partenaires :
                                        </span>
                                        <input
                                            className={'field__input'}
                                            type="number"
                                            name="partnersCount"
                                            placeholder="Nombre de partenaires"
                                            value={values.partnersCount}
                                            onBlur={handleBlur}
                                            onChange={handleChange} />
                                        <label className={'field__suffix'}>partenaire.s</label>
                                    </div>
                                    <div className={classNames(styles.field, 'field')}>
                                        {errors.materials && (
                                            <div className={'field__error'}>{errors.materials}</div>
                                        )}
                                        <span className={'field__prefix'}>
                                            Pourcentage de matériaux :
                                        </span>
                                        <input
                                            className={'field__input'}
                                            type="number"
                                            name="materials"
                                            placeholder="Pourcentage de materiaux"
                                            value={values.materials}
                                            onBlur={handleBlur}
                                            onChange={handleChange} />
                                        <label className={'field__suffix'}>%</label>
                                    </div>
                                    <div className={classNames(styles.field, 'field')}>
                                        {errors.production && (
                                            <div className={'field__error'}>{errors.production}</div>
                                        )}
                                        <span className={'field__prefix'}>
                                            Pourcentage de production :
                                        </span>
                                        <input
                                            className={'field__input'}
                                            type="number"
                                            name="production"
                                            placeholder="Pourcentage de production"
                                            value={values.production}
                                            onBlur={handleBlur}
                                            onChange={handleChange} />
                                        <label className={'field__suffix'}>%</label>
                                    </div>
                                    <div className={classNames(styles.field, 'field')}>
                                        {errors.gestion && (
                                            <div className={'field__error'}>{errors.gestion}</div>
                                        )}
                                        <span className={'field__prefix'}>
                                            Pourcentage de gestion :
                                        </span>
                                        <input
                                            className={'field__input'}
                                            type="number"
                                            name="gestion"
                                            placeholder="Pourcentage de gestion"
                                            value={values.gestion}
                                            onBlur={handleBlur}
                                            onChange={handleChange} />
                                        <label className={'field__suffix'}>%</label>
                                    </div>
                                    <button className={"link"}>Submit</button>
                                </div>
                            </form>

                            <div className={styles.label}>
                                <LabelStructure
                                    name={values.name}
                                    adress={values.adress}
                                    communities={['2021']}
                                    data={{
                                        partners: Number(values.partnersCount),
                                        production: Number(values.production / 100),
                                        gestion: Number(values.gestion / 100),
                                        materials: Number(values.materials / 100),
                                    }} />
                            </div>
                            <div className={styles.explainer}>
                                <p>Les proportions représentes les differents axes.</p>
                                <p>Les proportions représentes les differents axes.</p>
                                <p>Les proportions représentes les differents axes.</p>
                            </div>
                        </div>
                    )
                }}
            </Formik>
        </Layout>
    );
}

