export interface TimelineEvent {
  id: string;
  title: string;
  description?: string;
  date: string;
  type:
    | "registration"
    | "op"
    | "complaint"
    | "prescription"
    | "lab"
    | "ipd"
    | "billing"
    | "discharge";
}