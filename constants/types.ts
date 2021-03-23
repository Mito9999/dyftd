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

// [
//   { "day": "Sunday", "data": { "morning": false, "afternoon": false } },
//   { "day": "Monday", "data": { "morning": false, "afternoon": false } },
//   { "day": "Tuesday", "data": { "morning": false, "afternoon": false } },
//   { "day": "Wednesday", "data": { "morning": false, "afternoon": false } },
//   { "day": "Thursday", "data": { "morning": false, "afternoon": false } },
//   { "day": "Friday", "data": { "morning": false, "afternoon": false } },
//   { "day": "Saturday", "data": { "morning": false, "afternoon": false } },
// ];
