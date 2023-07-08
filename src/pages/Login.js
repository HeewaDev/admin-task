import React from "react";
import CustomInput from "../components/CustomInput";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="py-5" style={{ background: "#FF4040", minHeight: "100vh" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="bg-white rounded-3 p-4">
              <h3 className="text-center">Login</h3>
              <p className="text-center">Login to your Account to continue.</p>
              <form>
                <CustomInput
                  type="text"
                  label="Please enter your Email address"
                  id="email"
                />
                <CustomInput
                  type="password"
                  label="Please enter your password"
                  id="password"
                />
                <div className="mb-3 text-end">
                  <Link to="/forgot-password">Forgot Password</Link>
                </div>
                <div className="d-flex justify-content-center">
                  <Link
                    to="/admin"
                    className="btn btn-primary w-100"
                    type="submit"
                    style={{ background: "#FF4040" }}
                  >
                    Login
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
