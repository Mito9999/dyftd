import React, { useState, useEffect } from "react";
import { DaysOfTheWeek, SwitchValue, SwitchValues } from "../constants/types";
import { days } from "../constants/constants";
import { Table, Thead, Tr, Th, Tbody, Td, Switch } from "@chakra-ui/react";

type Props = {
  tableHeaders: string[];
  switchValues: SwitchValues;
  isLoading: boolean;
  setSwitchValues: React.Dispatch<React.SetStateAction<SwitchValues>>;
};

const SwitchTable: React.FC<Props> = ({
  tableHeaders,
  switchValues,
  isLoading,
  setSwitchValues,
}) => {
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
