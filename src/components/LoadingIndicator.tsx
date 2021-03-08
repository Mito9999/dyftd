import React, { useState, useEffect } from "react";
import { Flex, Progress } from "@chakra-ui/react";

type Props = {
  isLoading?: boolean;
};

const LoadingIndicator: React.FC<Props> = ({ isLoading = true }) => {
  const [progressValue, setProgressValue] = useState<number | undefined>(100);

  useEffect(() => {
    const progressTimeoutID = setTimeout(() => {
      setProgressValue(undefined);
    }, 200);
    return () => {
      clearInterval(progressTimeoutID);
    };
  }, []);

  return (
    <Flex my="15px" minW="100%" h="4px" justify="center" align="center">
      {(isLoading || progressValue) && (
        <Progress
          minW="100%"
          h="4px"
          isIndeterminate={progressValue === undefined}
          value={progressValue}
        />
      )}
    </Flex>
  );
};

export default LoadingIndicator;
