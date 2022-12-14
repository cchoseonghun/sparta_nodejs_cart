const mongoose = require("mongoose");

mongoose.set('strictQuery', true);
const connect = () => {
  mongoose
    .connect("mongodb://localhost:27017/mongodb_prac")
    .catch(err => console.log(err));
};

mongoose.connection.on("error", err => {
  console.error("몽고디비 연결 에러", err);
});

module.exports = connect;