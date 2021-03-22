import { useState, useEffect } from "react";
import CreateReactAppEntryPoint from "@components/App";

function App() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <CreateReactAppEntryPoint />;
}

export default App;
