const express = require("express");
const router = express.Router();
const Subscriber = require("../models/subscribers");

router
	.route("/")
	.get(async (req, res) => {
		try {
			const subscribers = await Subscriber.find();
			res.json(subscribers);
		} catch (err) {
			res.status(500).json({ message: err.message });
		}
	})
	.post(async (req, res) => {
		const requestBody = req.body;
		const subscriber = new Subscriber({
			name: requestBody.name,
			subscribedToChannel: requestBody.subscribedToChannel,
			subscribeDate: requestBody.subscribeDate,
		});
		try {
			const newSubscriber = await subscriber.save();
			res.status(201).json(newSubscriber);
		} catch (err) {
			res.status(400).json({ message: err.message });
		}
	});

router
	.route("/:id")
	.get((req, res) => {})
	.delete((req, res) => {})
	.patch((req, res) => {});

module.exports = router;
