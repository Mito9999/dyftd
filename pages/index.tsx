import Head from "next/head";
import { useState, useEffect } from "react";
import AppComponent from "@components/App";

export default function App() {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <Head>
        <title>DYFTD - Did you feed the dog?</title>
        <meta
          name="description"
          content="Easy to use collaborative toggles suitable to any purpose"
        />
        <meta property="og:type" content="app" />
        <meta property="og:title" content="DYFTD - Did you feed the dog?" />
        <meta name="twitter:title" content="DYFTD" />
        <meta
          property="og:description"
          content="Collaborate through simple toggles"
        />
        <meta
          name="twitter:description"
          content="Collaborate through simple toggles"
        />
        <meta property="og:image" content="../public/example.png" />
        <meta name="twitter:image" content="../public/example.png" />

        <meta property="og:url" content="https://dyftd.vercel.app/" />
        <meta property="og:site_name" content="DYFTD" />
      </Head>
      {isMounted && <AppComponent />}
    </>
  );
}
