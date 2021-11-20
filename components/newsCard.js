import Link from "next/link";
const NewsCard = ({ news }) => {
  return (
    <div className="col-md-6 my-2">
      <Link href={"news/" + news.id} passHref>
        <a className="nav-link">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{news.attributes.title}</h5>
              <p className="card-text">
                <small className="text-muted">
                  Posted on: {news.attributes.created}
                </small>
              </p>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default NewsCard;
