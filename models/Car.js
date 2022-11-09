const mongoose = require("mongoose");

const carSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		desc: {
			type: String,
			require: true,
		},
		image: {
			type: String,
			require: true,
		},
		price: {
			type: Number,
			required: true,
		},
		category: {
			type: Array,
			required: true,
			default: [],
		},
	},
	{ timestamps: true }
);

carSchema.index({ name: "text", desc: "text" });

const Model = new mongoose.model("Car", carSchema);
module.exports = Model;
