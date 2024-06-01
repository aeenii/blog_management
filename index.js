const express = require('express')
const app = express()
const dotenv = require('dotenv')
const db = require('./db')
const blogRoute = require('./routes/blogRoute')
const commentRoute = require('./routes/commentRoute')
dotenv.config()
const port = process.env.PORT || 3000
db.sequelize.sync({force: false});
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.all("/*", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    // tslint:disable-next-line: max-line-length
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept,Access-Control-Allow-Headers, Authorization"
    );
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Request-Headers", "*");
    if (req.method === "OPTIONS") {
      res.writeHead(200);
      res.end();
    } else {
      next();
    }
  })
app.listen(port,()=>{
    console.log("server run on", port)
})
app.use('/v1/api/blogs', blogRoute )
app.use('/v1/api/comment', commentRoute )
