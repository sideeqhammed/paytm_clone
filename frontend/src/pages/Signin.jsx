import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Heading from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { Footnote } from "../components/Footnote";
import { saveToken } from "../utils/localStorage";
import Popup from "../components/Popup";

export function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorRes, setErrorRes] = useState("");
  const [response, setResponse] = useState("");
  const navigate = useNavigate();

  const inputDetails = [
    { id: "username", name: username, action: setUsername },
    { id: "password", name: password, action: setPassword },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/v1/user/signin", {
        username,
        password,
      });
      setResponse(res.data.message);
      saveToken(res.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.log("Error: " + error);
      setErrorRes(error.response.data.message);
      console.log(errorRes);
      // console.log(error.response.data.message);
    }
    setUsername("");
    setPassword("");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="m-auto">
        <div className="bg-gray-200 m-5 p-5 text-center w-93 max-w-xl rounded-xl">
          <Heading text={"Sign In"} />
          <SubHeading text={"Enter your credentials to access your account"} />
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
          <Button text={"Sign In"} onClick={handleSubmit} />
          <Footnote
            text={"Don't have an account? "}
            linkText={"Sign up"}
            to={"/signup"}
          />
        </div>
        {response ? <Popup color={"#33b864"} text={response} /> : ""}
        {errorRes ? <Popup color={"#ff483f"} text={errorRes} /> : ""}
      </div>
    </div>
  );
}
