import Layout from '@components/Layout'
import styles from "@styles/pages/Form.module.css";
import { LabelCommunity } from '@components/Labels';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Inputs } from '@components/Inputs';
import ColorScheme from 'color-scheme'
import Link from 'next/link'
import classNames from 'classnames';

const getTriad = (seed) => {
    const scheme = new ColorScheme;
    scheme.from_hue(seed)
        .scheme('triade')
        .variation('pastel');    return scheme.colors().filter((el, i) => (i % 4 === 0)).slice(0, 3).map((el) => `#${el}`)
}

const seed = () => Math.round(Math.random() * 35) * 10;

export default function AddCommunities({StartingColors}) {

    const CommunityForm = [{
        name: "name",
        schema: Yup.string().required('Requis'),
        type: "shortText",
        initial: "Ma communauté",
        placeholder: "Ma communauté",
        prefix: "Nom de la communauté",
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
        suffix: "",
        required: true
    },
    {
        name: "description",
        schema: Yup.string().required('Requis'),
        type: "text",
        initial: "Nous cherchons à ...",
        placeholder: "Nous cherchons à ...",
        prefix: "Description",
        suffix: "",
        required: true
    },
    {
        name: "cities",
        schema: Yup.string().required('Requis'),
        // schema: Yup.array().of(Yup.string().required('Requis')).nullable(),
        type: "shortText",
        initial: "",
        placeholder: "Paris, Lyon",
        prefix: "Villes dans la communauté",
        suffix: "",
        required: true
    },
    {
        name: "contact",
        schema: Yup.string().email('Email incorrect').required('Requis'),
        type: "mail",
        initial: "",
        placeholder: "contact@mail.org",
        prefix: "Contact du référent",
        suffix: "",
        required: true
    },
    {
        name: "website",
        schema: Yup.string().url("Url incorrecte, pensez à ajouter : https://"),
        type: "url",
        initial: "",
        placeholder: "https://sitedelacommunauté.org",
        prefix: "Site internet",
        suffix: "",
        required: false
    },
    {
        name: "colors",
        schema: Yup.string().required('Requis'),
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


    return (
        <Layout
            title='Labeliser un projet'
            padded
        >
            <Formik
                initialValues={initialValues}
                validationSchema={Yup.object().shape(Schema)}
                onSubmit={values => { console.log(values);}}
            >

                {({
                    values,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    errors
                }) => {
                    return (
                        <div className={styles.form}>
                            <form className={styles.values} onSubmit={handleSubmit}>
                                <h2>Présentation de la communauté</h2>
                                <div>
                                    {CommunityForm.map((input,i)=>(
                                        <Inputs
                                            key={i}
                                            input={input}
                                            name={input.name}
                                        />
                                    ))}
                                </div>

                                <button type={"submit"} className={classNames(styles.submit)}>Envoyer</button>
                            </form>

                            <div className={styles.label}>
                                <LabelCommunity
                                    name={values.name}
                                    year={values.year}
                                    data={{
                                        partners: '5',
                                        materials: '0.7',
                                        gestion: '0.3',
                                        production: '0.9'
                                    }}
                                    colors={values.colors}
                                />
                            </div>
                            <div className={styles.verso}>
                                {values.image && values.image.src &&
                                    <img
                                        className={styles.image}
                                    src={values.image.src}
                                    alt={values.image.alt}
                                    />
                                }
                                {values.name &&
                                    <h2 className={styles.name}>{values.name}</h2>
                                }
                                {values.description &&
                                    <p className={styles.description}>{values.description}</p>
                                }
                                {values.website &&
                                    <Link href={{ pathname: values.website }}>
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
                                    <li><span className={styles.legend} style={{ backgroundColor: values.colors[0]}}></span>Représente la proportion de gestion solidaire manifestée par vos membres.</li>
                                    <li><span className={styles.legend} style={{ backgroundColor: values.colors[1] }}></span>Représente la proportion de matériaux sourcés gérée et utilisée par vos membres.</li>
                                    <li><span className={styles.legend} style={{ backgroundColor: values.colors[2] }}></span>Représente la proportion de productions responsables générée par vos membres.</li>
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
        props: { StartingColors},
    }

}