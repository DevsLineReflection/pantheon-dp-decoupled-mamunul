import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
const Navabr = () => {
  const router = useRouter();
  let user = Cookies.get("name");

  var log = false;

  if (typeof user !== "undefined") {
    if (user !== "" || user !== null) {
      log = true;
    }
  }

  function userLogout() {
    if (log) {
      Cookies.remove("name");
      Cookies.remove("auth");
      Cookies.remove("csrf");
      Cookies.remove("log");

      router.push("/login");
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link href="/">
          <a className="navbar-brand">News Hub</a>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link href="/">
                <a className="nav-link">
                  Home <span className="sr-only">(current)</span>
                </a>
              </Link>
            </li>
            {log ? (
              <>
                <li className="nav-item">
                  <Link href="/create-article">
                    <a className="nav-link">Create Article</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/logout">
                    <a className="nav-link" onClick={userLogout}>
                      Logout
                    </a>
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link href="/login">
                  <a className="nav-link">Login</a>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navabr;
