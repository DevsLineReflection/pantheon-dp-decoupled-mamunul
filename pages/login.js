import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
function Form({ token }) {
  const router = useRouter();
  const loginUser = (event) => {
    event.preventDefault();

    const data = {
      name: event.target.username.value,
      pass: event.target.password.value,
      token: token,
    };

    axios
      .post("/api/login", data)
      .then((result) => {
        if (result.data.status !== 400) {
          const { name, csrftoken, authToken, logToken } = result.data;
          Cookies.set("name", name);
          Cookies.set("csrf", csrftoken);
          Cookies.set("auth", authToken);
          Cookies.set("log", logToken);
        }

        if (data.name !== null) {
          router.push("/");
        }
      })
      .catch((e) => console.log(e));
  };
  return (
    <div className="container">
      <div className="mx-auto w-50 my-5">
        <div className="card">
          <div className="card-header text-center">Account Login</div>
          <div className="card-body">
            <form onSubmit={loginUser}>
              <div className="form-group">
                <label>Username/Email</label>
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  required
                />
              </div>
              <div className="from-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  required
                />
              </div>
              <div className="text-center mt-2">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  const tokendata = await fetch(
    "https://dev-news-dec.pantheonsite.io/session/token",
    {
      mode: "no-cors",
    }
  );

  const token = await tokendata.text();

  return {
    props: { token: token },
  };
};

export default function Login({ token }) {
  const router = useRouter();
  useEffect(() => {
    let user = Cookies.get("name");
    var log = false;

    if (typeof user !== "undefined") {
      if (user !== "" || user !== null) {
        log = true;
      }
    }
    if (user) {
      router.push("/");
    }
  }, []);
  const [state, setState] = useState({
    title: "",
    content: "",
  });

  return <Form token={token} />;
}
