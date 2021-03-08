import React, { useState, useEffect } from "react";
import { DaysOfTheWeek, SwitchValues } from "../types";
import { days } from "../contants";
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
    setSwitchValues((prev) => ({
      ...prev,
      [day]: { ...prev[day], [time]: !prev[day][time] },
    }));
  };

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
          {days.map((day) => (
            <Tr key={day} height="70px">
              <Td>{day}</Td>
              {tableData(day)}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};

export default SwitchTable;
