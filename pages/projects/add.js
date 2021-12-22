import Layout from '@components/Layout'
import styles from "@styles/pages/Form.module.css";
import LabelProject from '@components/LabelProject';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Inputs } from '@components/Inputs';
import Link from 'next/link'
import classNames from 'classnames';
import { useRouter } from 'next/router'
import airtable_api from '@libs/airtable_api.js'
import Tags from '@components/Tags';
import { getColors, seed } from '@libs/getColors';


export default function AddProject({ suppliersOptions, designersOptions, workshopsOptions, othersOptions, StartingColors }) {
    const router = useRouter()
    const Form = [
        {
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
        name: "others",
        schema: Yup.array().of(Yup.object()),
        type: "creatableSelect",
        initial: [],
        placeholder: "",
        prefix: "Partenaires",
        description: "Les structures partenaires qui vous ont accompagnés, institutions, incubateurs...",
        suffix: "",
        required: false,
        options: othersOptions
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
    {
        name: "colors",
        schema: Yup.array().of(Yup.string()),
        type: "button",
        initial: StartingColors,
        placeholder: "",
        prefix: "Changer les couleurs",
        suffix: "",
        required: true,
        handler: [getColors, seed]
        },
        {
            name: "material_source",
            schema: Yup.string().required('Requis'),
            type: "select",
            initial: "",
            placeholder: "",
            prefix: "Source des materiaux",
            description: "La source de votre principal materiau.",
            suffix: "",
            required: true,
            options: [
                {
                    value: "fournisseur traditionnel",
                    label: "Fournisseur Traditionnel"
                },
                {
                    value: "fournisseur responsable",
                    label: "Fournisseur Responsable"
                },
                {
                    value: "ressourcerie",
                    label: "Ressourcerie"
                },
                {
                    value: "gisement local",
                    label: "Gisement Local"
                }
            ]
        },
        {
            name: "material_quality",
            schema: Yup.string().required('Requis'),
            type: "select",
            initial: "",
            placeholder: "",
            prefix: "Qualité des materiaux",
            description: "La qualité de votre principal materiau.",
            suffix: "",
            required: true,
            options: [
                {
                    value: "n/a",
                    label: "n/a"
                },
                {
                    value: "certifie",
                    label: "Certifié"
                },
                {
                    value: "naturel",
                    label: "Naturel"
                },
                {
                    value: "traitement responsable",
                    label: "Traitement Responsable"
                }
            ]
        },
        {
            name: "material_leftovers",
            schema: Yup.string().required('Requis'),
            type: "select",
            initial: [],
            placeholder: "",
            prefix: "Gestion des chutes",
            description: "La manière dont les chutes du projet sont traitées.",
            suffix: "",
            required: true,
            options: [
                {
                    value: "don",
                    label: "Don"
                },
                {
                    value: "recyclage",
                    label: "Recyclage"
                },
                {
                    value: "chutes minimales",
                    label: "Chutes minimes"
                },
                {
                    value: "referencement",
                    label: "Référencement"
                },
                {
                    value: "aucune",
                    label: "Aucune gestion"
                }
            ]
        },
        {
            name: "material_origin",
            schema: Yup.string().required('Requis'),
            type: "select",
            initial: "",
            placeholder: "",
            prefix: "Origine des materiaux",
            description: "L'origine géographique de votre principal materiau.",
            suffix: "",
            required: true,
            options: [
                {
                    value: "sur place",
                    label: "Sur place"
                },
                {
                    value: "commune",
                    label: "Commune"
                },
                {
                    value: "pays",
                    label: "Pays"
                },
                {
                    value: "monde",
                    label: "Monde"
                }
            ]
        },
        {
            name: "design_replicability",
            schema: Yup.string().required('Requis'),
            type: "select",
            initial: "",
            placeholder: "",
            prefix: "Réplicabilité de la conception",
            description: "La capacité à réutiliser le design de votre production.",
            suffix: "",
            required: true,
            options: [
                {
                    value: "piece unique",
                    label: "Pièce Unique"
                },
                {
                    value: "produit replicable",
                    label: "Produit replicable"
                },
                {
                    value: "modele parametrique",
                    label: "Modèle paramètrique"
                }
            ]
        },
        {
            name: "design_sharable",
            schema: Yup.string().required('Requis'),
            type: "select",
            initial: "",
            placeholder: "",
            prefix: "Conception contributive",
            description: "La capacité de votre design à être contributif.",
            suffix: "",
            required: true,
            options: [
                {
                    value: "proprietaire",
                    label: "Design propriétaire"
                },
                {
                    value: "partage",
                    label: "Design partagé"
                },
                {
                    value: "modifiable",
                    label: "Design contributif"
                }
            ]
        },
        {
            name: "design_reparable",
            schema: Yup.string().required('Requis'),
            type: "select",
            initial: "",
            placeholder: "",
            prefix: "Design réparable",
            description: "La capacité de votre produit à être réparé.",
            suffix: "",
            required: true,
            options: [
                {
                    value: "personnel",
                    label: "Réparable par chacun"
                },
                {
                    value: "expert",
                    label: "Réparable par un expert"
                },
                {
                    value: "createur",
                    label: "Réparable par le créateur"
                }
            ]
        },
        {
            name: "design_durability",
            schema: Yup.array().of(Yup.string().required('Requis')),
            type: "multiSelect",
            initial: [],
            placeholder: "",
            prefix: "Durabilité du design",
            description: "La capacité du design a être durable.",
            suffix: "",
            required: true,
            options: [
                {
                    value: "demontable",
                    label: "Démontable"
                },
                {
                    value: "stockable",
                    label: "Stockable"
                },
                {
                    value: "reutilisable",
                    label: "Réutilisable"
                }
            ]
        },
        {
            name: "fab_expertise",
            schema: Yup.string().required('Requis'),
            type: "select",
            initial: "",
            placeholder: "",
            prefix: "Savoir-faire",
            description: "Les savoir-faire que le projet mets en valeur.",
            suffix: "",
            required: true,
            options: [
                {
                    value: "plusieurs",
                    label: "Plusieurs savoir-faire"
                },
                {
                    value: "peu",
                    label: "Peu de savoir-faire"
                },
                {
                    value: "aucun",
                    label: "Aucun savoir-faire"
                }
            ]
        },
        {
            name: "fab_local",
            schema: Yup.string().required('Requis'),
            type: "select",
            initial: "",
            placeholder: "",
            prefix: "Proximité de la production",
            description: "La localisation de la production par rapport à l'utilisation.",
            suffix: "",
            required: true,
            options: [
                {
                    value: "sur place",
                    label: "Sur place"
                },
                {
                    value: "commune",
                    label: "Commune"
                },
                {
                    value: "pays",
                    label: "Pays"
                },
                {
                    value: "monde",
                    label: "Monde"
                }
            ]
        },
        {
            name: "fab_tools",
            schema: Yup.string().required('Requis'),
            type: "select",
            initial: "",
            placeholder: "",
            prefix: "Spécificité des outils",
            description: "La complexité des outils nécéssaire à la production.",
            suffix: "",
            required: true,
            options: [
                {
                    value: "outils standards",
                    label: "Outils standards"
                },
                {
                    value: "machines cnc",
                    label: "Machines à commandes numériques"
                },
                {
                    value: "outillage specifique",
                    label: "Outillage spécifiques"
                }
            ]
        },
        {
            name: "fab_social",
            schema: Yup.string().required('Requis'),
            type: "select",
            initial: "",
            placeholder: "",
            prefix: "Impact de la fabrication",
            description: "Impact social de la production.",
            suffix: "",
            required: true,
            options: [
                {
                    value: "reinsertion",
                    label: "Réinsertion sociale"
                },
                {
                    value: "artisanat",
                    label: "Soutien à l'artisanat"
                },
                {
                    value: "aucun",
                    label: "Aucun"
                }
            ]
        },
    ]
    let Schema = {} ; Form.forEach((el) => { Schema[el.name] = el.schema })
    let initialValues = {};  Form.forEach((el) => { initialValues[el.name] = el.initial })

    const submit = async (fields, formik) => {
        let data = new Object;
        Object.assign(data, fields)
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
                                    <LabelProject
                                        project={{
                                            name: props.values.name,
                                            date: props.values.date,
                                            team: props.values.team.map((el)=>el.value),
                                            workshops: props.values.workshops.map((el) => el.value),
                                            designers: props.values.designers.map((el) => el.value),
                                            suppliers: props.values.suppliers.map((el) => el.value),
                                            others: props.values.others.map((el) => el.value),
                                            colors: props.values.colors,
                                            fab_expertise : props.values.fab_expertise,
                                            fab_local : props.values.fab_local,
                                            fab_social : props.values.fab_social,
                                            fab_tools : props.values.fab_tools,
                                            material_origin : props.values.material_origin,
                                            material_leftovers : props.values.material_leftovers,
                                            material_source : props.values.material_source,
                                            material_quality : props.values.material_quality,
                                            design_durability : props.values.design_durability,
                                            design_reparable : props.values.design_reparable,
                                            design_replicability : props.values.design_replicability,
                                            design_sharable : props.values.design_sharable 

                                        }}
                                    />
                                </div>
                                <div className={styles.verso}>
                                    {props.values.illustrations.length > 0 && <img className={styles.illustration} src={props.values.illustrations[0]}/>}
                                    {props.values.name && <h2 className={styles.name}>{props.values.name}</h2> }
                                    {props.values.typology &&  <Tags className={styles.tags} tags={[props.values.typology]} />}
                                    {props.values.description && <p className={styles.description}>{props.values.description}</p>}
                                    {props.values.website &&<p className={classNames("link", styles.link)}>
                                        <Link href={{ pathname: props.values.website }}> Voir le site</Link>
                                    </p>}
                                </div>
                                <div className={styles.explainer}>
                                    <h3>Comprendre ce label</h3>
                                    <p>Ce label illustre les initiatives eco-responsables du projet. En complément du certificat il permet de notifier votre démache et en donner un aperçu.</p>
                                    <p>Chacun des noeuds représente un partenaire du projet que vous avez réussi à impliquer.</p>
                                    <p>Les proportions des différentes couleurs représentent chacun de vos engagements :</p>
                                    <ul className={styles.legends}>
                                        <li><span className={styles.legend} style={{ backgroundColor: props.values.colors[1] }}></span>Représente votre engagement en terme de conception ouverte et perenne.</li>
                                        <li><span className={styles.legend} style={{ backgroundColor: props.values.colors[2] }}></span>Représente votre engagement d'un point de vue fabrication localisée, et circuits courts.</li>
                                        <li><span className={styles.legend} style={{ backgroundColor: props.values.colors[0] }}></span>Représente votre engament en terme de matériaux responsables.</li>
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
    const StartingColors = getColors(seed())
    let structures = await airtable_api.getStructures();
    let suppliersOptions = structures.filter((el) => el.typologies.indexOf("stockage") >= 0)
    suppliersOptions = suppliersOptions.map((el) => ({ value: el.id, label: el.name }))
    let designersOptions = structures.filter((el) => el.typologies.indexOf("designer") >= 0)
    designersOptions = designersOptions.map((el) => ({ value: el.id, label: el.name }))
    let workshopsOptions = structures.filter((el) => el.typologies.indexOf("atelier") >= 0)
    workshopsOptions = workshopsOptions.map((el) => ({ value: el.id, label: el.name }))
    let othersOptions = structures.filter((el) => el.typologies.indexOf("autre") >= 0)
    othersOptions = othersOptions.map((el) => ({ value: el.id, label: el.name }))

    return {
        props: { suppliersOptions, designersOptions, workshopsOptions, othersOptions, StartingColors },
    }
}