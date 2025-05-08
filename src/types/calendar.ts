
export type StatusType = "draft" | "scheduled" | "published";

export interface CalendarEvent {
  id: number;
  title: string;
  date: Date;
  platform: string;
  time: string;
  description: string;
  status: StatusType;
}

export interface EventFormData {
  title: string;
  date: Date;
  platform: string;
  time: string;
  description: string;
  status: "draft" | "scheduled";
}
