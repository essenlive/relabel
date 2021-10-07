import Layout from '@components/Layout'
import styles from "@styles/pages/Form.module.css";
import { LabelCommunity } from '@components/Labels';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Inputs } from '@components/Inputs';
import ColorScheme from 'color-scheme'

    const getTriad = () => {
        var scheme = new ColorScheme;
        scheme.from_hue(Math.random()*350)
            .scheme('triade')
            .variation('pastel');
        return JSON.stringify(scheme.colors().filter((el,i) => (i%4 === 0)).slice(0, 3).map((el)=>`#${el}`))
    }
const CommunityForm = [{
        name : "name",
        schema: Yup.string().required('Requis'),
        type: "shortText",
        initial: "",
        placeholder: "Nom",
        prefix:"Nom de la communauté",
        suffix:"",
        required:true
    },
    { 
        name: "year",
        schema : Yup.date().default(function () { return new Date().getFullYear(); }),
        type: "number",
        initial: new Date().getFullYear(),
        placeholder: "2021",
        prefix: "Année de création",
        suffix: "",
        required: true
    },
    {
        name: "description",
        schema : Yup.string().required('Requis'),
        type: "text",
        initial: "",
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
        schema:Yup.string().url(),
        type: "url",
        initial: "",
        placeholder: "sitedelacommunauté.org",
        prefix: "Site internet",
        suffix: "",
        required: false
    },
    {
        name: "colors",
        // schema: Yup.string().required('Requis'),
        type: undefined,
        initial: getTriad(),
        placeholder: "",
        prefix: "",
        suffix: "",
        required: true
    },
]
let Schema = {}
CommunityForm.forEach((el, i) => { Schema[el.name] = el.schema })
let initialValues = {}
CommunityForm.forEach((el, i) => { initialValues[el.name] = el.initial })

export default function AddCommunities() {
    


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
                    console.log(values);
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
                                    <div>
                                        <button className={"link"} onClick={()=>{values.colors = getTriad()}}>Changer les couleurs</button>
                                    </div>
                                    <button className={"link"}>Submit</button>
                                </div>
                            </form>

                            <div className={styles.label}>

                                <LabelCommunity
                                    name={values.name}
                                    year={values.year}
                                    data={{
                                        partners: '0',
                                        materials: '1',
                                        gestion: '0.1',
                                        production: '0.9'
                                    }}
                                    colors={values.colors}
                                />
                            </div>
                            <div className={styles.explainer}>
                                <p>Les proportions représentes les differents axes.</p>
                                <p>Les proportions représentes les differents axes.</p>
                                <p>Les proportions représentes les differents axes.</p>
                            </div>
                        </div>
                    )
                }}
            </Formik>
        </Layout>
    );
}

