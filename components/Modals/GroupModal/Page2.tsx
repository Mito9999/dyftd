import React, { useState } from "react";
import {
  Alert,
  AlertIcon,
  FormControl,
  FormLabel,
  Button,
  InputGroup,
  Input,
  InputRightElement,
} from "@chakra-ui/react";

type Props = {
  error: string;
  firstPage: "join" | "create";
  submitPassword: () => void;
  passwords: {
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    newPassword: string;
    setNewPassword: React.Dispatch<React.SetStateAction<string>>;
  };
};

const Page2: React.FC<Props> = ({
  error,
  firstPage,
  submitPassword,
  passwords: { password, setPassword, newPassword, setNewPassword },
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submitPassword();
      }}
    >
      {error.length > 0 && (
        <Alert status="error" mb="15px">
          <AlertIcon />
          {error}
        </Alert>
      )}
      <FormControl>
        <FormLabel textAlign="center" mr="0px">
          {firstPage === "create" ? "New" : "Group"} Password:
        </FormLabel>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            value={firstPage === "create" ? newPassword : password}
            onChange={({ target: { value } }) =>
              firstPage === "create"
                ? setNewPassword(value)
                : setPassword(value)
            }
            type={showPassword ? "text" : "password"}
            autoComplete="password"
            placeholder="Enter password"
            autoFocus
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
  );
};

export default Page2;
