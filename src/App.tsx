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
  Progress,
  Flex,
  ButtonGroup,
  useToast,
  useColorMode,
  Select,
  FormLabel,
  FormControl,
} from "@chakra-ui/react";
import CustomModal from "./CustomModal";

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
  const { colorMode, setColorMode } = useColorMode();
  const toast = useToast();

  const [switchValues, setSwitchValues] = useState<SwitchValues>(
    defaultSwitchValues
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [progressValue, setProgressValue] = useState<number | undefined>(100);

  const handleSwitchChange = (day: DaysOfTheWeek, time: TimeValue) => {
    setSwitchValues((prev) => ({
      ...prev,
      [day]: { ...prev[day], [time]: !prev[day][time] },
    }));
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const values = await getSwitchValues();
      setSwitchValues(values);
      setIsLoading(false);
    })();

    const progressTimeoutID = setTimeout(() => {
      setProgressValue(undefined);
    }, 200);
    return () => {
      clearInterval(progressTimeoutID);
    };
  }, []);

  useEffect(() => {
    try {
      const postSwitchValues = async () => {
        await fetch(SERVER_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(switchValues),
        });
      };
      if (!isLoading) {
        postSwitchValues()
          .then(() => {
            toast({
              title: "Switch Updated!",
              description: "Your changes have been saved successfully.",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
          })
          .catch(() => {
            toast({
              title: "Failed to Update Switch!",
              description: "Your changes have not been saved.",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
          });
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [switchValues]);

  return (
    <Container maxW="750px" centerContent>
      <Heading mt="40px">Did You Feed the Dog?</Heading>
      <Flex my="15px" minW="100%" h="4px" justify="center" align="center">
        {(isLoading || progressValue) && (
          <Progress
            minW="100%"
            h="4px"
            isIndeterminate={progressValue === undefined}
            value={progressValue}
          />
        )}
      </Flex>
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
                <Switch
                  isDisabled={isLoading}
                  isChecked={switchValues[day].morning}
                  onChange={() => handleSwitchChange(day, "morning")}
                  size="lg"
                />
              </Td>
              <Td>
                <Switch
                  isDisabled={isLoading}
                  isChecked={switchValues[day].afternoon}
                  onChange={() => handleSwitchChange(day, "afternoon")}
                  size="lg"
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <ButtonGroup
        d="flex"
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        mt="40px"
      >
        <CustomModal title="Settings" closeButton="Close">
          <FormControl>
            <FormLabel as="h3">Theme: </FormLabel>
            <Select
              defaultValue={colorMode}
              onChange={(e) => setColorMode(e.target.value)}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </Select>
          </FormControl>
        </CustomModal>
        <CustomModal title="Edit" closeButton="Close" actionButton="Update">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus
          illo in accusamus cum voluptatum mollitia architecto maxime minus.
          Voluptate illo iure consequatur eaque, magni accusantium dicta
          repellat pariatur labore qui!
        </CustomModal>
      </ButtonGroup>
    </Container>
  );
};

export default App;
