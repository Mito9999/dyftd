export type DaysOfTheWeek =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

export type SwitchValues = {
  [key: string]: {
    [key: string]: boolean;
  };
};
