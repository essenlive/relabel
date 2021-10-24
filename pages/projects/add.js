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
import Tags from '@components/Tags';


export default function AddProject({ suppliersOptions, designersOptions, workshopsOptions }) {
    const router = useRouter()
    const Form = [{
        name: "name",
        schema: Yup.string().required('Requis'),
        type: "shortText",
        initial: "",
        placeholder: "Nom",
        prefix: "Nom",
        description: "Le nom de votre projet, objet, chantier...",
        suffix: "",
        required: true
    },
    {
        name: "date",
        schema: Yup.string().required('Requis'),
        type: "date",
        initial: "",
        placeholder: "",
        prefix: "Date",
        description: "Date de fabrication ou livraison.",
        suffix: "",
        required: true
    },
    {
        name: "typology",
        schema: Yup.string().required('Requis'),
        type: "select",
        initial: "",
        placeholder: "",
        prefix: "Typologie",
        description: "La typologie de votre projet.",
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
        description: "En une ou deux phrases, une présentation de votre projet.",
        suffix: "",
        required: true
    },
    {
        name: "team",
        schema: Yup.array().of(Yup.object().required('Requis')).required('Requis').nullable(),
        type: "creatableSelect",
        initial: [],
        placeholder: "",
        description: "Les noms des membres de l'équipe.",
        prefix: "Équipe",
        suffix: "",
        required: true,
        options: []
    },
    {
        name: "designers",
        schema: Yup.array().of(Yup.object()),
        type: "creatableSelect",
        initial: [],
        placeholder: "",
        prefix: "Designer.s",
        description: "Les structures qui ont porté la conception.",
        suffix: "",
        required: false,
        options: designersOptions
    },
    {
        name: "workshops",
        schema: Yup.array().of(Yup.object()),
        type: "creatableSelect",
        initial: [],
        placeholder: "",
        prefix: "Ateliers/lieux de fabrication",
        description: "Les structures qui ont porté la fabrication.",
        suffix: "",
        required: false,
        options: workshopsOptions
    },
    {
        name: "suppliers",
        schema: Yup.array().of(Yup.object()),
        type: "creatableSelect",
        initial: [],
        placeholder: "",
        prefix: "Ressourceries/fournisseurs",
        description: "Les structures qui ont fourni les matières premières.",
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
        description: "La durée, en jours, du projet.",
        suffix: "jours",
        required: true
    },
    {
        name: "gestion",
        schema: Yup.number().min(0, 'Ca doit etre au moins 0%').max(100, 'Ca ne peut pas ëtre plus de 100%').required('Required'),
        type: "number",
        initial: 0,
        placeholder: "",
        description: "Le temps passé à la gestion du projet.",
        prefix: "Gestion de projet",
        suffix: "%",
        required: true
    },
    {
        name: "production",
        schema: Yup.number().min(0, 'Ca doit etre au moins 0%').max(100, 'Ca ne peut pas ëtre plus de 100%').required('Required'),
        type: "number",
        initial: 0,
        placeholder: "",
        description: "Le temps passé à la fabrication du projet.",
        prefix: "Fabrication",
        suffix: "%",
        required: true
    },
    {
        name: "materials",
        schema: Yup.number().min(0, 'Ca doit etre au moins 0%').max(100, 'Ca ne peut pas ëtre plus de 100%').required('Required'),
        type: "number",
        initial: 0,
        placeholder: "",
        description: "Le pourcentage de matériaux sourcés.",
        prefix: "Matériaux",
        suffix: "%",
        required: true
    },
    {
        name: "contact",
        schema: Yup.string().email('Email incorrect').required('Requis'),
        type: "mail",
        initial: "",
        placeholder: "contact@mail.org",
        prefix: "Contact",
        description: "L'adresse mail d'un référent pour avoir plus d'informations.",
        suffix: "",
        required: true
    },
    {
        name: "website",
        schema: Yup.string().url("Url incorrecte, pensez à ajouter : https://"),
        type: "url",
        initial: "",
        placeholder: "siteduprojet.org",
        prefix: "Documentation",
        description: "L'url de votre site internet ou de la documentation si elle existe.",
        suffix: ""
        },
        {
            name: "illustrations",
            schema: Yup.array().of(Yup.string().url()).nullable(),
            type: "images",
            initial: [],
            placeholder: "",
            prefix: "Illustrations",
            description: "Une ou plusieurs images pour illustrer votre structure.",
            suffix: ""
        },
    ]
    let Schema = {}
    Form.forEach((el, i) => { Schema[el.name] = el.schema })
    let initialValues = {}
    Form.forEach((el, i) => { initialValues[el.name] = el.initial })

    const submit = async (fields, formik) => {
        let data = fields;
        data.gestion = fields.gestion / 100;
        data.production = fields.production / 100;
        data.materials = fields.materials / 100;
        data.team = fields.team.map((el) => el.value)
        data.illustrations = data.illustrations.map(el => ({ "url": el }))
        let newStructures = Array.from(new Set([
            ...fields.designers.filter((el) => el.__isNew__).map((el) => (el.label)),
            ...fields.workshops.filter((el) => el.__isNew__).map((el) => (el.label)),
            ...fields.suppliers.filter((el) => el.__isNew__).map((el) => (el.label))
        ])).map((el) => ({ name: el }))

        let newStructuresId = await fetch('/api/create/structures', { method: 'POST', body: JSON.stringify(newStructures), headers: { 'Content-Type': 'application/json' } })
        newStructuresId = await newStructuresId.json()
        data.designers = data.designers.map((designers) => {
            if (!designers.__isNew__) return designers.value
            let structure = newStructuresId.filter((structure) => structure.fields.name === designers.label)
            return structure[0].id
        });
        data.workshops = data.workshops.map((workshops) => {
            if (!workshops.__isNew__) return workshops.value
            let structure = newStructuresId.filter((structure) => structure.fields.name === workshops.label)
            return structure[0].id
        });
        data.suppliers = data.suppliers.map((suppliers) => {
            if (!suppliers.__isNew__) return suppliers.value
            let structure = newStructuresId.filter((structure) => structure.fields.name === suppliers.label)
            return structure[0].id
        });
        let record = await fetch('/api/create/projects', { method: 'POST', body: JSON.stringify([data]), headers: { 'Content-Type': 'application/json' } })
        record = await record.json()
        formik.setSubmitting(false);
        router.push(`/projects/${record[0].id}`);

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
                            <div className={styles.visualisation}>

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
                                            month: props.values.date ? new Date(props.values.date).getMonth() + 1 : new Date().getMonth() + 1,
                                            year: props.values.date ? new Date(props.values.date).getYear() + 1900 : new Date().getYear() + 1900

                                        }}
                                        structure={props.values.team.map((el) => el.value)}
                                    />
                                </div>
                                <div className={styles.verso}>
                                    {props.values.name &&
                                        <h2 className={styles.name}>{props.values.name}</h2>
                                    }
                                    {props.values.typology &&
                                        <Tags className={styles.tags} tags={[props.values.typology]} />
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
    suppliersOptions = suppliersOptions.map((el) => ({ value: el.id, label: el.name }))
    let designersOptions = structures.filter((el) => el.typologies.indexOf("designer") >= 0)
    designersOptions = designersOptions.map((el) => ({ value: el.id, label: el.name }))
    let workshopsOptions = structures.filter((el) => el.typologies.indexOf("atelier") >= 0)
    workshopsOptions = workshopsOptions.map((el) => ({ value: el.id, label: el.name }))

    return {
        props: { suppliersOptions, designersOptions, workshopsOptions },
    }
}