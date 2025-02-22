import { Category, Occurrence, Type } from "./entry-definitions";

interface AddEntryRequestType {
  title: string;
  category: Category;
  type: Type;
  occurrence: Occurrence;
  startDate?: Date;
  endDate?: Date;
}

export { AddEntryRequestType };
