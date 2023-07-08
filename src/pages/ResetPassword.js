import React from "react";
import CustomInput from "../components/CustomInput";

const ResetPassword = () => {
  return (
    <div className="py-5" style={{ background: "#FF4040", minHeight: "100vh" }}>
      <br />
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center">Reset Password</h3>
        <p className="text-center">
          {" "}
          Please enter your new password to Continue
        </p>
        <form action="">
          <CustomInput
            type="password"
            label="Enter your new password"
            id="password"
          />

          <CustomInput
            type="password"
            label=" Confirm your password"
            id="password"
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
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
