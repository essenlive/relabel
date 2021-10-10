import Layout from '@components/Layout'
import styles from "@styles/pages/Form.module.css";
import { LabelProduction } from '@components/Labels';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Inputs } from '@components/Inputs';
import Link from 'next/link'
import classNames from 'classnames';
import { useRouter } from 'next/router'
import airtable_api from '@libs/airtable_api.js'


export default function AddProject({ suppliersOptions, designersOptions, workshopsOptions }) {
    const router = useRouter()
    const Form = [{
        name: "name",
        schema: Yup.string().required('Requis'),
        type: "shortText",
        initial: "",
        placeholder: "Nom",
        prefix: "Nom du projet",
        suffix: "",
        required: true
    }, 
    {
            name: "date",
            schema: Yup.string().required('Requis'),
            type: "date",
            initial: "",
            placeholder: "",
        prefix: "Date de livraison",
            suffix: "",
            required: true
        },
    {
        name: "typology",
        schema: Yup.string().required('Requis'),
        type: "select",
        initial: [],
        placeholder: "",
        prefix: "Typologies de projet",
        suffix: "",
        required: true,
        options: [
            {
                value: "objet",
                label: "Objet"
            },
            {
                value: "espace",
                label: "Espace"
            },
            {
                value: "mobilier",
                label: "Mobilier"
            }
        ]
    },
    {
        name: "description",
        schema: Yup.string().required('Requis'),
        type: "text",
        initial: "",
        placeholder: "Ce projet ...",
        prefix: "Description",
        suffix: "",
        required: true
    },
    {
        name: "team",
        schema: Yup.array().of(Yup.string().required('Requis')).nullable(),
        type: "creatableSelect",
        initial: [],
        placeholder: "Nicolas Tesla, Victor Hugo",
        prefix: "Membres de l'équipe",
        suffix: "",
        required: true,
        options: []
        },
        {
            name: "designers",
            schema: Yup.array().of(Yup.string()),
            type: "multiSelect",
            initial: [],
            placeholder: "",
            prefix: "Structure.s designeuse.s/fabricante.s",
            suffix: "",
            required: false,
            options: designersOptions
        },
        {
            name: "workshops",
            schema: Yup.array().of(Yup.string()),
            type: "multiSelect",
            initial: [],
            placeholder: "",
            prefix: "Ateliers/lieux de fabrication",
            suffix: "",
            required: false,
            options: workshopsOptions
        },
        {
            name: "suppliers",
            schema: Yup.array().of(Yup.string()),
            type: "multiSelect",
            initial: [],
            placeholder: "",
            prefix: "Ressourceries/fournisseurs",
            suffix: "",
            required: false,
            options: suppliersOptions
        },
        {
            name: "duration",
            schema: Yup.number().min(0, 'Ca doit etre au moins 0 jours').required('Required'),
            type: "number",
            initial: 0,
            placeholder: "",
            prefix: "Durée du projet",
            suffix: "jours",
            required: true
        },
        {
            name: "gestion",
            schema: Yup.number().min(0, 'Ca doit etre au moins 0%').max(100, 'Ca ne peut pas ëtre plus de 100%').required('Required'),
            type: "number",
            initial: 0,
            placeholder: "",
            prefix: "Pourcentage de temps de gestion solidaire",
            suffix: "%",
            required: true
        },
        {
            name: "production",
            schema: Yup.number().min(0, 'Ca doit etre au moins 0%').max(100, 'Ca ne peut pas ëtre plus de 100%').required('Required'),
            type: "number",
            initial: 0,
            placeholder: "",
            prefix: "Pourcentage de fabrication responsable",
            suffix: "%",
            required: true
        },
        {
            name: "materials",
            schema: Yup.number().min(0, 'Ca doit etre au moins 0%').max(100, 'Ca ne peut pas ëtre plus de 100%').required('Required'),
            type: "number",
            initial: 0,
            placeholder: "",
            prefix: "Pourcentage de matériaux sourcés",
            suffix: "%",
            required: true
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
        placeholder: "siteduprojet.org",
        prefix: "Site internet ou documentation",
        suffix: ""
    },
    ]
    let Schema = {}
    Form.forEach((el, i) => { Schema[el.name] = el.schema })
    let initialValues = {}
    Form.forEach((el, i) => { initialValues[el.name] = el.initial })

    const submit = async (fields, formik) => {
        fields.gestion = fields.gestion / 100;
        fields.production = fields.production /100;
        fields.materials = fields.materials / 100;
        console.log(fields);
        await fetch('/api/create/project', { method: 'POST', body: JSON.stringify(fields), headers: { 'Content-Type': 'application/json' } })
        setTimeout(() => {
            formik.setSubmitting(false)
            router.push('/')
        }, 1000)
    }
    return (
        <Layout
            title='Labeliser un projet'
            padded
        >
            <Formik
                initialValues={initialValues}
                validationSchema={Yup.object().shape(Schema)}
                onSubmit={(values, formik) => { submit(values, formik) }}>
                {(props) => {
                    console.log(props.values);
                    return (
                        <div className={styles.form}>
                            <form className={classNames(styles.values, { [`${styles.submitted}`]: props.isSubmitting })} onSubmit={props.handleSubmit}>
                                {props.isSubmitting && <div className={styles.sending}><h3>C'est envoyé</h3>
                                </div>}
                                <h2>Présentation du projet</h2>
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
                                <LabelProduction 
                                    name={props.values.name}
                                    data={{
                                        partners: props.values.designers.length + props.values.workshops.length + props.values.suppliers.length,
                                        gestion: props.values.gestion / 100,
                                        production: props.values.production / 100,
                                        materials: props.values.materials / 100,
                                    }}
                                    date={{
                                        day: props.values.date ? new Date(props.values.date).getDate() : new Date().getDate(),
                                        month: props.values.date ? new Date(props.values.date).getMonth() + 1 : new Date().getMonth() + 1
                                    }}
                                    structure={props.values.team}
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
    let structures = await airtable_api.getStructures();
    let suppliersOptions = structures.filter((el) => el.typologies.indexOf("stockage") >= 0)
    suppliersOptions = suppliersOptions.map((el)=>({ value: el.id, label: el.name }))
    let designersOptions = structures.filter((el)=>el.typologies.indexOf("designer")>=0)
    designersOptions = designersOptions.map((el) => ({ value: el.id, label: el.name }))
    let workshopsOptions = structures.filter((el) => el.typologies.indexOf("atelier") >= 0)
    workshopsOptions = workshopsOptions.map((el) => ({ value: el.id, label: el.name }))

    return {
        props: { suppliersOptions, designersOptions, workshopsOptions  },
    }
}