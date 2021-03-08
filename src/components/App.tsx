import React, { useEffect, useState } from "react";
import { Container, Heading, ButtonGroup, useToast } from "@chakra-ui/react";
import LoadingIndicator from "./LoadingIndicator";
import { SwitchValues } from "../types";
import SwitchTable from "./SwitchTable";
import SettingsModal from "./SettingsModal";
import EditModal from "./EditModal";

const SERVER_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5001/api"
    : "https://dyftd.vercel.app/api";

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
  const toast = useToast();

  const [switchValues, setSwitchValues] = useState<SwitchValues>(
    defaultSwitchValues
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const values = await getSwitchValues();
      setSwitchValues(values);
      setIsLoading(false);
    })();
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

  return (
    <Container maxW="750px" centerContent>
      <Heading mt="40px">Did You Feed the Dog?</Heading>
      <LoadingIndicator isLoading={isLoading} />
      <SwitchTable
        tableHeaders={tableHeaders}
        switchValues={switchValues}
        isLoading={isLoading}
        setSwitchValues={setSwitchValues}
      />
      <ButtonGroup
        d="flex"
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        mt="40px"
      >
        <SettingsModal />
        <EditModal
          switchValues={switchValues}
          setSwitchValues={setSwitchValues}
          tableHeaders={tableHeaders}
        />
      </ButtonGroup>
    </Container>
  );
};

export default App;
