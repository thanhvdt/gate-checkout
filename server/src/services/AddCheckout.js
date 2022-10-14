import { Prisma } from "../database/prismaClient";
import { Gate } from "@prisma/client";
const AddCheckOut = async (req, res) => {
	const resource = req.body;
	console.log(resource);
	const inputName = resource.name;
	const inputId = resource.id;
	const inputGate = resource.gate;
	let STATUS = {};

	if (isNaN(inputId))
		return res.status(200).json("Invalid ID, please enter a number");
	if (!(inputGate in Gate))
		return res
			.status(200)
			.json(
				`Invalid gates, please enter one of these gates: ${Object.getOwnPropertyNames(
					Gate
				)}`
			);

	//Check if the staff is already on the database or not
	let staff = await Prisma.staff.findUnique({
		where: {
			id: Number(inputId),
		},
	});

	//Staff not found
	if (!staff) return res.status(200).json("Staff doesn't exist");

	//add checkout data
	staff = await Prisma.staff
		.update({
			where: {
				id: Number(inputId),
			},
			data: {
				Checkin: {
					update: {
                        where:{
                            
                        },
                        data:{
                            checkOut: new Date(),
                        }
					},
				},
			},
		})
		.then(() => {
			return res.status(200).json("Check-out successfully!");
		})
		.catch(error => {
			return res.status(400).json(error);
		});
};
export default AddCheckOut;
