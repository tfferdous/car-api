const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

//internal  imports
const carsRouter = require("./router/car");
const { default: mongoose } = require("mongoose");

//init app
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

//connection with mongodb
mongoose
	.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("connected");
	})
	.catch((error) => {
		console.log(error);
	});

//cars router
app.use("/api/cars", carsRouter);

//listenging  app
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
	console.log(`server is running on port ${PORT}`);
});
