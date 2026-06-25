import { Link } from "react-router-dom";

export default function Balance({ balance }) {
  return (
    <div className="flex items-center justify-between m-2 mx-8 mb-4 p-4 shadow-md rounded-md">
      <div className="text-gray-600 text-lg font-bold m-1 mb-3">
        Balance: {balance} USD
      </div>
      <Link to={""}>
        <button className="bg-gray-500 text-gray-100 p-2 border rounded-lg hover:bg-gray-600">
          Transaction History
        </button>
      </Link>
    </div>
  );
}
