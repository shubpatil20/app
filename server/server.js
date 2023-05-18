require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const users = require("./models/userSchema");
const cors = require("cors");
const router = require("./routes/router");

const port = process.env.PORT || 8003;

app.use(cors());
app.use(express.json());

// // app.get("/", (req, res) => {
// //   res.json("server start");
// // });

app.use('/api/auth',router);
//let Db ="mongodb+srv://andrew:andrewdev@cluster3.bli4t.mongodb.net/test"
let Db ="mongodb+srv://admin:admin1234@cluster3.bli4t.mongodb.net/mouseproject?retryWrites=true&w=majority"

mongoose.set("strictQuery", true);
mongoose
  .connect(Db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`server is start port number ${port}`);
});
