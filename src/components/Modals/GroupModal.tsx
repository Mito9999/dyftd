import React, { useState } from "react";
import {
  FormControl,
  Flex,
  PinInput,
  PinInputField,
  HStack,
  FormLabel,
  SlideFade,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";

import ModalTemplate from "./ModalTemplate";

const SettingsModal: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const maxPages = 3;

  return (
    <ModalTemplate
      title="Group"
      closeButton={page === 1 ? "Close" : "Back"}
      closeFn={
        page === 1
          ? null
          : () => {
              setPage((prev) => (prev <= 1 ? prev : prev - 1));
            }
      }
      actionButton="Next"
      actionFn={() => {
        setPage((prev) => (prev >= maxPages ? prev : prev + 1));
      }}
    >
      <Flex minH="200px" justify="center" align="center">
        {page === 1 && (
          <SlideFade in={true}>
            <form>
              <FormControl>
                <FormLabel textAlign="center" mr="0px">
                  Enter Group Code:
                </FormLabel>
                <HStack>
                  <PinInput autoFocus>
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                  </PinInput>
                </HStack>
              </FormControl>
            </form>
          </SlideFade>
        )}
        {page === 2 && (
          <SlideFade in={true}>
            <form>
              <FormControl>
                <FormLabel textAlign="center" mr="0px">
                  Password:
                </FormLabel>
                <InputGroup size="md">
                  <Input
                    pr="4.5rem"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </form>
          </SlideFade>
        )}
        {page >= maxPages && (
          <SlideFade in={true}>
            <h2>Group has been found</h2>
          </SlideFade>
        )}
      </Flex>
    </ModalTemplate>
  );
};

export default SettingsModal;
