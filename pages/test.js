import Layout from '@components/Layout'
import { LabelProduction } from '@components/Labels';


export default function Test() {

    return (
        <Layout
            title='test'
            padded
            
        >
            <section style={{width:"50%"}}>

           <LabelProduction
                data={{
                    partners: '0',
                    materials: '1',
                    gestion: '0.1',
                    production: '0.9'
                }}
                name={"Parasites"}
                date={{ day: 24, month: 4 }}
                structure={['Thibaut Louvet', 'Ars Longa']}
                colors={'["#7bba7e","#4e675e","#2a5a7d","#afafaf"]'}
                bordered={true}
                />
                </section>



        </Layout>
    );
}