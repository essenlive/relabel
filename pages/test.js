import Layout from '@components/Layout'
import styles from "@styles/pages/Form.module.css";
import { LabelStructure } from '@components/Labels';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Inputs } from '@components/Inputs';
import Link from 'next/link'
import classNames from 'classnames';
import { useRouter } from 'next/router'
import airtable_api from '@libs/airtable_api.js'


export default function AddCommunities({ communities }) {
    const router = useRouter()
    const StructureForm = [{
        name: "Name",
        schema: Yup.string().required('Requis'),
        type: "shortText",
        initial: "",
        placeholder: "Nom",
        prefix: "Nom de la structure",
        suffix: "",
        required: true
    }, {
        name: "Adress",
        schema: Yup.string().required('Requis'),
        type: "shortText",
        initial: "",
        placeholder: "15 rue Léon Giraud, 75019 Paris",
        prefix: "Adresse de la structure",
        suffix: "",
        required: true
    },
    {
        name: "Description",
        schema: Yup.string().required('Requis'),
        type: "text",
        initial: "",
        placeholder: "Nous cherchons à ...",
        prefix: "Description",
        suffix: "",
        required: true
    },
    {
        name: "Status",
        schema: Yup.string().required('Requis'),
        type: "select",
        initial: "",
        placeholder: "",
        prefix: "Status de la structure",
        suffix: "",
        required: true,
        options: [
            {value: "association",
            label : "Association"},
            {value: "entreprise",
            label : "Entreprise"},
            {value: "cooperative",
            label : "Coopérative"},
            {value: "institution",
            label : "Institution"},
            {value: "indépendant",
                label: "Indépendant"}
        ]
    },
    {
        name: "type",
        schema: Yup.array().of(Yup.string().required('Requis')),
        type: "multiSelect",
        initial: [""],
        placeholder: "",
        prefix: "Activités de la structure",
        suffix: "",
        required: true,
        options: [
            {value: "designer",
            label: "Designer.s"},
            {value: "atelier",
            label: "Atelier"},
            {value: "stockage",
            label: "Stockage"}
        ]
    },
    {
        name: "email",
        schema: Yup.string().email('Email incorrect').required('Requis'),
        type: "mail",
        initial: "",
        placeholder: "contact@mail.org",
        prefix: "Adresse mail du référent",
        suffix: "",
        required: true
    },
    {
        name: "website",
        schema: Yup.string().url("Url incorrecte, pensez à ajouter : https://"),
        type: "url",
        initial: "",
        placeholder: "sitedelacommunauté.org",
        prefix: "Site internet",
        suffix: ""
    },
    {
        name: "Communities",
        schema: Yup.array().of(Yup.string().required('Requis')),
        type: "multiSelect",
        initial: [""],
        placeholder: "",
        prefix: "Communautée.s de la structure",
        suffix: "",
        required: true,
        options: communities
    },
    ]
    let Schema = {}
    StructureForm.forEach((el, i) => { Schema[el.name] = el.schema })
    let initialValues = {}
    StructureForm.forEach((el, i) => { initialValues[el.name] = el.initial })

    const createStructure = async (fields, formik) => {
        const options = {
            method: 'POST',
            body: JSON.stringify(fields),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        console.log(fields);
        // let res = await fetch('/api/create', options)
        // res = await res.json()
        // setTimeout(() => {
        //     formik.setSubmitting(0)
        //     router.push('/')
        // }, 1000)
    }
    return (
        <Layout
            title='R2f2rencer une structure'
            padded
        >
            <Formik
                initialValues={initialValues}
                validationSchema={Yup.object().shape(Schema)}
                onSubmit={(values, formik) => { createStructure(values, formik) }}>
                {(props) => {
                    return (
                        <div className={styles.form}>
                            <form className={classNames(styles.values, { [`${styles.submitted}`]: props.isSubmitting })} onSubmit={props.handleSubmit}>
                                {props.isSubmitting && <div className={styles.sending}><h3>C'est envoyé</h3>
                                </div>}
                                <h2>Présentation de la structure</h2>
                                <div>
                                    {StructureForm.map((input, i) => (
                                        <Inputs
                                            key={i}
                                            input={input}
                                            name={input.name}
                                        />
                                    ))}
                                </div>
                                <button
                                    type={"submit"}
                                    className={classNames(styles.submit)}
                                    onSubmit={props.handleSubmit}
                                >{props.isValidating ? "Vérification du formulaire" : "Envoyer"}</button>
                            </form>

                            <div className={styles.label}>
                                <LabelStructure
                                    name={props.values.Name}
                                    adress={props.values.Adress}
                                    communities={props.values.Communities}
                                />
                            </div>
                            <div className={styles.verso}>
                                {props.values.Name &&
                                    <h2 className={styles.name}>{props.values.Name}</h2>
                                }
                                {props.values.Description &&
                                    <p className={styles.description}>{props.values.Description}</p>
                                }
                                {props.values.Website &&
                                    <Link href={{ pathname: props.values.Website }}>
                                        <p className={classNames("link", styles.link)}>Voir le site</p>
                                    </Link>
                                }
                            </div>
                            <div className={styles.explainer}>
                                <h3>Comprendre ce label</h3>
                                <p>Ce label représente les membres de votre communauté, il est dynamique et évoluera à mesure que votre communauté grandira.</p>
                                <p>Les noeuds représentent chacun des membres de votre communautés, et leur formes reflètes le types de membres.</p>
                                <p>Les proportions des différentes couleurs représentent, les engagements des membres de votre communautés.</p>
                                <ul className={styles.legends}>
                                    {/* <li><span className={styles.legend} style={{ backgroundColor: props.values.Colors[0] }}></span>Représente la proportion de gestion solidaire manifestée par vos membres.</li>
                                    <li><span className={styles.legend} style={{ backgroundColor: props.values.Colors[1] }}></span>Représente la proportion de matériaux sourcés gérée et utilisée par vos membres.</li>
                                    <li><span className={styles.legend} style={{ backgroundColor: props.values.Colors[2] }}></span>Représente la proportion de productions responsables générée par vos membres.</li> */}
                                </ul>
                            </div>
                        </div>
                    )
                }}
            </Formik>
        </Layout>
    );
}


export async function getStaticProps() {
    let communities = await airtable_api.getCommunities({ status: true });
    communities = communities.map((el, i) => {
        return {
            value : el.id,
            label : el.name
        }
    })
    return {
        props: { communities },
    }

}