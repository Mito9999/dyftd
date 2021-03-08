import React, { useEffect, useState } from "react";
import {
  Container,
  Switch,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
} from "@chakra-ui/react";

const SERVER_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5001/api"
    : "https://dyftd.vercel.app/api";

type DaysOfTheWeek =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";
type TimeValue = "morning" | "afternoon" | string;
type SwitchValues = {
  [key in DaysOfTheWeek]: {
    [key in TimeValue]: boolean;
  };
};

const days: DaysOfTheWeek[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const defaultSwitchValues: SwitchValues = {
  Sunday: { morning: false, afternoon: false },
  Monday: { morning: false, afternoon: false },
  Tuesday: { morning: false, afternoon: false },
  Wednesday: { morning: false, afternoon: false },
  Thursday: { morning: false, afternoon: false },
  Friday: { morning: false, afternoon: false },
  Saturday: { morning: false, afternoon: false },
};

const getSwitchValues = async () => {
  try {
    const res = await fetch(SERVER_URL);
    const data: SwitchValues = await res.json();
    return data;
  } catch {
    return defaultSwitchValues;
  }
};

const App: React.FC = () => {
  const [switchValues, setSwitchValues] = useState<SwitchValues>(
    defaultSwitchValues
  );
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);

  const handleSwitchChange = (day: DaysOfTheWeek, time: TimeValue) => {
    setSwitchValues((prev) => ({
      ...prev,
      [day]: { ...prev[day], [time]: !prev[day][time] },
    }));
  };

  useEffect(() => {
    (async () => {
      const values = await getSwitchValues();
      setSwitchValues(values);
      setIsInitialLoad(false);
    })();
  }, []);

  useEffect(() => {
    const postSwitchValues = async () => {
      await fetch(SERVER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(switchValues),
      });
    };
    !isInitialLoad && postSwitchValues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [switchValues]);

  return (
    <Container maxW="750px" centerContent>
      <Heading my="40px">Did You Feed the Dog?</Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th></Th>
            <Th>Morning</Th>
            <Th>Afternoon</Th>
          </Tr>
        </Thead>
        <Tbody>
          {days.map((day) => (
            <Tr key={day} height="70px">
              <Td>{day}</Td>
              <Td>
                {isInitialLoad ? (
                  <Spinner size="md" />
                ) : (
                  <Switch
                    isChecked={switchValues[day].morning}
                    onChange={() => handleSwitchChange(day, "morning")}
                    size="lg"
                  />
                )}
              </Td>
              <Td>
                {isInitialLoad ? (
                  <Spinner size="md" />
                ) : (
                  <Switch
                    isChecked={switchValues[day].afternoon}
                    onChange={() => handleSwitchChange(day, "afternoon")}
                    size="lg"
                  />
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Container>
  );
};

export default App;
