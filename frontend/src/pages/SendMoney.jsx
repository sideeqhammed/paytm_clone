import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "../components/Header";
import api from "../utils/tokenAccess";
import Popup from "../components/Popup";

export default function SendMoney() {
  const [amount, setAmount] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();
  const { userId, username, firstname, lastname } = location.state;

  const transfer = async () => {
    try {
      const response = await api.post("/account/transfer", {
        to: userId.toString(),
        amount: Number(amount),
      });
      setSuccess(response.data.message);
      console.log(response.data);
      setAmount("");
    } catch (error) {
      setError(error.response.data.message);
      console.log(error.response.data);
      setAmount("");
    }
  };

  return (
    <>
      <Header text={"Hello"} username={username} />
      <div className="flex flex-col align-middle justify-center h-screen">
        <div>
          <div className="bg-gray-100 w-sm p-5 m-auto text-center rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold m-3 mb-8">Send Money</h1>
            <div className="flex gap-5 pl-5">
              <button className="p-2 px-4 rounded-full bg-green-400 text-3xl">
                {username ? username[0].toUpperCase() : "B"}
              </button>
              <div>
                <div className="text-xl font-bold text-left">
                  {firstname + " " + lastname}
                </div>
                <div className="text-left">{username}</div>
              </div>
            </div>
            <input
              type="text"
              value={amount}
              placeholder="Enter amount"
              size={20}
              onChange={(e) => setAmount(e.target.value)}
              className="p-1 border-2 rounded-lg m-5 mt-9 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
            />
            <button
              className="bg-green-400 p-2 m-2 mt-7 w-40 rounded-xl font-bold hover:bg-green-500 hover:scale-105 duration-300"
              onClick={transfer}
            >
              Transfer
            </button>
          </div>
          <div>
            {success ? <Popup color={"#33b864"} text={success} /> : ""}
            {error ? <Popup color={"#ff483f"} text={error} /> : ""}
          </div>
        </div>
      </div>
    </>
  );
}
