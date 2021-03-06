import { FormEvent, useState } from "react";
import { GetServerSideProps } from "next";
import { useAuth } from "../hooks/useAuth";

import styles from "../styles/Home.module.css";
import { parseCookies } from "nookies";
import { withSSRGuest } from "../utils/withSSRGuest";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, isAuthenticated } = useAuth();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await signIn({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Entrar</button>
    </form>
  );
}

export const getServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {},
  };
});
