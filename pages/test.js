import Layout from '@components/Layout'
import styles from "@styles/pages/Form.module.css";
import { LabelStructure } from '@components/Labels';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Inputs } from '@components/Inputs';

const StructureForm = [{
    name: "name",
    schema: Yup.string().required('Requis'),
    type: "shortText",
    initial: "",
    placeholder: "Nom",
    prefix: "Nom de la structure",
    suffix: "",
    required: true
}, {
    name: "adress",
    schema: Yup.string().required('Requis'),
    type: "shortText",
    initial: "",
    placeholder: "15 rue Léon Giraud, 75019 Paris",
    prefix: "Adresse de la structure",
    suffix: "",
    required: true
},
{
    name: "description",
    schema: Yup.string().required('Requis'),
    type: "text",
    initial: "",
    placeholder: "Nous cherchons à ...",
    prefix: "Description",
    suffix: "",
    required: true
},
{
    name: "status",
    schema: Yup.string().required('Requis'),
    type: "singleSelect",
    initial: "",
    placeholder: "Design, Stock",
    prefix: "Status de la structure",
    suffix: "",
    required: true,
    options: {
        association: "Association",
        entreprise: "Entreprise",
        cooperative: "Coopérative",
        institution: "Institution",
        autre: "Autre",
    }
},
{
    name: "type",
    schema: Yup.array().of(Yup.string().required('Requis')),
    type: "multiSelect",
    initial: [""],
    placeholder: "Design, Stock",
    prefix: "Activités de la structure",
    suffix: "",
    required: true,
    options: {
        designer: "Designer.s",
        atelier: "Atelier",
        resourcerie: "Resourcerie",
        autre: "Autre",
    }
},
{
    name: "email",
    schema: Yup.string().email('Email incorrect').required('Requis'),
    type: "mail",
    initial: "",
    placeholder: "contact@mail.org",
    prefix: "Adresse mail du référent",
    suffix: "" ,
    required: true
},
{
    name: "website",
    schema: Yup.string().url(),
    type: "url",
    initial: "",
    placeholder: "sitedelacommunauté.org",
    prefix: "Site internet",
    suffix: ""
    },
    {
        name: "partners",
        schema: Yup.number().required().positive().required('Requis'),
        type: "number",
        initial: 0,
        placeholder: "",
        prefix: "Nombre de partenaires",
        suffix: "partenaires"
    },
    {
        name: "materials",
        schema: Yup.number().min(0, 'Ca doit etre au minimum 0').max(100, 'Ca ne peut pas être plus de 100').required('Requis'),
        type: "number",
        initial: 0,
        placeholder: "",
        prefix: "Pourcentage de materiaux responsables",
        suffix: "%"
    },
    {
        name: "gestion",
        schema: Yup.number().min(0, 'Ca doit etre au minimum 0').max(100, 'Ca ne peut pas être plus de 100').required('Requis'),
        type: "number",
        initial: 0,
        placeholder: "",
        prefix: "Pourcentage de gestion solidaire",
        suffix: "%"
    },
    {
        name: "production",
        schema: Yup.number().min(0, 'Ca doit etre au minimum 0').max(100, 'Ca ne peut pas être plus de 100').required('Requis'),
        type: "number",
        initial: 0,
        placeholder: "",
        prefix: "Pourcentage de production responsable",
        suffix: "%"
    }
]
let Schema = {}
StructureForm.forEach((el, i) => { Schema[el.name] = el.schema })
let initialValues = {}
StructureForm.forEach((el, i) => { initialValues[el.name] = el.initial })

export default function AddStructure() {


    return (
        <Layout
            title='Labeliser une structure'
            padded>
            <Formik
                initialValues={initialValues}
                validationSchema={Yup.object().shape(Schema)}
                onSubmit={values => { console.log(values); }} >
                {({ values, handleSubmit, }) => {
                    console.log(values);

                    return (
                        <div className={styles.form}>
                            <form className={styles.values} onSubmit={handleSubmit}>
                                <h2>Présentation de la structure</h2>
                                <div>
                                    {StructureForm.map((input, i) => (
                                        <Inputs
                                            key={i}
                                            input={input}
                                            name={input.name}
                                        />
                                    ))}
                                    <button className={"link"}>Submit</button>
                                </div>
                            </form>

                            <div className={styles.label}>
                                <LabelStructure
                                    name={values.name}
                                    adress={values.adress}
                                    communities={['2021']}
                                    data={{
                                        partners: Number(values.partnersCount),
                                        production: Number(values.production / 100),
                                        gestion: Number(values.gestion / 100),
                                        materials: Number(values.materials / 100),
                                    }} />
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

