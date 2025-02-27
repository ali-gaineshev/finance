import { Request, Response } from "express";
import { deleteEntry, getEntries, saveEntry } from "../services/entry-service";
import { HTTP_CODE } from "@shared/types/common-enums";
import { LoginJWTPayload } from "../types/types";
import { AddEntryRequestType, DeleteEntryRequestType } from "@shared/types/common-request";
import { Occurrence } from "@shared/types/entry-definitions";
import ResponseDTO from "@shared/dto/response";
import { CommonErrorMessage, CommonMessage, EMPTY_MESSAGE } from "@shared/types/common-message";
import { DeleteEntryResponse, GetAllEntriesResponse } from "@shared/types/common-response";

class EntryController {
  static async addEntry(req: Request<{}, {}, AddEntryRequestType>, res: Response) {
    // Add a new entry
    try {
      const { title, category, type, occurrence, startDate, endDate } = req.body;
      const user: LoginJWTPayload = req.user;

      await saveEntry({ title, category, type, occurrence, startDate, endDate } as AddEntryRequestType, user.uuid);
      res.status(HTTP_CODE.OK).json(new ResponseDTO({ success: true, message: CommonMessage.ENTRY_ADDED }));
    } catch (err: any) {
      console.log(req.body);
      res
        .status(HTTP_CODE.INTERNAL_SERVER_ERROR)
        .json(new ResponseDTO({ success: false, message: CommonErrorMessage.UNKNOWN_ERROR, error: err.message }));
    }
  }

  static async getEntries(req: Request, res: Response) {
    try {
      // add pagination
      const limit_per_page = 15; //hard coded value
      const page = req.query?.page ? parseInt(req.query.page as string, 10) : 1;
      // get user's id to associate it with entries
      const user_id: string = req.user.uuid; // from jwt token
      // fetch entries
      const { entries, totalEntries } = await getEntries(user_id, page, limit_per_page);

      res.status(HTTP_CODE.OK).json(
        new ResponseDTO<GetAllEntriesResponse>({
          success: true,
          message: EMPTY_MESSAGE,
          data: {
            entries: entries,
            metadata: {
              totalEntries: totalEntries,
              currentPage: page,
              totalPages: Math.ceil(totalEntries / limit_per_page),
            },
          },
        }),
      );
    } catch (err: any) {
      res.status(HTTP_CODE.INTERNAL_SERVER_ERROR).json(
        new ResponseDTO({
          success: false,
          message: CommonErrorMessage.UNKNOWN_ERROR,
          error: err.message,
        }),
      );
    }
  }

  static async deleteEntry(req: Request, res: Response) {
    const { entry_id } = req.body as DeleteEntryRequestType;

    const result = await deleteEntry(entry_id);

    if (result.deletedCount === 0) {
      res
        .status(HTTP_CODE.OK)
        .json(new ResponseDTO({ success: false, message: CommonErrorMessage.ENTRY_DELETION_FAILED }));
      return;
    }

    res
      .status(HTTP_CODE.OK)
      .json(
        new ResponseDTO<DeleteEntryResponse>({ success: true, message: CommonMessage.ENTRY_DELETED, data: result }),
      );
  }
}

export default EntryController;
