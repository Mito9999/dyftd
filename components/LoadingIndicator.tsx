import React, { useState, useEffect } from "react";
import { Box, Progress } from "@chakra-ui/react";

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
    <Box w="100%" h="4px" my="15px">
      {isLoading && isDelayPassed && (
        <Progress w="100%" h="4px" isIndeterminate />
      )}
    </Box>
  );
};

export default LoadingIndicator;
