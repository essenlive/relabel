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

export default function AddCommunities({ StartingColors }) {
    const router = useRouter()
    const CommunityForm = [{
        name: "Name",
        schema: Yup.string().required('Requis'),
        type: "shortText",
        initial: "",
        placeholder: "Ma communauté",
        prefix: "Nom de la communauté",
        suffix: "",
        required: true
    },
    {
        name: "Year",
        schema: Yup.date().default(function () { return new Date().getFullYear(); }),
        type: "number",
        initial: new Date().getFullYear(),
        placeholder: new Date().getFullYear(),
        prefix: "Année de création",
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
        name: "Cities",
        schema: Yup.array().of(Yup.string().required('Requis')).nullable(),
        type: "creatableSelect",
        initial: [],
        placeholder: "Paris, Lyon",
        prefix: "Villes dans la communauté",
        suffix: "",
        required: true,
        options: []
    },
    {
        name: "Contact",
        schema: Yup.string().email('Email incorrect').required('Requis'),
        type: "mail",
        initial: "",
        placeholder: "contact@mail.org",
        prefix: "Contact du référent",
        suffix: "",
        required: true
    },
    {
        name: "Website",
        schema: Yup.string().url("Url incorrecte, pensez à ajouter : https://"),
        type: "url",
        initial: "",
        placeholder: "https://sitedelacommunauté.org",
        prefix: "Site internet",
        suffix: "",
        required: false
    },
    {
        name: "Colors",
        schema: Yup.array().of(Yup.string()),
        type: "button",
        initial: StartingColors,
        placeholder: "",
        prefix: "Changer les couleurs",
        suffix: "",
        // required: true,
        handler: [getTriad, seed]
    },
    ]

    let Schema = {}
    CommunityForm.forEach((el, i) => { Schema[el.name] = el.schema })
    let initialValues = {}
    CommunityForm.forEach((el, i) => { initialValues[el.name] = el.initial })

    const createCommunity = async (fields, formik) => {
        const options = {
            method: 'POST',
            body: JSON.stringify(fields),
            headers: { 'Content-Type': 'application/json' }
        }
        let res = await fetch('/api/create/community', options)
        res = await res.json()
        setTimeout(()=>{
            formik.setSubmitting(false)
            router.push('/')
        },1000)
    }
    return (
        <Layout
            title='Proposer une communauté'
            padded
        >
            <Formik
                initialValues={initialValues}
                validationSchema={Yup.object().shape(Schema)}
                onSubmit={(values, formik) => { createCommunity(values, formik) }}>
                {(props) => {
                    return (
                        <div className={styles.form}>
                            <form className={classNames(styles.values, { [`${styles.submitted}`]: props.isSubmitting })} onSubmit={props.handleSubmit}>
                                {props.isSubmitting  && <div className={styles.sending}><h3>C'est envoyé</h3></div>}
                                <h2>Présentation de la communauté</h2>
                                <div>
                                    {CommunityForm.map((input, i) => (
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
                                <LabelCommunity
                                    name={props.values.Name}
                                    year={props.values.Year}
                                    data={{
                                        partners: '5',
                                        materials: '0.7',
                                        gestion: '0.3',
                                        production: '0.9'
                                    }}
                                    colors={props.values.Colors}
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
                                    <li><span className={styles.legend} style={{ backgroundColor: props.values.Colors[0] }}></span>Représente la proportion de gestion solidaire manifestée par vos membres.</li>
                                    <li><span className={styles.legend} style={{ backgroundColor: props.values.Colors[1] }}></span>Représente la proportion de matériaux sourcés gérée et utilisée par vos membres.</li>
                                    <li><span className={styles.legend} style={{ backgroundColor: props.values.Colors[2] }}></span>Représente la proportion de productions responsables générée par vos membres.</li>
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
    const StartingColors = getTriad(seed())
    return {
        props: { StartingColors },
    }

}