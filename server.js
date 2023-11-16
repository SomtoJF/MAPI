require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");

async function connectDB() {
	try {
		console.log("connecting...");
		await mongoose.connect(process.env.DATABASE_URL);
		console.log("Connection established");
	} catch (err) {
		console.error(err);
	}
}

connectDB();

app.use(express.json());

const subscriberRouter = require("./routes/subscribers");
app.use("/subscribers", subscriberRouter);

app.listen(3000, () => {
	console.log("Listening on port " + port);
});
