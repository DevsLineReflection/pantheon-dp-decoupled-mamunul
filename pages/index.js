import Cookies from "js-cookie";
import Head from "next/head";
import Image from "next/image";
import Navabr from "../components/navbar";
import NewsList from "../components/newsList";

export default function Home({ newses }) {
  // console.log(newses);
  return (
    <div className="container">
      <NewsList newses={newses} />
    </div>
  );
}

export const getStaticProps = async () => {
  const apiurl = "https://dev-news-dec.pantheonsite.io/jsonapi/node/article";
  const res = await fetch(apiurl);

  const resdata = await res.json();

  if (!resdata) {
    return { notFound: true };
  }
  return {
    props: { newses: resdata.data },
  };
};
