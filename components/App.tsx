import React, { useEffect, useState } from "react";
import { SwitchValues } from "@constants/types";
import { defaultSwitchValues, SERVER_URL } from "@constants/constants";
import { Container, Heading, useToast, Grid } from "@chakra-ui/react";
import SettingsModal from "./Modals/SettingsModal";
import GroupModal from "./Modals/GroupModal/index";
import EditModal from "./Modals/EditModal";
import LoadingIndicator from "./LoadingIndicator";
import SwitchTable from "./SwitchTable";

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
  const [shouldAutoUpdate, setShouldAutoUpdate] = useState<boolean>(false);

  const setValues = async () => {
    setIsLoading(true);
    const values = await getSwitchValues();
    setSwitchValues(values);
    setIsLoading(false);
  };

  useEffect(() => {
    setValues();
  }, []);

  useEffect(() => {
    const updateID = shouldAutoUpdate
      ? setInterval(setValues, 60 * 1000)
      : setInterval(() => {}, 10000000);

    return () => {
      clearInterval(updateID);
    };
  }, [shouldAutoUpdate]);

  useEffect(() => {
    const postSwitchValues = async () => {
      try {
        const res = await fetch(SERVER_URL, {
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
          description: "There was an error connection to the server.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };

    postSwitchValues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [switchValues]);

  const tableHeaders = Object.keys(switchValues[0].data);

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
      <Grid my="40px" w="100%" templateColumns="repeat(3, 1fr)" gap={6}>
        <SettingsModal
          shouldAutoUpdate={shouldAutoUpdate}
          setShouldAutoUpdate={setShouldAutoUpdate}
        />
        <GroupModal />
        <EditModal
          switchValues={switchValues}
          setSwitchValues={setSwitchValues}
          tableHeaders={tableHeaders}
        />
      </Grid>
    </Container>
  );
};

export default App;
