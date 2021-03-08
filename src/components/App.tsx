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
  Input,
  Button,
} from "@chakra-ui/react";
import CustomModal from "./CustomModal";
import { MdAdd, MdClose } from "react-icons/md";

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
// first key is DaysOfTheWeek, tempfix was making it string
type SwitchValues = {
  [key: string]: {
    [key: string]: boolean;
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
  const [newColumnText, setNewColumnText] = useState<string>("");
  const [removeColumnText, setRemoveColumnText] = useState<string>(
    Object.keys(switchValues["Sunday"])[0]
  );

  const handleSwitchChange = (day: DaysOfTheWeek, time: string) => {
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
              title: "Switches Updated!",
              description: "Your changes have been saved successfully.",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
          })
          .catch(() => {
            toast({
              title: "Failed to Update Switches!",
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

  const tableHeaders = (() => {
    const tableHeaderArray = [];
    for (const time in switchValues["Sunday"]) {
      tableHeaderArray.push(time);
    }

    return tableHeaderArray;
  })();

  const tableData = (day: DaysOfTheWeek) => {
    const tableDataArray = [];
    for (const time in switchValues["Sunday"]) {
      tableDataArray.push(
        <Td key={`${day} - ${time}`} maxWidth="100px">
          <Switch
            isDisabled={isLoading}
            isChecked={switchValues[day][time]}
            onChange={() => handleSwitchChange(day, time)}
            size="lg"
          />
        </Td>
      );
    }

    return tableDataArray;
  };

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
      <div style={{ width: "100%", overflowX: "scroll" }}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th></Th>
              {tableHeaders.map((header) => (
                <Th key={header} maxWidth="100px">
                  {header}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {days.map((day) => (
              <Tr key={day} height="70px">
                <Td>{day}</Td>
                {tableData(day)}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>
      <ButtonGroup
        d="flex"
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        mt="40px"
      >
        <CustomModal title="Settings" closeButton="Close">
          <FormControl>
            <Flex justify="space-between" align="center">
              Theme:
              <Select
                defaultValue={colorMode}
                onChange={(e) => setColorMode(e.target.value)}
                w="50%"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </Select>
            </Flex>
          </FormControl>
        </CustomModal>
        <CustomModal title="Edit" closeButton="Close">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              let values: SwitchValues = { ...switchValues };
              for (const value in values) {
                values[value] = { ...values[value], [newColumnText]: false };
              }
              setSwitchValues((prev) => ({
                ...prev,
                ...values,
              }));
              setNewColumnText("");
            }}
          >
            <FormControl mt={3}>
              <FormLabel>Add Column: </FormLabel>
              <Input
                value={newColumnText}
                onChange={(e) => setNewColumnText(e.target.value)}
              />
              <Button
                type="submit"
                colorScheme="green"
                mt={3}
                leftIcon={<MdAdd />}
              >
                Create
              </Button>
            </FormControl>
          </form>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              let values: SwitchValues = { ...switchValues };
              for (const value in values) {
                delete values[value][removeColumnText];
              }

              setSwitchValues(values);
              setRemoveColumnText("");
            }}
          >
            <FormControl mt={9}>
              <FormLabel>Remove Column: </FormLabel>
              <Select
                value={removeColumnText}
                onChange={(e) => setRemoveColumnText(e.target.value)}
              >
                {tableHeaders.map((header) => (
                  <option key={`${header} column`}>{header}</option>
                ))}
              </Select>
            </FormControl>
            <Button
              type="submit"
              colorScheme="red"
              mt={3}
              leftIcon={<MdClose />}
            >
              Delete
            </Button>
          </form>
        </CustomModal>
      </ButtonGroup>
    </Container>
  );
};

export default App;
