import { Category, Occurrence, Type } from "./entry-definitions";

interface AddEntryRequestType {
  title: string;
  category: Category;
  type: Type;
  occurrence: Occurrence;
  startDate?: Date;
  endDate?: Date;
}

type DeleteEntryRequestType = {
  entry_id: string;
};

export { AddEntryRequestType, DeleteEntryRequestType };
