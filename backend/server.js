const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { router } = require("./routes");
const app = express();
const port = 5001;

// MongoDB connection URL - replace with your database URL
const MONGODB_URI =
	"mongodb+srv://lpuneetnj:nIn1LCCPR208KFSZ@cluster0.geefcdf.mongodb.net/candidateDb";

// Connect to MongoDB
mongoose
	.connect(MONGODB_URI)
	.then(() => console.log("Connected to MongoDB successfully"))
	.catch((err) => console.error("MongoDB connection error:", err));

app.use(
	cors({
		origin: "http://localhost:3000",
	})
);

app.use(express.json());

app.get("/", (req, res) => {
	res.json({ msg: "server is healthy" });
});

app.use("/api/", router);

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
