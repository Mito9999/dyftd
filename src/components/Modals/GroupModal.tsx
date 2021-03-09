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
  Spinner,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

import ModalTemplate from "./ModalTemplate";
import { SERVER_URL } from "../../contants";

const SettingsModal: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const maxPages = 3;
  const [page, setPage] = useState<number>(1);
  const [firstPage, setFirstPage] = useState<"join" | "create">("join");
  const notFirstPage = firstPage === "join" ? "create" : "join";

  const [group, setGroup] = useState<string>("");
  const [newGroup, setNewGroup] = useState<string>("");

  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const submitCode = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${SERVER_URL}/group/${group}`);
      if (!res.ok) {
        throw new Error("Failed to find group code");
      }
      const data = await res.json();

      console.log(data);
      setError("");
      setPage(2);
    } catch {
      setError("Group code not found.");
      setGroup("");
      setPage(1);
    }
    setIsLoading(false);
  };

  // Will implement this in next commit
  const createCode = () => {
    console.log("creating code");
  };

  const submitPassword = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${SERVER_URL}/group/${group}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        throw new Error("Incorrect password");
      }
      const data = await res.json();

      console.log(data);
      setError("");
      setPage(3);
    } catch {
      setError("Incorrect password.");
      setPassword("");
      setPage(2);
    }
    setIsLoading(false);
  };

  const determineActionButtonFn = (() => {
    if (page === 1) {
      return firstPage === "join" ? submitCode : createCode;
    } else if (page === 2) {
      return submitPassword;
    } else {
      return () => setPage((prev) => (prev >= maxPages ? prev : prev + 1));
    }
  })();

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
      actionFn={determineActionButtonFn}
    >
      <Flex minH="200px" justify="center" align="center">
        {page === 1 && (
          <SlideFade in>
            {isLoading ? (
              <Spinner size="lg" />
            ) : (
              <>
                <form style={{ marginTop: "40px" }}>
                  {error.length > 0 && (
                    <Alert status="error" mb="15px">
                      <AlertIcon />
                      {error}
                    </Alert>
                  )}
                  <FormControl>
                    {firstPage === "join" && (
                      <>
                        <FormLabel textAlign="center" mr="0px">
                          Enter Group Code:
                        </FormLabel>
                        <HStack>
                          <PinInput
                            value={group}
                            onChange={(value) => setGroup(value)}
                            autoFocus
                          >
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                          </PinInput>
                        </HStack>
                      </>
                    )}
                    {firstPage === "create" && (
                      <>
                        <FormLabel textAlign="center" mr="0px">
                          Create Your Group Code:
                        </FormLabel>
                        <HStack>
                          <PinInput
                            value={newGroup}
                            onChange={(value) => setNewGroup(value)}
                            autoFocus
                          >
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                          </PinInput>
                        </HStack>
                      </>
                    )}
                  </FormControl>
                </form>
                <Flex justify="center" align="center" mt="60px" mb="10px">
                  <Button
                    variant="link"
                    onClick={() => {
                      setFirstPage(notFirstPage);
                    }}
                  >
                    Or {notFirstPage} a group
                  </Button>
                </Flex>
              </>
            )}
          </SlideFade>
        )}
        {page === 2 && (
          <SlideFade in>
            {isLoading ? (
              <Spinner size="lg" />
            ) : (
              <form>
                {error.length > 0 && (
                  <Alert status="error" mb="15px">
                    <AlertIcon />
                    {error}
                  </Alert>
                )}
                <FormControl>
                  <FormLabel textAlign="center" mr="0px">
                    Password:
                  </FormLabel>
                  <InputGroup size="md">
                    <Input
                      pr="4.5rem"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type={showPassword ? "text" : "password"}
                      autoComplete="password"
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
            )}
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
