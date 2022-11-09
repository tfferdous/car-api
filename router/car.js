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
	const { search, category } = req.query;
	let queryObject = {};
	if (search) {
		queryObject = {
			...queryObject,
			$text: { $search: req.query.search },
		};
	}

	if (category) {
		queryObject = {
			...queryObject,
			category: { $in: Array.isArray(category) ? category : [category] },
		};
	}

	//get cars by catgory
	if (search || category) {
		try {
			let cars = await Car.find(queryObject);
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

//get car by id
router.get("/:id", async (req, res) => {
	try {
		let car = await Car.findById(req.params.id);
		res.status(200).json({
			car,
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
