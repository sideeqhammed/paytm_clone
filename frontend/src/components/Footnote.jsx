import { Link } from "react-router-dom";

export function Footnote({ text, linkText, to }) {
  return (
    <div className="text-gray-500 p-1">
      {text}
      <Link to={to} className="hover:text-blue-500 underline">
        {linkText}
      </Link>
    </div>
  );
}
