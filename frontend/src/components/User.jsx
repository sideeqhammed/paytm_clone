import { useNavigate } from "react-router-dom";
import SendMoney from "../pages/SendMoney";
import api from "../utils/tokenAccess";

export default function User({ userId, username, firstname, lastname }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() =>
        navigate("/send", { state: { userId, username, firstname, lastname } })
      }
      className="flex gap-5 mx-auto my-4 p-4 w-sm bg-gray-200 rounded-xl hover:shadow-xl duration-300 cursor-default"
    >
      <button className="p-2 px-4 rounded-full bg-green-400 text-3xl">
        {username[0].toUpperCase()}
      </button>
      <div>
        <div className="text-xl font-bold text-left">
          {firstname + " " + lastname}
        </div>
        <div className="text-left">{username}</div>
      </div>
    </div>
  );
}
