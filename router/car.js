const router = require("express").Router();
const upload = require("../middlewares/multer");
const Car = require("../models/Car");

//add new car
router.post("/add", upload.single("image"), async (req, res) => {
	try {
		const newCar = new Car({ ...req.body, image: req.file.path });
		await newCar.save();
		res.status(200).json({
			message: "Car added successful",
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
});

//get cars by category
router.get("/", async (req, res) => {
	const { category } = req.query;
	const categories = Array.isArray(category) ? category : [category];

	//get cars by catgory
	if (category) {
		try {
			let cars = await Car.find({ category: { $in: categories } });
			res.status(200).json({
				cars,
			});
		} catch (error) {
			res.status(500).json({
				message: error.message,
			});
		}

		return;
	}

	// get all cars
	try {
		let cars = await Car.find({});
		res.status(200).json({
			cars,
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
});

//update car
router.put("/:id", async (req, res) => {
	const { id } = req.params;

	try {
		await Car.findByIdAndUpdate(id, req.body);
		res.status(200).json({
			message: "Product update successfull!!",
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
});

//delete car
router.delete("/:id", async (req, res) => {
	const { id } = req.params;
	try {
		await Car.findByIdAndDelete(id);
		res.status(200).json({
			message: "successufully deleted car",
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
});

module.exports = router;
