import express from "express";
const router = express.Router();
import AddCheckin from "../services/AddCheckin";
import CheckinHistory from "../services/CheckinHistory";
import AddCheckOut from "../services/AddCheckOut";
import access from "../modules/allowAccess";
import validGates from '../services/GateList'
// Add headers before the routes are defined
router.use(access);

//checkin
router.post("/checkin", AddCheckin);
router.post("/checkout", AddCheckOut);
router.get("/validGates", validGates )
router.get("/history", CheckinHistory);

export { router };
