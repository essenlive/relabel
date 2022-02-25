import { Formik } from 'formik';
import Link from 'next/link'
import classNames from 'classnames';
import * as Yup from 'yup';
import { useRouter } from 'next/router'
import { useState } from 'react';
import useSWR from 'swr'

import dynamic from 'next/dynamic'
const Confetti = dynamic(() => import('react-confetti'), { ssr: false })

import { getColors, seed } from '@libs/getColors';
const fetcher = (...args) => fetch(...args).then((res) => res.json())

import Layout from '@components/Layout'
import LabelStructure from '@components/LabelStructure';
import { Inputs } from '@components/Inputs';
import Tags from '@components/Tags';

import styles from "@styles/pages/Form.module.css";

export default function AddStructure({ formOverrides }) {
    const router = useRouter()
    const [sending, setSending] = useState(false)

    const { data, error } = useSWR('/api/get/communities', fetcher)

    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>

    let communities = data.map((el, i) => ({ value: el.id, label: el.name }))

    // Form datas
    let Form = [
        {
            name: "name",
            schema: Yup.string().required('Requis'),
            type: "shortText",
            initial: "",
            placeholder: "Nom",
            prefix: "Nom",
            description: "Le nom de votre structure.",
            suffix: "",
            required: true,
            group: "meta"
        },
        {
            name: "communities",
            schema: Yup.array().of(Yup.object().nullable()).required('Requis'),
            type: "creatableSelect",
            initial: [],
            placeholder: "",
            prefix: "Communautée.s",
            description: "Les communautées dont votre structure fait partie.",
            suffix: "",
            required: true,
            options: communities,
            group: "meta"
        },
        {
            name: "adress",
            schema: Yup.string().required('Requis'),
            type: "adress",
            initial: "",
            placeholder: "15 rue ...",
            prefix: "Adresse",
            description: "L'adresse de votre structure.",
            suffix: "",
            required: true,
            group: "meta"
        },
        {
            name: "description",
            schema: Yup.string().required('Requis'),
            type: "text",
            initial: "",
            placeholder: "Notre structure propose ...",
            prefix: "Description",
            description: "Qui êtes vous et quelles sont vos valeurs ?",
            suffix: "",
            required: true,
            group: "meta"
        },
        {
            name: "status",
            schema: Yup.string().required('Requis'),
            type: "select",
            initial: "",
            placeholder: "",
            prefix: "Statut",
            suffix: "",
            description: "Le statut juridique de votre structure.",
            required: true,
            options: [
                {
                    value: "association",
                    label: "Association"
                },
                {
                    value: "entreprise",
                    label: "Entreprise"
                },
                {
                    value: "cooperative",
                    label: "Coopérative"
                },
                {
                    value: "institution",
                    label: "Institution"
                },
                {
                    value: "indépendant",
                    label: "Indépendant"
                }
            ],
            group: "data"
        },
        {
            name: "typologies",
            schema: Yup.array().of(Yup.string().required('Requis')),
            type: "multiSelect",
            initial: [],
            placeholder: "",
            prefix: "Activités",
            description: "La ou les activités de votre structure.",
            suffix: "",
            required: true,
            options: [
                {
                    value: "designer",
                    label: "Designer"
                },
                {
                    value: "atelier",
                    label: "Atelier"
                },
                {
                    value: "stockage",
                    label: "Stockage"
                }
            ],
            group: "data"
        },
        {
            name: "contact",
            schema: Yup.string().email('Email incorrect').required('Requis'),
            type: "mail",
            initial: "",
            placeholder: "contact@mail.org",
            description: "L'adresse mail d'un référent pour avoir plus d'informations. (Ne sera pas visible sur le site.)",
            prefix: "Contact",
            suffix: "",
            required: true,
            group: "meta"
        },
        {
            name: "website",
            schema: Yup.string().url("Url incorrecte, pensez à ajouter : https://"),
            type: "url",
            initial: "",
            placeholder: "sitedelacommunauté.org",
            prefix: "Site internet",
            description: "L'url de votre site internet si vous en avez un.",
            suffix: "",
            group: "meta"
        },
        {
            name: "illustrations",
            schema: Yup.array().of(Yup.string().url()).nullable(),
            type: "images",
            initial: [],
            placeholder: "",
            prefix: "Illustrations",
            description: "Une ou plusieurs images pour illustrer votre structure.",
            suffix: "",
            group: "meta"
        },
        {
            name: "colors",
            schema: Yup.array().of(Yup.string()),
            type: "button",
            initial: getColors(seed()),
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
    let initialValues = {}; Form.forEach((el, i) => { initialValues[el.name] = el.initial })

    // Submit form handler
    const submit = async (fields, formik) => {
        setSending(true)

        // Deep copy field object to keep it clean when submitting
        let data = new Object;
        Object.assign(data, fields)

        // Filter new communities to create them in airtable beforehand, and get their airtable ids
        let newCommunities = fields.communities.filter((el) => el.__isNew__).map((el) => ({name : el.label}))
        if (newCommunities.length > 0) {  
            let newCommunitiesId = await fetch('/api/create/communities', { method: 'POST', body: JSON.stringify(newCommunities), headers: { 'Content-Type': 'application/json' } })
            newCommunitiesId = await newCommunitiesId.json()
            data.communities = data.communities.map((communities) => {
                if (!communities.__isNew__) return communities.value
                let community = newCommunitiesId.filter((community) => community.fields.name === communities.label)
                return community[0].id
            });
        }
        data.communities = fields.communities.map((el) => el.value)

        // Prepare illustrations Urls
        data.illustrations = data.illustrations.map(el => ({ "url": el }))

        // Send to airtable and redirect to newly created page
        let record = await fetch('/api/create/structures', { method: 'POST', body: JSON.stringify([data]), headers: { 'Content-Type': 'application/json' } })
        record = await record.json()
        // setTimeout(() => { formik.setSubmitting(false); console.log("timeout"); }, 1000)
        router.push(`/structures/${record[0].id}`);
    }
    return (
        <Layout
            meta={{
                title: "Référencer une structure",
                description: "Remplissez le formulaire afin de référencer votre structure au sein de l'écosystème Re-Label.",
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
                                {props.isSubmitting && <div className={styles.sending}><h3>C'est envoyé</h3>
                                </div>}
                                <h2>Référencer une structure</h2>
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
                                    <LabelStructure
                                        structure={{
                                            name : props.values.name,
                                            adress : props.values.adress,
                                            communities : props.values.communities.map((el) => ({name: el.label})),
                                            projects_designer: ["", "", ""],
                                            projects_supplier: [""],
                                            projects_workshop: ["", "", ""],
                                            projects_other: ["", ""],
                                            colors: props.values.colors
                                        }}
                                    />
                                </div>
                                <div className={styles.verso}>
                                    {props.values.illustrations.length > 0 && <img className={styles.illustration} src={props.values.illustrations[0]} />}
                                    {props.values.name && <h2 className={styles.name}>{props.values.name}</h2>}
                                    {props.values.typologies && <Tags className={styles.tags} tags={props.values.typologies} /> }
                                    {props.values.description && <p className={styles.description}>{props.values.description}</p>}
                                    {props.values.website && <p className={classNames("link", styles.link)}>
                                        <Link href={{ pathname: props.values.website }}> Voir le site</Link>
                                    </p>}
                                </div>
                                <div className={styles.explainer}>
                                    <h3>Comprendre ce label</h3>
                                    <p>Ce label représente les projets portés par votre structureà mesure que des projets dont vous êtes aprtenaires sont référencés, votre label évoluera.</p>
                                    <p>Chaque arc repésente le nombre de projets que vous avez porté, et votre rôle dans chacun d'entre eux.</p>
                                    <ul className={styles.legends}>
                                        <li><span className={styles.legend} style={{ backgroundColor: props.values.colors[0] }}></span>Représente les projets que vous avez designés.</li>
                                        <li><span className={styles.legend} style={{ backgroundColor: props.values.colors[3] }}></span>Représente les projets quiont été produits chez vous.</li>
                                        <li><span className={styles.legend} style={{ backgroundColor: props.values.colors[2] }}></span>Représente les projets dont vous avez fournis la matière première.</li>
                                        <li><span className={styles.legend} style={{ backgroundColor: props.values.colors[1] }}></span>Représente les projets que vous avez soutenus, en tant que partenaire.</li>
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