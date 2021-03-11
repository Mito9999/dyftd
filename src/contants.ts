import { DaysOfTheWeek, SwitchValues } from "./types";

export const days: DaysOfTheWeek[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const defaultSwitchValues: SwitchValues = [
  {
    day: "Sunday",
    data: {
      morning: true,
      afternoon: false,
    },
  },
  {
    day: "Monday",
    data: {
      morning: false,
      afternoon: false,
    },
  },
  {
    day: "Tuesday",
    data: {
      morning: false,
      afternoon: false,
    },
  },
  {
    day: "Wednesday",
    data: {
      morning: false,
      afternoon: false,
    },
  },
  {
    day: "Thursday",
    data: {
      morning: false,
      afternoon: false,
    },
  },
  {
    day: "Friday",
    data: {
      morning: false,
      afternoon: true,
    },
  },
  {
    day: "Saturday",
    data: {
      morning: false,
      afternoon: false,
    },
  },
];

export const SERVER_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5001/api"
    : "https://dyftd.vercel.app/api";
