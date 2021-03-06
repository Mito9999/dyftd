import React from "react";
import {
  FormControl,
  Flex,
  FormLabel,
  HStack,
  useColorMode,
  Switch,
  Tooltip,
  Heading,
} from "@chakra-ui/react";
import ModalTemplate from "./ModalTemplate";

type Props = {
  shouldAutoUpdate: boolean;
  setShouldAutoUpdate: React.Dispatch<React.SetStateAction<boolean>>;
};
const SettingsModal: React.FC<Props> = ({
  shouldAutoUpdate,
  setShouldAutoUpdate,
}) => {
  const { colorMode, setColorMode } = useColorMode();

  return (
    <ModalTemplate title="Settings" closeButton="Close">
      <FormControl margin="auto" width={["100%", "50%"]}>
        <Flex direction="column">
          <Heading size="md" textAlign="center" mt="20px" mb="4px">
            General
          </Heading>
          <HStack my="15px" spacing="auto">
            <FormLabel mb={0}>
              <Tooltip hasArrow label="Darkens colors">
                Dark Theme
              </Tooltip>
            </FormLabel>
            <Switch
              size="lg"
              isChecked={colorMode === "dark"}
              onChange={() =>
                setColorMode(colorMode === "light" ? "dark" : "light")
              }
            />
          </HStack>
          <Heading size="md" textAlign="center" mt="20px" mb="4px">
            Per Page
          </Heading>
          <HStack my="15px" spacing="auto">
            <FormLabel mb={0}>
              <Tooltip hasArrow label="Checks for updated values every minute">
                Auto Update
              </Tooltip>
            </FormLabel>
            <Switch
              size="lg"
              isChecked={shouldAutoUpdate}
              onChange={() => {
                setShouldAutoUpdate(!shouldAutoUpdate);
              }}
            />
          </HStack>
        </Flex>
      </FormControl>
    </ModalTemplate>
  );
};

export default SettingsModal;
