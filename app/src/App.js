import { useState, useEffect } from "react";
import "./App.css";
import checkinApi from "./api/checkinApi";
function App() {
	const [name, setName] = useState("");
	const [id, setId] = useState("");
	const [gate, setGate] = useState("GATE1");
	const [history, setHistory] = useState([]);
	const [checkin, setCheckin] = useState({});

	const addCheckin = async (name, id, gate) => {
		const newCheckin = {
			name: name,
			id: id,
			gate: gate,
		};
		try {
			console.log(newCheckin);
			const response = await checkinApi.post("/checkin", newCheckin);
			setCheckin(newCheckin);
			console.log(response.data);
		} catch (err) {
			console.log(err);
		}
	};

	//Handles submit events
	const handleSubmit = e => {
		e.preventDefault();
		if (!name) return alert("Please enter employee's name");
		if (!id) return alert("Please enter the id");
		try {
			addCheckin(name, id, gate || "GATE1");
			console.log("added checkin");
		} catch (err) {
			console.log(err);
		}
		setName("");
		setId("");
		setGate("");
	};

	//get history
	useEffect(() => {
		const fetchHistory = async () => {
			try {
				const response = await checkinApi.get("/history"); //get history
				setHistory(response.data.reverse());
			} catch (err) {
				if (!err.response) return console.log(`Error: ${err.message}`);
				console.log(err.response.data);
				console.log(err.response.status);
				console.log(err.response.headers);
			}
		};
		fetchHistory();
		return () => {};
	}, [checkin]);

	return (
		<div className="container">
			{/* get checkin data using a form  */}
			<form className="add-form" onSubmit={handleSubmit}>
				<div className="form-control">
					<label>Enter Employee's name:</label>
					<input
						type="text"
						placeholder="Name"
						value={name}
						onChange={e => setName(e.target.value)}
					/>
				</div>
				<div className="form-control">
					<label>Enter Employee's ID</label>
					<input
						type="text"
						placeholder="ID"
						value={id}
						onChange={e => setId(e.target.value)}
					/>
				</div>
				<div className="form-control">
					<label>Enter Check-in gate:</label>
					<input
						type="text"
						placeholder="GATE"
						value={gate}
						onChange={e => setGate(e.target.value)}
					/>
				</div>
				<input type="submit" value="Check-in" className="btn btn-block" />
			</form>
			<div>
				{history.map(e => (
					<div className="tab">
						<h3>
							No.{e.id}: {e.staff.name}
						</h3>
						<h4>Staff's ID: {e.staffId}</h4>
						<p>Checkin: {Date(e.checkIn.slice(0,-1))}</p>
						<p>Gate: {e.Gate}</p>
						<p>Checkout: {e.checkOut || "N/A"}</p>
					</div>
				))}
			</div>
		</div>
	);
}

export default App;
