import React, { useState, useEffect } from "react";
import { DaysOfTheWeek, SwitchValue, SwitchValues } from "@constants/types";
import { days } from "@constants/constants";
import { defaultSwitchValues, SERVER_URL } from "@constants/constants";
import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Switch,
  useToast,
} from "@chakra-ui/react";
import LoadingIndicator from "./LoadingIndicator";

// group is a string with 6 digits, eg. 0038015
type Props = {
  group: string;
};

const SwitchTable: React.FC<Props> = ({ group }) => {
  const toast = useToast();

  const [switchValues, setSwitchValues] = useState<SwitchValues>(
    defaultSwitchValues
  );
  const [hasInitiallyLoaded, setHasInitiallyLoaded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [shouldAutoUpdate, setShouldAutoUpdate] = useState<boolean>(false);

  const getSwitchValues = async () => {
    try {
      const res = await fetch(`${SERVER_URL}/group/${group}`);
      const data: SwitchValues = await res.json();
      return data;
    } catch {
      return defaultSwitchValues;
    }
  };

  const setValues = async () => {
    setIsLoading(true);
    const values = await getSwitchValues();
    setSwitchValues(values);
    setIsLoading(false);
    // Avoids posting switch values on load
    !hasInitiallyLoaded && setTimeout(() => setHasInitiallyLoaded(true), 100);
  };

  useEffect(() => {
    setValues();
  }, []);

  useEffect(() => {
    const updateID = shouldAutoUpdate
      ? setInterval(setValues, 60 * 1000)
      : setInterval(() => {}, 60 * 1000);

    return () => {
      clearInterval(updateID);
    };
  }, [shouldAutoUpdate]);

  useEffect(() => {
    const postSwitchValues = async () => {
      try {
        const res = await fetch(`${SERVER_URL}/group/${group}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(switchValues),
        });

        res.ok
          ? toast({
              title: "Switches Updated!",
              description: "Your changes have been saved successfully.",
              status: "success",
              duration: 3000,
              isClosable: true,
            })
          : toast({
              title: "Failed to Update Switches!",
              description: "Your changes have not been saved.",
              status: "warning",
              duration: 3000,
              isClosable: true,
            });
      } catch {
        toast({
          title: "Could Not Connect to Server!",
          description: "There was an error connecting to the server.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };

    hasInitiallyLoaded && postSwitchValues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [switchValues]);

  const tableHeaders = Object.keys(switchValues[0].data);

  const handleSwitchChange = (day: DaysOfTheWeek, time: string) => {
    const selectedSwitchIndex = switchValues.findIndex(
      (val) => val.day === day
    );
    const previous = switchValues[selectedSwitchIndex];
    const newValues: SwitchValue = {
      ...previous,
      data: {
        ...previous.data,
        [time]: !previous.data[time],
      },
    };
    setSwitchValues([
      ...switchValues.slice(0, selectedSwitchIndex),
      newValues,
      ...switchValues.slice(selectedSwitchIndex + 1),
    ]);
  };

  const divRef = React.useRef<HTMLDivElement>(null);
  const [isScrollable, setIsScrollable] = useState<boolean>(false);

  useEffect(() => {
    const scrollCallback = () => {
      const scrollable =
        divRef.current?.offsetWidth! < divRef.current?.scrollWidth!;

      setIsScrollable(scrollable);
    };
    !isLoading && scrollCallback();
    window.addEventListener("resize", scrollCallback);

    return () => {
      window.removeEventListener("resize", scrollCallback);
    };
  }, [isLoading]);

  return (
    <div
      ref={divRef}
      style={{ width: "100%", overflowX: isScrollable ? "scroll" : "hidden" }}
    >
      <LoadingIndicator isLoading={isLoading} />
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
          {days.map((day, idx) => (
            <Tr key={day} height="70px">
              <Td>{day}</Td>
              {Object.entries(switchValues[idx].data).map(
                (keysAndValues, idx) => (
                  <Td key={`${day} - ${idx}`} maxWidth="100px">
                    <Switch
                      isDisabled={isLoading}
                      isChecked={keysAndValues[1]}
                      onChange={() => handleSwitchChange(day, keysAndValues[0])}
                      size="lg"
                    />
                  </Td>
                )
              )}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};

export default SwitchTable;
