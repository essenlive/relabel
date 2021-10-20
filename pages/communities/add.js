import Layout from '@components/Layout'
import styles from "@styles/pages/Form.module.css";
import { LabelCommunity } from '@components/Labels';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Inputs } from '@components/Inputs';
import Link from 'next/link'
import classNames from 'classnames';
import {getTriad, seed} from '@libs/getTriad';
import { useRouter } from 'next/router'
import Tags from '@components/Tags';
import airtable_api from '@libs/airtable_api';

export default function AddCommunities({ StartingColors, cities }) {
    const router = useRouter()
    const Form = [{
        name: "name",
        description : "Le nom de votre communauté.",
        schema: Yup.string().required('Requis'),
        type: "shortText",
        initial: "",
        placeholder: "Ma communauté",
        prefix: "Nom",
        suffix: "",
        required: true
    },
    {
        name: "year",
        schema: Yup.date().default(function () { return new Date().getFullYear(); }),
        type: "number",
        initial: new Date().getFullYear(),
        placeholder: new Date().getFullYear(),
        prefix: "Année de création",
        description: "L'année durant laquelle vous avez monté votre communauté.",
        suffix: "",
        required: true
    },
    {
        name: "description",
        schema: Yup.string().required('Requis'),
        type: "text",
        initial: "",
        placeholder: "Nous cherchons à ...",
        prefix: "Courte description",
        description: "En une ou deux phrases, ce qui rassemble votre communauté.",
        suffix: "",
        required: true
    },
    {
        name: "cities",
        schema: Yup.array().of(Yup.object().required('Requis')).nullable(),
        type: "creatableSelect",
        initial: [],
        placeholder: "Paris, Lyon",
        prefix: "Villes dans la communauté",
        description: "La liste des villes qui composent votre communauté.",
        suffix: "",
        required: true,
        options: cities
    },
    {
        name: "contact",
        schema: Yup.string().email('Email incorrect').required('Requis'),
        type: "mail",
        initial: "",
        placeholder: "contact@mail.org",
        prefix: "Contact du référent",
        description: "Le contact d'un référent pour avoir plus d'informations.",
        suffix: "",
        required: true
    },
    {
        name: "website",
        schema: Yup.string().url("Url incorrecte, pensez à ajouter : https://"),
        type: "url",
        initial: "",
        placeholder: "https://sitedelacommunauté.org",
        description: "L'url de votre site internet si vous en avez un.",
        prefix: "Site internet",
        suffix: "",
        required: false
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
        handler: [getTriad, seed]
    },
    ]
    let Schema = {}
    Form.forEach((el, i) => { Schema[el.name] = el.schema })
    let initialValues = {}
    Form.forEach((el, i) => { initialValues[el.name] = el.initial })

    const submit = async (fields, formik) => {
        fields.cities = fields.cities.map((el) => el.value)
        await fetch('/api/create/communities', { method: 'POST', body: JSON.stringify([fields]), headers: { 'Content-Type': 'application/json' } })
        formik.setSubmitting(false)
        router.push('/')
    }
    return (
        <Layout
            title='Proposer une communauté'
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
                                {props.isSubmitting  && <div className={styles.sending}><h3>C'est envoyé</h3></div>}
                                <h2>Présentation de la communauté</h2>
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
                                    <LabelCommunity
                                        name={props.values.name}
                                        year={props.values.year}
                                        data={{
                                            partners: '5',
                                            materials: '0.7',
                                            gestion: '0.3',
                                            production: '0.9'
                                        }}
                                        colors={props.values.colors}
                                    />
                                </div>
                                <div className={styles.verso}>
                                    {props.values.name &&
                                        <h2 className={styles.name}>{props.values.name}</h2>
                                    }
                                    {props.values.cities &&
                                        <Tags className={styles.tags} tags={props.values.cities.map((el) => el.value)} />
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
                                        <li><span className={styles.legend} style={{ backgroundColor: props.values.colors[0] }}></span>Représente la proportion de gestion solidaire manifestée par vos membres.</li>
                                        <li><span className={styles.legend} style={{ backgroundColor: props.values.colors[1] }}></span>Représente la proportion de matériaux sourcés gérée et utilisée par vos membres.</li>
                                        <li><span className={styles.legend} style={{ backgroundColor: props.values.colors[2] }}></span>Représente la proportion de productions responsables générée par vos membres.</li>
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
    const StartingColors = getTriad(seed())
    let cities = await airtable_api.getCommunities();
    cities = Array.from(new Set(cities.map((el, i) => (el.cities)).flat()))
    cities = cities.map((el) => ({ value: el, label: el }))

    return {
        props: { StartingColors, cities },
    }

}