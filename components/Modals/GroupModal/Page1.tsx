import React from "react";
import {
  Alert,
  AlertIcon,
  FormControl,
  FormLabel,
  HStack,
  PinInput,
  PinInputField,
  Flex,
  Button,
} from "@chakra-ui/react";

type Props = {
  error: string;
  firstPage: "join" | "create";
  setFirstPage: React.Dispatch<React.SetStateAction<"join" | "create">>;
  submitCode: (code?: string) => void;
  groups: {
    group: string;
    setGroup: React.Dispatch<React.SetStateAction<string>>;
    newGroup: string;
    setNewGroup: React.Dispatch<React.SetStateAction<string>>;
  };
};

const Page1: React.FC<Props> = ({
  error,
  firstPage,
  setFirstPage,
  submitCode,
  groups: { group, setGroup, newGroup, setNewGroup },
}) => {
  const notFirstPage = firstPage === "join" ? "create" : "join";

  return (
    <>
      <form
        style={{ marginTop: "40px" }}
        onSubmit={(e) => {
          e.preventDefault();
          submitCode();
        }}
      >
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
                  // onComplete={(value) =>
                  //   setTimeout(() => submitCode(value), 100)
                  // }
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
                  // onComplete={submitCode}
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
  );
};

export default Page1;
