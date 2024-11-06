const Candidate = require("../../models/Candidate");

const getCandidates = async (req, res) => {
	try {
		const candidates = await Candidate.find();

		res.json(candidates);
	} catch (error) {
		res.status(500).json({
			message: "Error fetching candidates",
			error: error.message,
		});
	}
};

module.exports = { getCandidates };
