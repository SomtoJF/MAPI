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
	.get(getSubscriber, (req, res) => {
		res.status(200).json(res.subscriber);
	})
	.delete(getSubscriber, async (req, res) => {
		try {
			const response = await Subscriber.deleteOne(res.subscriber);
			res.status(200).json(response);
		} catch (err) {
			res.status(500).json({ message: err.message });
		}
	})
	.patch(getSubscriber, async (req, res) => {
		if (req.body.name) res.subscriber.name = req.body.name;
		if (req.body.subscribedToChannel)
			res.subscriber.subscribedToChannel = req.body.subscribedToChannel;

		try {
			const response = await res.subscriber.save();
			res.status(200).json(response);
		} catch (err) {
			res.status(400).json({ message: err.message });
		}
	});

async function getSubscriber(req, res, next) {
	let subscriber;
	try {
		subscriber = await Subscriber.findById(req.params.id);
		if (subscriber === null) {
			return res.status(404).json({ message: "Subscriber not found" });
		}
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}

	res.subscriber = subscriber;
	next();
}

module.exports = router;
