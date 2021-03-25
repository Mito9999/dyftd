import React, { useState, useEffect } from "react";
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

const defaultGroupList = [
  {
    title: "Global",
    code: "000000",
  },
];

export type groupItem = {
  title: string;
  code: string;
};

const App: React.FC = () => {
  const [groupList, setGroupList] = useState<groupItem[]>(
    JSON.parse(localStorage.getItem("groupList")!) || defaultGroupList
  );
  const [tabIndex, setTabIndex] = useState<number>(
    Number(localStorage.getItem("tabIndex")) || 0
  );

  useEffect(() => {
    localStorage.setItem("groupList", JSON.stringify(groupList));
    localStorage.setItem("tabIndex", JSON.stringify(tabIndex));
  }, [groupList, tabIndex]);

  return (
    <Container maxW="750px" centerContent margin="auto">
      <Heading my="40px">Did You Feed The Dog?</Heading>
      <Tabs index={tabIndex} onChange={setTabIndex} isFitted w="100%">
        <TabList>
          {groupList.map((g) => (
            <Tab key={g.code}>{g.title}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {groupList.map((g) => (
            <TabPanel key={g.code}>
              <SwitchTable
                group={g.code}
                setGroupList={setGroupList}
                setTabIndex={setTabIndex}
              />
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default App;
