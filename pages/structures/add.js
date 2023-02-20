import { Formik } from 'formik';
import Link from 'next/link'
import classNames from 'classnames';
import { useRouter } from 'next/router'
import { useState } from 'react';
import useSWR from 'swr'
import { structureForm } from '@libs/formsData';
import Layout from '@components/Layout'
import LabelStructure from '@components/LabelStructure';
import { Inputs } from '@components/Inputs';
import Tags from '@components/Tags';
import styles from "@styles/pages/Form.module.css";
import dynamic from 'next/dynamic'
const Confetti = dynamic(() => import('react-confetti'), { ssr: false })
const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function AddStructure() {
    const router = useRouter()
    const [sending, setSending] = useState(false)
    const { data, error } = useSWR('/api/communities', fetcher)
    if (error) return <div>Failed to load</div>
    if (data) { 
        let communities = data.map((el) => ({ value: el.id, label: el.name }))
        structureForm.inputs.map((input) => {
            if (['communities'].indexOf(input.name) >= 0) input.options = communities;
            return input
        }) 
    }

    // Submit form handler
    const submit = async fields => {
        setSending(true)
        // Deep copy field object to keep it clean when submitting
        let data = new Object;
        Object.assign(data, fields)
        data.communities = fields.communities.map((el) => el.value)
        // Prepare illustrations Urls
        data.illustrations = data.illustrations.map(el => ({ "url": el }))
        // Send to airtable and redirect to newly created page
        await fetch('/api/structures', { method: 'POST', body: JSON.stringify([data]), headers: { 'Content-Type': 'application/json' } })
        await fetch('/api/build', { method: 'GET' })
        router.push(`/`);
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
                initialValues={structureForm.initialValues}
                validationSchema={structureForm.schema}
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
                                    {structureForm.inputs.map((input, i) => (
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