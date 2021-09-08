import Layout from '@components/Layout'
import airtable_api from '@libs/airtable_api.js'
import { Title, Text} from '@mantine/core'


export default function Test({projects}) {
  console.log(projects);
  
  return (
    <Layout 
      title='Test'
      padded
    >
        <Title order={1}> Manifeste </Title>
        <Text size="xl" style={{ marginTop: 10 }}>
          </Text>
  
    </Layout>
  );
}


export async function getStaticProps() {
  let projects = await airtable_api.getProjects();
  return { props: { projects } }
}