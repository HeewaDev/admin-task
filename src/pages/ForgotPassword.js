import React from "react";
import CustomInput from "../components/CustomInput";

const ForgotPassword = () => {
  return (
    <div className="py-5" style={{ background: "#FF4040", minHeight: "100vh" }}>
      <br />
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center">Forgot Password</h3>
        <p className="text-center">
          {" "}
          Please enter your registered email to get reset password mail
        </p>
        <form action="">
          <CustomInput
            type="text"
            label="Please enter your Email address"
            id="email"
          />

          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              className="border-0 px-3 py-2 text-white fw-bold w-100"
              style={{
                background: "#FF4040",
                borderRadius: "5px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              type="submit"
            >
              Send Link
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
