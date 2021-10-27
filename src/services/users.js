import axios from "./axios";

export function getUsers() {
  return axios.get("?results=20");
}
