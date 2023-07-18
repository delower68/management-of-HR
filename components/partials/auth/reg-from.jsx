import React, { useState } from "react";
import { toast } from "react-toastify";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import Checkbox from "@/components/ui/Checkbox";
import axios from "axios";

const schema = yup
  .object({
    full_name: yup.string()
      .min(3, "Minimum 8 symbols")
      .max(50, "Maximum 50 symbols")
      .required("Name is required"),
    email: yup.string()
      .email("Wrong email format")
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("Email is required"),
    password: yup.string()
      .min(8, "Pasword must be 8 or more characters")
      .matches(
        /(?=.*[a-z])(?=.*[A-Z])\w+/,
        "Password ahould contain at least one uppercase and lowercase character"
      )
      .matches(/\d/, "Password should contain at least one number")
      .matches(
        /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/,
        "Password should contain at least one special character"
      )
      .required("Password is required"),
    });

const RegForm = () => {
  const [loading, setLoading] = useState(false)
  const [checked, setChecked] = useState(false);
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });


  const handelSignUp = (data) => {
    setLoading(true);
    schema
      .validate(data, { abortEarly: false })
      .then(async (formData) => {
        const response = await axios.post(
          "https://hr-management-1wt7.onrender.com/api/v1/register",
          formData
        );
        console.log(response.data.message);
        if (response.status >= 200 && response.status < 300 && typeof window !== "undefined") {
          router.push("/auth/login");
          toast.success("SignUp successfully");
          toast.info("Check your email to verify");
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false)
        if (error.response) {
          const response = error.response;
          if (response.status === 406) {
            const errorMessage = response.data.message;
            toast.error(errorMessage);
          } else if (response.status >= 400 && response.status <= 500) {
            const errorMessage = response.data.message;
            toast.error(errorMessage);
          } else {
            toast.error("Internal server error");
          }
        } else if (error.request) {
          console.log(error.request);
          toast.error("No response from server");
        } else {
          console.log("Error", error.message);
          toast.error("An error occurred");
        }
        console.log(error.config);
      });
  };
  return (
    <form onSubmit={handleSubmit(handelSignUp)} className="space-y-5 ">
      <Textinput
        name="full_name"
        label="Full Name"
        type="text"
        placeholder=" Enter your full name"
        register={register}
        error={errors.full_name}
      />{" "}
      <Textinput
        name="email"
        label="email"
        type="email"
        placeholder=" Enter your email"
        register={register}
        error={errors.email}
      />
      <Textinput
        name="password"
        label="passwrod"
        type="password"
        placeholder=" Enter your password"
        register={register}
        error={errors.password}
      />
      <Checkbox
        label="You accept our Terms and Conditions and Privacy Policy"
        value={checked}
        onChange={() => setChecked(!checked)}
      />
      <div className="text-center mt-6">
                      <button
                        className="btn btn-dark block w-full text-center"
                        value="Create an account"
                        type="submit"
                        disabled={loading}
                      >
                        {!loading && <span className='indicator-label'> Create an account</span>}
                        {loading && (
                          <span className='indicator-progress' style={{ display: 'block' }}>
                            Please wait...
                            <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                          </span>
                        )}
                      </button>
                    </div>
    </form>
  );
};

export default RegForm;
