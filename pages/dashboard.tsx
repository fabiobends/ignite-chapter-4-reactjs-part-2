import { destroyCookie } from "nookies";
import React, { useEffect } from "react";
import { Permit } from "../components/Permit";
import { useAuth } from "../hooks/useAuth";
import { usePermit } from "../hooks/usePermit";
import { setupAPIClient } from "../services/api";
import { api } from "../services/apiClient";
import { withSSRAuth } from "../utils/withSSRAuth";

export default function Dashboard() {
  const { user, signOut } = useAuth();

  useEffect(() => {
    api
      .get("/me")
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1>Dashboard: {user?.email}</h1>
      <button onClick={signOut}>Sign out</button>
      <Permit permissions={["metrics.list"]}>
        <div>Métricas</div>
      </Permit>
    </div>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get("/me");

  console.log(response.data);

  return {
    props: {},
  };
});
