/* Express */
import express, { Request, Response } from "express";
const router = express.Router();
/* Auth */
import authenticateToken from "../middlewares/auth";
/* Express Validator */
import { query, body, validationResult } from "express-validator";
/* Util Functions */
import { saveEntry, deleteEntry, getEntries } from "../services/entry-service";
/* Middleware */
// router.use(express.json());
// router.use(express.urlencoded({ extended: true }));

// router.get(
//   "/add_entry",
//   authenticateToken,
//   [
//     query("category").isString().notEmpty().withMessage("Category is required"),
//     query("occurrence").isString().notEmpty().withMessage("_ is required"),
//     query("type").isString().notEmpty().withMessage("Type is required"),
//   ],
//   async (req: Request, res: Response) => {
//     // Check for validation errors
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(HTTP_CODE.BAD_REQUEST).json({ errors: errors.array() });
//     }
//     // Add a new entry
//     try {
//       const { category, occurrence, type, date } = req.query;
//       const user = req.user;
//       const entry = await saveEntry(category, occurrence, type, date, user._id);
//       res.status(HTTP_CODE.OK).send(entry._id);
//     } catch (err) {
//       res.status(HTTP_CODE.INTERNAL_SERVER_ERROR).send({ error: err.message });
//     }
//   }
// );

// router.get("/get_all_entries", authenticateToken, async (req, res) => {
//   console.log(req.cookies);
//   try {
//     // add pagination
//     const limit_per_page = 15; //hard coded value
//     const page = parseInt(req.query.page) || 1;
//     // get user's id to associate it with entries
//     const user_id = req.user._id; // from jwt token
//     // fetch entries
//     const { entries, totalEntries } = await getEntries(
//       user_id,
//       page,
//       limit_per_page
//     );

//     res.status(HTTP_CODE.OK).send({
//       entries,
//       metadata: {
//         totalEntries,
//         currentPage: page,
//         totalPages: Math.ceil(totalEntries / limit_per_page),
//       },
//     });
//   } catch (err) {
//     res.status(HTTP_CODE.INTERNAL_SERVER_ERROR).send({ error: err.message });
//   }
// });

// router.post(
//   "/delete_entry",
//   authenticateToken,
//   [body("entry_id").isString().notEmpty().withMessage("Invalid entry.")],
//   async (req, res) => {
//     // Check for validation errors
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(HTTP_CODE.BAD_REQUEST).json({ errors: errors.array() });
//     }
//     const result = await deleteEntry(req.body.entry_id);

//     if (result.deletedCount === 0) {
//       return res
//         .status(HTTP_CODE.NOT_FOUND)
//         .send({ message: "Entry not found" });
//     }

//     return res.status(HTTP_CODE.OK).send({ result: result });
//   }
// );

export default router;
