import React from "react";
import {
  Container,
  Heading,
  // useToast,
  // Grid,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
// import SettingsModal from "./Modals/SettingsModal";
// import GroupModal from "./Modals/GroupModal/index";
// import EditModal from "./Modals/EditModal";
// import LoadingIndicator from "./LoadingIndicator";
import SwitchTable from "./SwitchTable";

const groupList = [
  {
    title: "Global",
    code: "000000",
  },
  {
    title: "Greg",
    code: "473857",
  },
  {
    title: "Zoe",
    code: "993994",
  },
];

const App: React.FC = () => {
  return (
    <Container maxW="750px" centerContent margin="auto">
      <Heading mt="40px">Did You Feed the Dog?</Heading>
      <Tabs w="100%" isFitted>
        <TabList>
          {groupList.map((g) => (
            <Tab key={g.code}>{g.title}</Tab>
          ))}
        </TabList>

        <TabPanels>
          {groupList.map((g) => (
            <TabPanel key={g.code}>
              <p>Group: {g.code}</p>
              <SwitchTable group={g.code} />
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
      {/* <Grid my="40px" w="100%" templateColumns="repeat(3, 1fr)" gap={6}>
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
      </Grid> */}
    </Container>
  );
};

export default App;
