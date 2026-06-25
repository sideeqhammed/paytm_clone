import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ActionBox from "../components/ActionBox";
import Balance from "../components/Balance";
import { Header } from "../components/Header";
import { Button } from "../components/Button";
import User from "../components/User";
import api from "../utils/tokenAccess";

export function Dashboard() {
  const [user, setUser] = useState("");
  const [filter, setFilter] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await api.get("user/");
        console.log(response.data);
        setUser(response.data);
      } catch (error) {
        console.log(error.response.data.message);
        navigate("/signin");
      }
    };
    getUser();
  }, []);

  const updateFilter = async (e) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("user/bulk", {
          params: {
            filter,
          },
        });

        console.log(response.data.users);
        setUsers(response.data.users);
      } catch (error) {
        console.log(error);
        console.log(error.response.data.message);
      }
    };
    fetchUsers();
  }, [filter]);

  // Replace with actual data from your authentication logic
  // const user = {
  //   username: "John Doe",
  //   firstname: "John",
  //   lastname: "Doe",
  //   balance: 1000,
  // };

  return (
    <div className="text-center">
      <Header text={"Hello"} username={user.username} />
      <h1 className="text-3xl font-bold mx-auto my-5">Dashboard</h1>
      <Balance balance={user.balance} />
      <div className="flex justify-center gap-7 m-6">
        <ActionBox text={"Send Money"} />
        <ActionBox text={"Recieve Money"} />
      </div>
      <div className="">
        <input
          type="text"
          value={filter}
          size={40}
          placeholder="Search user"
          onChange={updateFilter}
          className="p-2 border-2 rounded-lg m-10 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
        />
      </div>
      {users
        ? users.map((user) => (
            <User
              userId={user._id}
              username={user.username}
              firstname={user.firstname}
              lastname={user.lastname}
            />
          ))
        : ""}
      {/* <User username={"brunoalex"} firstname={"Bruno"} lastname={"Alex"} /> */}
      {/* <Button text={"Search"} /> */}
    </div>
  );
}
