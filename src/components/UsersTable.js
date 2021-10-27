import React, { useEffect, useState } from "react";
import { getUsers } from "../services/users";
import TableLoader from "./TableLoader";
import UserRow from "./UserRow";
import InfiniteScroll from "react-infinite-scroll-component";

import "../App.css";
import { LocationModal } from "./LocationModal";

export default function UsersTable() {
  let [users, setUsers] = useState([]);
  let [loading, setLoading] = useState(true);
  let [location, setLocation] = useState({});

  useEffect(() => {
    getMoreUsers();
  }, []);

  function getMoreUsers() {
    setLocation(true);
    getUsers()
      .then((apiData) => {
        let usersList = users.concat(apiData?.results);
        setUsers(usersList);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => setLoading(false));
  }

  return (
    <InfiniteScroll
      dataLength={users?.length}
      next={() => getMoreUsers()}
      hasMore
    >
      <table class="table table-striped table-dark">
        <thead>
          <tr>
            <th>Image</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>phone</th>
            <th>Adress</th>
          </tr>
        </thead>
        <tbody>
          {loading && !users?.length ? (
            <TableLoader />
          ) : (
            users?.map((user) => (
              <UserRow user={user} setLocation={setLocation} />
            ))
          )}

          <LocationModal location={location} />
        </tbody>
      </table>
    </InfiniteScroll>
  );
}
