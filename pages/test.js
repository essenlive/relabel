import Layout from '@components/Layout'
import { LabelCommunity, LabelProduction, LabelStructure } from '@components/Labels';
import Card from '@components/Card';


export default function Test() {

    return (
        <Layout
            title='test'
            padded
            
        >
            <section style={{width:"20%", marginTop:"2rem"}}>
            <Card
                    image={{
                        src:"https://dl.airtable.com/.attachments/9b9e782d4ed73728b98a58700dd7938b/d33ad56f/AdaptedCurvers_03.jpg",
                        alt:"Photo d'illustration"
                        }}
            title="title"
            description="Communauté qui cherche à rendre la ville plus durable, circulaire, résiliente grâce au réemploi, à la fabrication numérique et à la relocalisation en centre-ville de la production."
            link={{path:"/", text:"voir la source"}}
            >
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
                />
            </Card>
                </section>

           


        </Layout>
    );
}