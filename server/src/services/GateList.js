import { Prisma } from "../database/prismaClient";
import { Gate } from "@prisma/client";
const GateList = async (req, res) => {
	const validGates = Object.keys(Gate).map(key => {
		return Gate[key];
	});
	return res.status(200).json(validGates);
};
export default GateList;
