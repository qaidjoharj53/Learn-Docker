import React, { useState } from "react";

function App() {
	const [name, setName] = useState("");
	const [message, setMessage] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await fetch("http://localhost:5000/user", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name }),
		});
		const data = await response.json();
		setMessage(`User ${data.name} added successfully!`);
	};

	return (
		<div style={{ padding: "20px" }}>
			<h1>Frontend connected to Backend</h1>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Enter Name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<button type="submit">Add User</button>
			</form>
			{message && <p>{message}</p>}
		</div>
	);
}

export default App;
