import React from "react";
import {
  FormControl,
  Flex,
  FormLabel,
  Select,
  useColorMode,
} from "@chakra-ui/react";
import ModalTemplate from "./ModalTemplate";

const SettingsModal: React.FC = () => {
  const { colorMode, setColorMode } = useColorMode();

  return (
    <ModalTemplate title="Settings" closeButton="Close">
      <FormControl>
        <Flex justify="space-between" align="center">
          <FormLabel mb={0}>Theme: </FormLabel>
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
    </ModalTemplate>
  );
};

export default SettingsModal;
