import { useState } from "react";
import ErrorText from "../../components/Typography/ErrorText";
import InputText from "../../components/Input/InputText";
import axios from "axios";
import image from "../../assets/images/SwotsUpLogo.png";
import logo from "../../assets/images/logo.png";

function Login() {
  const INITIAL_LOGIN_OBJ = {
    password: "",
    emailId: "",
  };

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ);

  const submitForm = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (loginObj.emailId.trim() === "")
      return setErrorMessage("Email Id is required!");
    if (loginObj.password.trim() === "")
      return setErrorMessage("Password is required!");

    try {
      setLoading(true);
      const response = await axios.post(
        "http://13.53.73.237:5000/admin/login",
        {
          email: loginObj.emailId,
          password: loginObj.password,
        }
      );

      const token = response.data.token;
      localStorage.setItem("token", token);
      window.location.href = "/app/users";
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Invalid email or password. Please try again.");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setLoginObj({ ...loginObj, [updateType]: value });
  };

  console.log(errorMessage);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center">
      <div className="card mx-auto w-full max-w-md shadow-xl bg-white">
        <div className="grid md:grid-cols-1 grid-cols-1 rounded-xl">
          <div className="py-24 px-10">
            <div className="w-full flex  justify-center mb-4">
              <img src={image} alt="App-logo" height={120} width={120} />
            </div>
            <div className="w-full flex  justify-center mb-12">
              <img src={logo} height={150} width={150} alt="App-logo" />
            </div>

            <form onSubmit={(e) => submitForm(e)}>
              <div className="mb-4">
                <InputText
                  type="emailId"
                  defaultValue={loginObj.emailId}
                  updateType="emailId"
                  containerStyle="mt-4"
                  labelTitle="Email"
                  updateFormValue={updateFormValue}
                />

                <InputText
                  defaultValue={loginObj.password}
                  type="password"
                  updateType="password"
                  containerStyle="mt-4"
                  labelTitle="Password"
                  updateFormValue={updateFormValue}
                />
              </div>

              {/* <div className="text-right text-primary">
                    <Link to="/forgot-password">
                    <span className="text-sm  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                        Forgot Password?
                    </span>
                    </Link>
                </div> */}

              <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
              <button
                type="submit"
                className={"btn mt-2 w-full"}
                style={{
                  backgroundColor: "#ef3a36",
                  ...(loading && { opacity: 0.8 }),
                  color: "#fff",
                }}
              >
                Login
              </button>

              {/* <div className="text-center mt-4">
                Don't have an account yet?{" "}
                <Link to="/register">
                  <span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                    Register
                  </span>
                </Link>
              </div> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
