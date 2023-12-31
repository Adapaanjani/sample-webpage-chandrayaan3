const router = require("express").Router();
const { User, validate } = require("../models/user");

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const existingUser = await User.findOne({ email: req.body.email });
		if (existingUser)
			return res
				.status(409)
				.send({ message: "User with given email already exists!" });

		await new User({ ...req.body }).save();
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		console.log(error.message);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;
