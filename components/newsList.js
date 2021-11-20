import Link from "next/link";
import NewsCard from "./newsCard";
const NewsList = ({ newses }) => {
  return (
    <div className="container">
      <div className="row">
        {newses.map((news) => (
          <NewsCard key={news.id} news={news} />
        ))}
      </div>
    </div>
  );
};

export default NewsList;
