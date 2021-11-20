import { useRouter } from "next/router";

const News = ({ news }) => {
  return (
    <div className="container">
      <h1>{news.attributes.title}</h1>
      <div>
        <span className="small-text text-muted">
          Posted on: {news.attributes.created}
        </span>
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: news.attributes.body.processed }}
      ></div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const apiurl = "https://dev-news-dec.pantheonsite.io/jsonapi/node/article";
  const res = await fetch(apiurl);

  const resdata = await res.json();
  const newsdata = resdata.data;

  const paths = newsdata.map((i) => {
    return {
      params: { id: i.id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const apiurl =
    "https://dev-news-dec.pantheonsite.io/jsonapi/node/article/" +
    context.params.id;
  const res = await fetch(apiurl);

  const resdata = await res.json();

  if (!resdata) {
    return { notFound: true };
  }
  return {
    props: { news: resdata.data },
  };
};

export default News;
