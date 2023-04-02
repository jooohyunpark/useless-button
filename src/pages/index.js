import Head from "next/head";
import UselessButton from "@/component/UselessButton";
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
        <UselessButton />
      </main>
    </>
  );
}
