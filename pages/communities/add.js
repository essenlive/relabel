import Link from 'next/link'
import { Formik } from 'formik';
import classNames from 'classnames';
import { useState } from 'react';
import { useRouter } from 'next/router'
import useSWR from 'swr'
import styles from "@styles/pages/Form.module.css";
import Layout from '@components/Layout'
import LabelCommunity from '@components/LabelCommunity';
import { Inputs } from '@components/Inputs';
import Tags from '@components/Tags';
import { communityForm } from '@libs/formsData';
import dynamic from 'next/dynamic'
const Confetti = dynamic(() => import('react-confetti'), { ssr: false })
const fetcher = (...args) => fetch(...args).then((res) => res.json())


export default function AddCommunities() {
    const router = useRouter()
    const [sending, setSending] = useState(false)
    const { data, error } = useSWR('/api/communities', fetcher)
    if (error) return <div>Failed to load</div>
    if (data){
        let cities = Array.from(new Set(data.map((el, i) => (el.cities)).flat()))
        cities = cities.map((el) => ({ value: el, label: el }))
        communityForm.inputs.map((input) => {
            if (['cities'].indexOf(input.name) >= 0) input.options = cities;
            return input
        })     
    }

    const submit = async (fields, formik) => {
        setSending(true)
        let data = new Object;
        Object.assign(data, fields)
        data.cities = fields.cities.map((el) => el.value)
        await fetch('/api/communities', { method: 'POST', body: JSON.stringify([data]), headers: { 'Content-Type': 'application/json' } })
        await fetch('/api/build', { method: 'GET' })
        router.push(`/`);
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
                initialValues={communityForm.initialValues}
                validationSchema={communityForm.schema}
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
                                    {communityForm.inputs.map((input, i) => (
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