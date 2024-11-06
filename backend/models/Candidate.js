const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
	name: { type: String, required: true },
	phone: { type: String, required: true },
	email: { type: String, required: true },
	gender: {
		type: String,
		enum: ["Male", "Female", "Other"],
		required: true,
	},
	experience: {
		type: String,
		enum: ["Fresher", "1 Year", "2 Years", "3 Years", "More than 3 Years"],
		required: true,
	},
	skills: { type: String, required: true },
	education: {
		type: String,
		enum: ["High School", "Undergraduate", "Graduate", "Postgraduate"],
		required: true,
	},
	createdAt: { type: Date, default: Date.now },
});

const Candidate = mongoose.model("Candidate", candidateSchema);

module.exports = Candidate;
