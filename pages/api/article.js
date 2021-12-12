import NextCors from "nextjs-cors";
import axios from "axios";
export default function handler(req, res) {
  NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    "Content-Type": "application/json",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  }).then(() => {
    const { title, content, auth } = req.body;

    let postData = {
      type: [{ target_id: "article" }],
      title: [{ value: title }],
      body: [{ value: content }],
    };
    let head = {
      headers: {
        Authorization: "Basic " + auth,
        "Content-Type": "application/json",
      },
    };

    axios
      .post(
        "https://dev-news-dec.pantheonsite.io/entity/node?_format=json",
        postData,
        head
      )
      .then((result) => {
        res.json(result.data);
      })
      .catch((e) => res.json(e));
  });
}
