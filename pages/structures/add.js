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


export default function AddStructure({ communities }) {
    const router = useRouter()
    const Form = [{
        name: "name",
        schema: Yup.string().required('Requis'),
        type: "shortText",
        initial: "",
        placeholder: "Nom",
        prefix: "Nom de la structure",
        suffix: "",
        required: true
    },
        {
            name: "communities",
            schema: Yup.array().of(Yup.string().required('Requis')),
            type: "multiSelect",
            initial: [""],
            placeholder: "",
            prefix: "Communautée.s de la structure",
            suffix: "",
            required: true,
            options: communities
        },
         {
        name: "adress",
        schema: Yup.string().required('Requis'),
        type: "adress",
        initial: "",
        placeholder: "15 rue Léon Giraud, 75019 Paris",
        prefix: "Adresse de la structure",
        suffix: "",
        required: true
    },
    {
        name: "description",
        schema: Yup.string().required('Requis'),
        type: "text",
        initial: "",
        placeholder: "Nous cherchons à ...",
        prefix: "Description",
        suffix: "",
        required: true
    },
    {
        name: "status",
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
        name: "typologies",
        schema: Yup.array().of(Yup.string().required('Requis')),
        type: "multiSelect",
        initial: [""],
        placeholder: "",
        prefix: "Activités de la structure",
        suffix: "",
        required: true,
        options: [
            {value: "designer",
            label: "Designer"},
            {value: "atelier",
            label: "Atelier"},
            {value: "stockage",
            label: "Stockage"}
        ]
    },
    {
        name: "contact",
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
    ]
    let Schema = {}
    Form.forEach((el, i) => { Schema[el.name] = el.schema })
    let initialValues = {}
    Form.forEach((el, i) => { initialValues[el.name] = el.initial })

    const submit = async (fields, formik) => {
        await fetch('/api/create/structure', { method: 'POST', body: JSON.stringify(fields), headers: { 'Content-Type': 'application/json' } })
        setTimeout(() => {
            formik.setSubmitting(false)
            router.push('/')
        }, 1000)
    }
    return (
        <Layout
            title='Référencer une structure'
            padded
        >
            <Formik
                initialValues={initialValues}
                validationSchema={Yup.object().shape(Schema)}
                onSubmit={(values, formik) => { submit(values, formik) }}>
                {(props) => {
                    return (
                        <div className={styles.form}>
                            <form className={classNames(styles.values, { [`${styles.submitted}`]: props.isSubmitting })} onSubmit={props.handleSubmit}>
                                {props.isSubmitting && <div className={styles.sending}><h3>C'est envoyé</h3>
                                </div>}
                                <h2>Présentation de la structure</h2>
                                <div>
                                    {Form.map((input, i) => (
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
                                    name={props.values.name}
                                    adress={props.values.adress}
                                    communities={props.values.communities}
                                />
                            </div>
                            <div className={styles.verso}>
                                {props.values.name &&
                                    <h2 className={styles.name}>{props.values.name}</h2>
                                }
                                {props.values.description &&
                                    <p className={styles.description}>{props.values.description}</p>
                                }
                                {props.values.website &&
                                    <Link href={{ pathname: props.values.website }}>
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
    communities = communities.map((el, i) => ({value : el.id, label : el.name }))
    return {
        props: { communities },
    }
}