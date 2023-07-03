import Textinput from "@/components/ui/Textinput";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup
  .object({
    email: yup.string().email("Invalid email").required("Email is Required"),
    password: yup.string().required("Password is Required"),
  })
  .required();
const ForgotPass = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleForgetPass = (data) => {
    console.log(data);
    setLoading(true);
    schema
      .validate(data, { abortEarly: false })
      .then(async (formData) => {
        const response = await axios.get(
          `https://hr-management-1wt7.onrender.com/api/v1/forgot_password/${formData.email}`
        );
        if (response.status >= 200 && response.status < 300) {
          toast.info("Check your email to reset password");
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {
          const response = error.response;
          if (response.status === 404) {
            toast.error("Email not found");
          }
          else if (response.status >= 500) {
            toast.error("Internal server error");
          }
        } else if (error.request) {
          toast.error("No response from server");
        } else {
          console.log("Error", error.message);
          toast.error("An error occurred");
        }
        console.log(error.config);
      });
  };

  return (
    <form onSubmit={handleSubmit(handleForgetPass)} className="space-y-4 ">
      <Textinput
        name="email"
        label="email"
        type="email"
        register={register}
        error={errors.email}
      />
      <div className="text-center mt-6">
        <button
          className="bg-gray-800 text-white active:bg-gray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
          value="Send recovery email"
          type="submit"
          disabled={loading}
        >
          {!loading && <span className='indicator-label'> Send recovery email</span>}
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

export default ForgotPass;
