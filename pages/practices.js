import Layout from '@components/Layout'
import airtable_api from '@libs/airtable_api.js'


export default function Pratiques({projects}) {
  console.log(projects);
  
  return (
    <Layout 
      title='Pratiques'
      padded
    >
  
    </Layout>
  );
}


export async function getStaticProps() {
  let projects = await airtable_api.getProjects();
  return {
    props: { projects },
    revalidate: 1
  }
}