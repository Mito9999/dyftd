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
} from "@chakra-ui/react";

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

const App: React.FC = () => {
  const [switchValues, setSwitchValues] = useState<SwitchValues>(
    defaultSwitchValues
  );

  const handleSwitchChange = (day: DaysOfTheWeek, time: TimeValue) => {
    setSwitchValues((prev) => ({
      ...prev,
      [day]: { ...prev[day], [time]: !prev[day][time] },
    }));
  };

  useEffect(() => {
    console.log(switchValues);
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
            <Tr key={day}>
              <Td>{day}</Td>
              <Td>
                <Switch
                  isChecked={switchValues[day].morning}
                  onChange={() => handleSwitchChange(day, "morning")}
                  size="lg"
                />
              </Td>
              <Td>
                <Switch
                  isChecked={switchValues[day].afternoon}
                  onChange={() => handleSwitchChange(day, "afternoon")}
                  size="lg"
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Container>
  );
};

export default App;
