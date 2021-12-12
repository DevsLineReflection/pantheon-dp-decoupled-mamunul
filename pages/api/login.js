import NextCors from "nextjs-cors";
import axios from "axios";
export default function handler(req, res) {
  NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    "Content-Type": "application/json",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
    .then(() => {
      const { name, pass, token } = req.body;

      let data = {
        name: name,
        pass: pass,
      };
      let head = {
        headers: {
          "X-Csrf-Token": token,
          "Content-Type": "application/json",
        },
      };
      const authToken = Buffer.from(`${name}:${pass}`).toString("base64");

      axios
        .post(
          "https://dev-news-dec.pantheonsite.io/user/login?_format=json",
          data,
          head
        )
        .then((result) => {
          const resData = {
            name: result.data.current_user.name,
            csrftoken: result.data.csrf_token,
            authToken: authToken,
            logToken: result.data.logout_token,
          };
          res.status(200).json(resData);
        })
        .catch((error) => {
          res.json({
            status: error.response.status,
            message: error.response.data.message,
          });
        });
    })
    .catch((e) => {
      res.json(e);
    });
}
