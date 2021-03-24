import React from "react";
import {
  Container,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
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
      <Heading my="40px">Did You Feed the Dog?</Heading>
      <Tabs w="100%" isFitted>
        <TabList>
          {groupList.map((g) => (
            <Tab key={g.code}>{g.title}</Tab>
          ))}
        </TabList>

        <TabPanels>
          {groupList.map((g) => (
            <TabPanel key={g.code}>
              <SwitchTable group={g.code} />
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default App;
