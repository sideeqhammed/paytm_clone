export function Button({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-gray-700 p-2 m-2 w-30 text-gray-200 rounded-xl font-bold hover:bg-gray-800"
    >
      {text}
    </button>
  );
}
