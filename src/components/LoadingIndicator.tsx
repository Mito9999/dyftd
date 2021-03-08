import React, { useState, useEffect } from "react";
import { Flex, Progress } from "@chakra-ui/react";

type Props = {
  isLoading?: boolean;
};

const LoadingIndicator: React.FC<Props> = ({ isLoading = true }) => {
  // Using a delay for faster connections. If the user loads the page quickly,
  // the progress bar will no longer flash for a fraction of a second.
  // Instead, it just won't show up for them at all.
  const [isDelayPassed, setIsDelayPassed] = useState<boolean>(false);

  useEffect(() => {
    const delayTimeoutID = setTimeout(() => {
      setIsDelayPassed(true);
    }, 200);

    return () => {
      clearInterval(delayTimeoutID);
    };
  }, []);

  return (
    <Flex my="15px" minW="100%" h="4px" justify="center" align="center">
      {isLoading && isDelayPassed && (
        <Progress minW="100%" h="4px" isIndeterminate />
      )}
    </Flex>
  );
};

export default LoadingIndicator;
