// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
	.connect("mongodb://localhost:27017/dockerTest", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Connected to MongoDB"))
	.catch((err) => console.log(err));

// Define a simple model
const UserSchema = new mongoose.Schema({ name: String });
const User = mongoose.model("User", UserSchema);

// Routes
app.get("/", (req, res) => res.send("Hello from Backend!"));

app.post("/user", async (req, res) => {
	const { name } = req.body;
	const user = new User({ name });
	await user.save();
	res.json(user);
});

// Start server
app.listen(PORT, () =>
	console.log(`Server running on http://localhost:${PORT}`)
);
