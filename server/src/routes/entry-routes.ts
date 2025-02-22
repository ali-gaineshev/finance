/* Express */
import express from "express";
const router = express.Router();
/* Auth */
import { authenticateToken } from "../middlewares/auth";

import { add_entry_validator, delete_entry_validator } from "../middlewares/validators/entry.validator";
import { validateRequest } from "../middlewares/validateRequest";
import EntryController from "../controllers/entry-controllers";

router.post("/add_entry", authenticateToken, add_entry_validator, validateRequest, EntryController.addEntry);

router.get("/get_all_entries", authenticateToken, EntryController.getAllEntries);

router.delete("/delete_entry", authenticateToken, delete_entry_validator, validateRequest, EntryController.deleteEntry);

export default router;
