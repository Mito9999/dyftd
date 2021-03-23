import React, { useState } from "react";
import { Flex, SlideFade, Spinner } from "@chakra-ui/react";

import ModalTemplate from "../ModalTemplate";
import { SERVER_URL } from "@constants/constants";
import Page1 from "./Page1";
import Page2 from "./Page2";

const SettingsModal: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const maxPages = 3;
  const [page, setPage] = useState<number>(1);
  const [firstPage, setFirstPage] = useState<"join" | "create">("join");

  const [group, setGroup] = useState<string>("");
  const [newGroup, setNewGroup] = useState<string>("");

  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");

  const groupURL = `${SERVER_URL}/group/${
    firstPage === "join" ? group : `create/${newGroup}`
  }`; // either /group/GROUP or /group/create/NEW_GROUP

  const submitCode = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(groupURL);
      await res.json();
      if (!res.ok) {
        throw new Error("There was an unknown error");
      }

      setError("");
      setPage(2);
    } catch {
      setError(
        `Group code ${firstPage === "join" ? "not found" : "is taken"}.`
      );
      firstPage === "join" ? setGroup("") : setNewGroup("");
      setPage(1);
    }
    setIsLoading(false);
  };

  const submitPassword = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(groupURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: firstPage === "join" ? password : newPassword,
        }),
      });
      await res.json();
      if (!res.ok) {
        throw new Error("Incorrect password");
      }

      setError("");
      setPage(3);
    } catch {
      setError(
        firstPage === "join" ? "Incorrect password." : "Failed to create group."
      );
      firstPage === "join" ? setPassword("") : setNewPassword("");
      setPage(2);
    }
    setIsLoading(false);
  };

  const determineActionButtonFn = (() => {
    if (page === 1) {
      return submitCode;
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
      actionButton={page >= maxPages ? "Close" : "Next"}
      actionFn={page >= maxPages ? null : determineActionButtonFn}
    >
      <Flex minH="200px" justify="center" align="center">
        {page === 1 && (
          <SlideFade in>
            {isLoading ? (
              <Spinner size="lg" />
            ) : (
              <Page1
                error={error}
                firstPage={firstPage}
                setFirstPage={setFirstPage}
                submitCode={submitCode}
                groups={{ group, setGroup, newGroup, setNewGroup }}
              />
            )}
          </SlideFade>
        )}
        {page === 2 && (
          <SlideFade in>
            {isLoading ? (
              <Spinner size="lg" />
            ) : (
              <Page2
                error={error}
                firstPage={firstPage}
                submitPassword={submitPassword}
                passwords={{
                  password,
                  setPassword,
                  newPassword,
                  setNewPassword,
                }}
              />
            )}
          </SlideFade>
        )}
        {page >= maxPages && (
          <SlideFade in>
            <h2>Group has been found</h2>
          </SlideFade>
        )}
      </Flex>
    </ModalTemplate>
  );
};

export default SettingsModal;
