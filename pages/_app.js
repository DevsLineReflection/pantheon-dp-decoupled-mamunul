import Layout from "../components/layout";
import "../styles/globals.css";
import Head from "next/head";
import axios from "axios";

function MyApp({ Component, pageProps }) {
  axios.defaults.headers = { "Access-Control-Allow-Origin": "*" };
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
        ></link>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
