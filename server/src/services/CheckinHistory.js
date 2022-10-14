import { Prisma } from "../database/prismaClient";
const CheckinHistory = async (req, res) => {
	const checkins = await Prisma.checkin.findMany({
		include: {
			staff: true,
		},
	});
	return res.status(200).json(checkins);
	// .catch(err => {
	// 	return res.status(400).json(err);
	// });
};
export default CheckinHistory;
