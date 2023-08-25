const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(require("./routes/all-routes"));
mongoose
  .connect(
    "mongodb+srv://dred1:redwan123@cluster0.u9y0hra.mongodb.net/bank?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(4000, () => {
      console.log("bank started @4000");
    });
  })
  .catch((e) => {
    console.log(e);
  });
