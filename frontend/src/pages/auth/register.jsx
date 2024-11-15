import { registerFormControl } from "../../config/config";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "../../components/common/Form";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../store/auth/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

const Register = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.auth);

  const onSubmit = async (e) => {
    e.preventDefault();

    // Check if the form is filled (skip validation logic here for now)
    if (!formData.userName || !formData.email || !formData.password) {
      toast.error("Please fill in all the fields.");
      return;
    }

    try {
      const data = await dispatch(registerUser(formData));

      if (data?.payload?.message === "Registration successful") {
        toast.success("Registration successful!");
      } else if (data?.payload?.message === "User already exists") {
        toast.error("User already exists");
      }

      setFormData(initialState);
      navigate("/auth/login"); // Redirect to login page after handling response
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Registration error:", error); // Log the error for debugging
    }
  };

  // Handle any errors from the server response
  if (error) {
    toast.error(error);
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create a new account
        </h1>
        <p className="mt-2">
          Already have an account?
          <Link
            className="font-medium text-primary ml-2 hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
      <Form
        formControls={registerFormControl}
        buttonText={"Create Account"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default Register;
