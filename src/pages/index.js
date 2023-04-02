import Head from "next/head";
import Switch, { SwitchProps } from "@mui/material/Switch";

export default function Home() {
  return (
    <>
      <Head>
        <title>Useless Button</title>
        <meta name="description" content="Useless button" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <Switch />
      </main>
    </>
  );
}
