import React from "react";
import {
  FormControl,
  Grid,
  FormLabel,
  Select,
  useColorMode,
  Switch,
} from "@chakra-ui/react";
import ModalTemplate from "./ModalTemplate";

const SettingsModal: React.FC = () => {
  const { colorMode, setColorMode } = useColorMode();

  return (
    <ModalTemplate title="Settings" closeButton="Close">
      <FormControl>
        <Grid templateColumns="1fr 1fr" alignItems="center" gap={4}>
          <FormLabel mb={0}>Theme: </FormLabel>
          <Select
            defaultValue={colorMode}
            onChange={(e) => setColorMode(e.target.value)}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </Select>
          <FormLabel mb={0}>Auto Update: </FormLabel>
          <Switch size="lg" />
        </Grid>
      </FormControl>
    </ModalTemplate>
  );
};

export default SettingsModal;
