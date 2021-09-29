import { AuthContext } from "../contexts/AuthContenxt";
import { useContext } from "react";

export const useAuth = () => useContext(AuthContext);
