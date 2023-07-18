import React, { useState } from "react";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import Checkbox from "@/components/ui/Checkbox";
import Link from "next/link";
import { toast } from "react-toastify";
import axios from "axios";

const schema = yup.object().shape({
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






const LoginForm = () => {
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });


  const handelSignIn = (data) => {
    setLoading(true);
    schema
      .validate(data, { abortEarly: false })
      .then(async (formData) => {
        const response = await axios.post(
          // "https://hr-management-1wt7.onrender.com/api/v1/login",
          'https://webapi.lincolnau.nsw.edu.au/accounts/login',
          formData
        );
        const userInfo = response?.data?.data;
        console.log(userInfo)
        if (response?.data?.success === true) {
          router.push("/");
          toast.success("Login successful");
          localStorage.setItem("user", JSON.stringify(userInfo));
        }
        setLoading(false);
        if (response) {
          const errorMessage = response?.data?.err;
          toast.error(errorMessage);
        } else {
          toast.error("An error occurred from server");
        }
        if (response.status === 500){
          toast.error("An error occurred from server")
        }
      })

      .catch((error) => {
        setLoading(false);
        if (error.response) {
          const errorMessage = error.response?.data?.err || "An error occurred";
          toast.error(errorMessage);
        } else {
          toast.error("An error occurred from server");
        }
      });
  };
  
  

  return (
    <form onSubmit={handleSubmit(handelSignIn)} className="space-y-4 ">
      <Textinput
        name="email"
        label="email"
        type="email"
        register={register}
        error={errors?.email}
      />
      <Textinput
        name="password"
        label="passwrod"
        type="password"
        register={register}
        error={errors.password}
      />
      <div className="flex justify-between">
        <Checkbox
          value={checked}
          onChange={() => setChecked(!checked)}
          label="Keep me signed in"
          className="m-2"
        />
        <Link
          href="/auth/forgot_password"
          className="text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium"
        >
          Forgot Password?{" "}
        </Link>
      </div>

      <div className="text-center mt-6">
                      <button
                        className="bg-gray-800 text-white active:bg-gray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        value="Submit"
                        type="submit"
                        disabled={loading}
                      >
                        {!loading && <span className='indicator-label'> Sign In</span>}
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

export default LoginForm;
