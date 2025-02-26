/* Express */
import express from "express";
const router = express.Router();
/* Auth */
import { authenticateToken } from "../middlewares/auth";

import { add_entry_validator, delete_entry_validator } from "../middlewares/validators/entry.validator";
import { validateRequest } from "../middlewares/validateRequest";
import EntryController from "../controllers/entry-controllers";
import BACKEND_ENDPOINT from "@shared/types/endpoints";

router.post(
  BACKEND_ENDPOINT.ADD_ENTRY,
  authenticateToken,
  add_entry_validator,
  validateRequest,
  EntryController.addEntry,
);

router.get(BACKEND_ENDPOINT.GET_ENTRIES, authenticateToken, EntryController.getEntries);

router.delete(
  BACKEND_ENDPOINT.DELETE_ENTRY,
  authenticateToken,
  delete_entry_validator,
  validateRequest,
  EntryController.deleteEntry,
);

export default router;
