import Link from 'next/link'
import Confetti from 'react-confetti'
import * as Yup from 'yup';
import { Formik } from 'formik';
import classNames from 'classnames';
import { useState } from 'react';
import { useRouter } from 'next/router'

import styles from "@styles/pages/Form.module.css";

import Layout from '@components/Layout'
import LabelCommunity from '@components/LabelCommunity';
import { Inputs } from '@components/Inputs';
import Tags from '@components/Tags';

import {getColors, seed} from '@libs/getColors';
import airtable_api from '@libs/airtable_api';

export default function AddCommunities({ formOverrides }) {
    const router = useRouter()
    const [sending, setSending] = useState(false)
    const Form = [{
        name: "name",
        description : "Le nom de votre communauté.",
        schema: Yup.string().required('Requis'),
        type: "shortText",
        initial: "",
        placeholder: "Ma communauté",
        prefix: "Nom",
        suffix: "",
        required: true,
        group: "meta"
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
        required: true,
        group: "meta"
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
        required: true,
        group: "meta"
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
        options: formOverrides.cities.options,
        group: "meta"
    },
    {
        name: "contact",
        schema: Yup.string().email('Email incorrect').required('Requis'),
        type: "mail",
        initial: "",
        placeholder: "contact@mail.org",
        prefix: "Contact du référent",
        description: "L'adresse mail d'un référent pour avoir plus d'informations. (Ne sera pas visible sur le site.)",
        suffix: "",
        required: true,
        group: "meta"
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
        required: false,
        group: "meta"
    },
    {
        name: "colors",
        schema: Yup.array().of(Yup.string()),
        type: "button",
        initial: formOverrides.colors.initial,
        placeholder: "",
        prefix: "Changer les couleurs",
        suffix: "",
        required: true,
        handler: [getColors, seed],
        group: "meta"
        },
        {
            name: "rgpd",
            schema: Yup.boolean().oneOf([true], 'Vous devez accepter la clause RGPD').required('Requis'),
            type: "checkbox",
            initial: "",
            placeholder: "",
            prefix: "Avertissement données personnelles.",
            description: "Les informations demandées sont utilisées pour le fonctionnement du site et le réferencement des projets et peuvent donner lieu à exercice du droit individuel d’accès auprès des gestionnaire dans les conditions prévues par la loi. Elles ne seront ni cédées ni diffusées en dehors des données présentes sur la plateforme.",
            suffix: "J'accepte ces conditions",
            required: true,
            group: "rgpd"
        }
    ]
    let schema = {}; Form.forEach((el, i) => { schema[el.name] = el.schema })
    let initialValues = {} ; Form.forEach((el, i) => { initialValues[el.name] = el.initial })

    const submit = async (fields, formik) => {
        const [sending, setSending] = useState(false)

        let data = new Object;
        Object.assign(data, fields)
        data.cities = fields.cities.map((el) => el.value)
        let record = await fetch('/api/create/communities', { method: 'POST', body: JSON.stringify([data]), headers: { 'Content-Type': 'application/json' } })
        record = await record.json()
        // setTimeout(() => { formik.setSubmitting(false); console.log("timeout"); }, 1000)
        router.push(`/communities/${record[0].id}`);
    }

    return (
        <Layout
            meta={{
                title: 'Proposer une communauté',
                description: "Remplissez le formulaire afin de proposer une nouvelle communauté.",
                image: "/assets/logo.png"
            }}
            padded
        >
            <Formik
                initialValues={initialValues}
                validationSchema={Yup.object().shape(schema)}
                onSubmit={(values, formik) => { submit(values, formik) }}>
                {(props) => {
                    return (
                        <div className={styles.form}>

                            <Confetti
                                style={{
                                    pointerEvents: 'none',
                                    zIndex: 20,
                                    position: "fixed",
                                    left: 0,
                                    right: 0,
                                    top: 0,
                                    bottom: 0,
                                    pointerEvents: "none",
                                    inset: 0,
                                    width: "100%",
                                    height: "100%"
                                }}
                                colors={props.values.colors}
                                numberOfPieces={sending ? 500 : 0}
                            />
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
                                        community={{
                                            "name": props.values.name,
                                            "year": props.values.year,
                                            "description": props.values.description,
                                            "cities": props.values.cities.map((el) => el.value),
                                            "website": props.values.website,
                                            "colors": props.values.colors,
                                            "contact": props.values.contact,
                                        }}
                                    />
                                </div>
                                <div className={styles.verso}>
                                    <h2 className={styles.name}>{props.values.name && props.values.name}</h2>
                                    {props.values.cities &&
                                        <Tags className={styles.tags} tags={props.values.cities.map((el) => el.value)} />
                                    }
                                    <p className={styles.description}>{props.values.description && props.values.description}</p>
                                    {props.values.website && <p className={classNames("link", styles.link)}>
                                        <Link href={{ pathname: props.values.website }}> Voir le site</Link>
                                    </p>}
                                </div>
                                <div className={styles.explainer}>
                                    <h3>Comprendre ce label</h3>
                                    <p>Ce label représente les membres de votre communauté, il est dynamique et évoluera à mesure que votre communauté grandira.</p>
                                    <p>Les noeuds représentent chacun des membres de votre communautés, et leur formes reflètes le types de membres.</p>
                                    <ul className={styles.legends}>
                                        <li><span className={styles.legend} style={{ backgroundColor: props.values.colors[0] }}></span>Représente les structures de conception de votre réseau, les designers, architectes, artisans, créateurs...</li>
                                        <li><span className={styles.legend} style={{ backgroundColor: props.values.colors[1] }}></span>Représente les ateliers de fabrication, partagés et privés, menuiserie, céramique, métal...</li>
                                        <li><span className={styles.legend} style={{ backgroundColor: props.values.colors[2] }}></span>Représente les structures apportant la matière, que ce soit des ressourcerie ou des fournisseurs traditionnels.</li>
                                        <li><span className={styles.legend} style={{ backgroundColor: props.values.colors[3] }}></span>Représente les autres structures partenaires, que ce soit des soutiens institutionnels, incubateurs...</li>
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
    let cities = await airtable_api.getCommunities();
    cities = Array.from(new Set(cities.map((el, i) => (el.cities)).flat()))
    cities = cities.map((el) => ({ value: el, label: el }))
    const formOverrides = {
        "cities": { "options": cities },
        "colors": { "initial": getColors(seed()), }
    }

    return {
        props: { formOverrides },
    }

}