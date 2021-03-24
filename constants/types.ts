export type DaysOfTheWeek =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

export type SwitchValue = {
  day: string;
  data: {
    [key: string]: boolean;
  };
};

export type SwitchValues = SwitchValue[];
