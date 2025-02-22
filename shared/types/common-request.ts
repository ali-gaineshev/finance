import { Occurrence } from "./entry-definitions";

type AddEntryRequestType = {
  title: string;
  category: string;
  type: string;
  occurrence: Occurrence;
  startDate: Date;
  endDate?: Date;
};

export { AddEntryRequestType };
