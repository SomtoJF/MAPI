require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");

async function connectDB() {
	console.log("connecting...");
	await mongoose.connect(process.env.DATABASE_URL);
	const db = mongoose.connection;
	db.on("error", (error) => {
		console.error(error);
	});

	db.once("open", () => {
		console.log("Connection established");
	});
}
connectDB();

app.use(express.json());

const subscriberRouter = require("./routes/subscribers");
app.use("/subscribers", subscriberRouter);

app.listen(3000, () => {
	console.log("Listening on port " + port);
});
