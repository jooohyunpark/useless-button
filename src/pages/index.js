import Head from "next/head";
import Button from "@/component/Button";
import styles from "@/styles/main.module.scss";

export default function Home() {
  return (
    <>
      <Head>
        <title>Useless Button</title>
        <meta name="description" content="Useless button" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        <Button />
      </main>
    </>
  );
}
