import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Heading from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { Footnote } from "../components/Footnote";
import Popup from "../components/Popup";

export function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [response, setResponse] = useState("");
  const [errorRes, setErrorRes] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/v1/user/signup", {
        username,
        password,
        firstname,
        lastname,
      });
      setResponse(res.data);
      navigate("/signin");
    } catch (error) {
      setErrorRes(error.response.data.message);
      console.log("Error: " + error);
      console.log(errorRes);
    }
    setUsername("");
    setPassword("");
    setFirstname("");
    setLastname("");
  };

  const inputDetails = [
    { id: "username", name: username, action: setUsername },
    { id: "password", name: password, action: setPassword },
    { id: "firstname", name: firstname, action: setFirstname },
    { id: "lastname", name: lastname, action: setLastname },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="m-auto">
        <div className="bg-gray-200 m-5 p-5 text-center w-93 max-w-xl rounded-xl">
          <Heading text={"Sign Up"} />
          <SubHeading text={"Enter your information to create an account"} />
          {inputDetails.map((input) => (
            <InputBox
              key={input.id}
              id={input.id}
              label={input.id}
              value={input.name}
              placeholder={input.id}
              onChange={input.action}
            />
          ))}
          <Button text={"Sign Up"} onClick={handleSubmit} />
          <Footnote
            text={"Already have an account? "}
            linkText={"Sign in"}
            to={"/signin"}
          />
        </div>
        {response ? <Popup color={"green"} text={response} /> : ""}
        {errorRes ? <Popup color={"#ff483f"} text={errorRes} /> : ""}
      </div>
    </div>
  );
}
