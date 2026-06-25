export default function Popup({ color, text, onClose }) {
  return (
    // <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">

    <div
      style={{ backgroundColor: color }}
      className="m-5 mx-auto p-4 rounded-lg shadow-lg w-70 text-center"
    >
      <p className="">{text}</p>
      {/* <button
        onClick={onClose}
        className="mt-4 text-white px-4 py-2 rounded hover:bg-gray-800"
      >
        Close
      </button> */}
    </div>
  );
}
