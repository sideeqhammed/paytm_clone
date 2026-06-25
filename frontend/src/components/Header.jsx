export function Header({ text, username }) {
  return (
    <div className="bg-gray-600 text-gray-100 p-4 flex items-center justify-between">
      <div className="text-2xl font-bold">Paytm</div>
      <div className="flex items-center space-x-4">
        <div className="text-lg text-gray-300">{text + " " + username}</div>
        <button className="bg-green-500 hover:bg-green-600 text-gray-100 font-bold py-2 px-4 rounded-3xl">
          {username ? username[0].toUpperCase() : "?"}
        </button>
      </div>
    </div>
  );
}
