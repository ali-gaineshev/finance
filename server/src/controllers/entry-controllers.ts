import { Request, Response } from "express";
import { deleteEntry, getEntries, saveEntry } from "../services/entry-service";
import { HTTP_CODE } from "@shared/types/common-enums";
import { LoginJWTPayload } from "../types/types";
import { AddEntryRequestType } from "@shared/types/common-request";
import { Occurrence } from "@shared/types/entry-definitions";
import ResponseDTO from "@shared/dto/response";
import { CommonErrorMessage, CommonMessage } from "@shared/types/common-error";

class EntryController {
  static async addEntry(req: Request<{}, {}, AddEntryRequestType>, res: Response) {
    // Add a new entry
    try {
      const { title, category, type, occurrence, startDate, endDate } = req.body;
      const user: LoginJWTPayload = req.user;

      await saveEntry({ title, category, type, occurrence, startDate, endDate } as AddEntryRequestType, user.uuid);
      res.status(HTTP_CODE.OK).json(new ResponseDTO({ success: true, message: CommonMessage.ENTRY_ADDED }));
    } catch (err) {
      res.status(HTTP_CODE.INTERNAL_SERVER_ERROR).json(new ResponseDTO({ success: false, error: err }));
    }
  }

  static async getAllEntries(req: Request, res: Response) {
    // console.log(req.cookies);
    // try {
    //   // add pagination
    //   const limit_per_page = 15; //hard coded value
    //   const page = parseInt(req.query.page) || 1;
    //   // get user's id to associate it with entries
    //   const user_id = req.user._id; // from jwt token
    //   // fetch entries
    //   const { entries, totalEntries } = await getEntries(user_id, page, limit_per_page);
    //
    //   res.status(HTTP_CODE.OK).send({
    //     entries,
    //     metadata: {
    //       totalEntries,
    //       currentPage: page,
    //       totalPages: Math.ceil(totalEntries / limit_per_page),
    //     },
    //   });
    // } catch (err) {
    //   res.status(HTTP_CODE.INTERNAL_SERVER_ERROR).send({ error: err.message });
    // }
  }

  static async deleteEntry(req: Request, res: Response) {
    const result = await deleteEntry(req.body.entry_id);

    if (result.deletedCount === 0) {
      res.status(HTTP_CODE.NOT_FOUND).send({ message: "Entry not found" });
      return;
    }

    res.status(HTTP_CODE.OK).send({ result: result });
  }
}

export default EntryController;
