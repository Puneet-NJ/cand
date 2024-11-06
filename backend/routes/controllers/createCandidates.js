const Candidate = require("../../models/Candidate");

const createCandidates = async (req, res) => {
	try {
		const newCandidate = new Candidate(req.body);
		await newCandidate.save();
		res.status(201).json({
			message: "Candidate added successfully",
			candidate: newCandidate,
		});
	} catch (error) {
		res.status(400).json({
			message: "Error adding candidate",
			error: error.message,
		});
	}
};

module.exports = { createCandidates };
