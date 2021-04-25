import Layout from '@components/Layout'
// import styles from "@styles/GetLabeled.module.css";

export default function GetLabeled() {
  return(
    <Layout title="Obtenir le label">
      <article>
      <h1>
        Obtenir le label
      </h1>
      <section>
          <iframe 
          class="airtable-embed"
          src="https://airtable.com/embed/shrv2s7UcuFgYsJIb?backgroundColor=gray" frameborder="0" 
          onmousewheel="" 
          width="100%" 
          height="800" 
          >

          </iframe>
      </section>
      </article>
    </Layout>
  )
}
