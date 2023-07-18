"use client"
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Textinput from "../ui/Textinput";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useAuth } from "@/hooks/useAuth";

const CreateCompany = ({setOpenModal, onFormSubmit}) => {
    const [company_type, setCompanyType] = useState("");
    const [company_type_ref, setCompanyTypeRef] = useState("f1cb1d9c-23d5-4b6d-9dc5-aca288b81124");


    const {user} = useAuth()
    // const created_by = user.user_id;


    const FormValidationSchema = yup
        .object({
            legal_name: yup.string().required("The legal name is required"),
            trading_name: yup.string().required("The trading name is required"),
            abn: yup.string(),
            arbn: yup.string(),
            acn: yup.string(),
            other_license_number: yup.string().required("The License Number is required"),
            shareholding_structure: yup.string(),
            incorporation_number: yup.string(),
        })
        .required();
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(FormValidationSchema),
        mode: "all",
    });



    // set the selected company 
    const handleCompanySelection = (company) => {
        setCompanyType(company);
    };

    // company list out here 
    const renderCompanyList = () => {
        const companyList = [
            { name: "sole-trader", backgroundImage: "assets/images/all-img/widget-bg-1.png" },
            { name: "partnership", backgroundImage: "assets/images/all-img/widget-bg-4.png" },
            { name: "shareholding-company", backgroundImage: "assets/images/all-img/widget-bg-10.png" },
            { name: "company-limited-by-guarantee", backgroundImage: "assets/images/all-img/widget-bg-9.png" },
            { name: "trust", backgroundImage: "assets/images/all-img/widget-bg-3-1.png" },
            { name: "incorporated-association", backgroundImage: "assets/images/all-img/widget-bg-7.png" }
        ];

        return (
            <ul className="company-list pb-4 grid grid-cols-2 gap-4">
                {companyList.map((company) => (
                    <li
                        key={company.name}
                        className={`p-3 rounded-md ${company_type && company_type !== company.name ? "hidden" : ""}`}
                        style={{
                            backgroundImage: `url(${company.backgroundImage})`
                        }}
                        onClick={() => handleCompanySelection(company.name)}
                    >
                        {company.name}
                    </li>
                ))}
            </ul>
        );
    };

    // alll company input here 
    const renderCompanyInputs = () => {
        switch (company_type) {
            case "sole-trader":
            case "partnership":
            case "trust":
            case "incorporated-association":
                return (
                    <div className="grid grid-cols-2 gap-4">
                        <li>
                            <Textinput
                                label="Legal Name"
                                type="text"
                                placeholder="Type your Legal Name"
                                name="legal_name"
                                register={register}
                                error={errors.legal_name}
                            />
                        </li>
                        <li>
                            <Textinput
                                label="Trading Name"
                                type="text"
                                placeholder="Type your Trading Name"
                                name="trading_name"
                                register={register}
                                error={errors.trading_name}
                            />
                        </li>
                        <li>
                            <Textinput
                                label="ABN"
                                type="text"
                                placeholder="Type your ABN"
                                name="abn"
                                register={register}
                                error={errors.abn}
                            />
                        </li>
                        <li>
                            <Textinput
                                label="License number"
                                type="text"
                                placeholder="Other License number(s)"
                                name="other_license_number"
                                register={register}
                                error={errors.other_license_number}
                            />
                        </li>
                        {company_type === "trust" && (
                            <li>
                                <Textinput
                                    label="ARBN"
                                    type="text"
                                    placeholder="Type your ARBN"
                                    name="arbn"
                                    register={register}
                                    error={errors.arbn}
                                />
                            </li>
                        )}
                        {company_type === "incorporated-association" && (
                            <li>
                                <Textinput
                                    label="Incorporation number"
                                    type="text"
                                    placeholder="Type your Incorporation number"
                                    name="incorporation_number"
                                    register={register}
                                    error={errors.incorporation_number}
                                />
                            </li>
                        )}
                    </div>
                );
            case "shareholding-company":
            case "company-limited-by-guarantee":
                return (
                    <div className="grid grid-cols-2 gap-4">
                        <li>
                            <Textinput
                                label="Legal Name"
                                type="text"
                                placeholder="Type your Legal Name"
                                name="legal_name"
                                register={register}
                                error={errors.legal_name}
                            />
                        </li>
                        <li>
                            <Textinput
                                label="Trading Name"
                                type="text"
                                placeholder="Type your Trading Name"
                                name="trading_name"
                                register={register}
                                error={errors.trading_name}
                            />
                        </li>
                        <li>
                            <Textinput
                                label="ACN"
                                type="text"
                                placeholder="Type your ACN"
                                name="acn"
                                register={register}
                                error={errors.acn}
                            />
                        </li>
                        <li>
                            <Textinput
                                label="ABN"
                                type="text"
                                placeholder="Type your ABN"
                                name="abn"
                                register={register}
                                error={errors.abn}
                            />
                        </li>
                        <li>
                            <Textinput
                                label="License number"
                                type="text"
                                placeholder="Other License number(s)"
                                name="other_license_number"
                                register={register}
                                error={errors.other_license_number}
                            />
                        </li>
                        {company_type === "shareholding-company" && (
                            <li>
                                <Textinput
                                    label="Shareholding Structure"
                                    type="text"
                                    placeholder="Shareholding structure(number)"
                                    name="shareholding_structure"
                                    register={register}
                                    error={errors.shareholding_structure}
                                />
                            </li>
                        )}
                    </div>
                );
            default:
                return null;
        }
    };

    // submit the form 
    const onSubmit = (data) => {
        FormValidationSchema.validate(data, { abortEarly: false })
          .then(async (validatedData) => {
            const formData = {
              company_type_ref,
            //   created_by,
              company_type,
              ...validatedData,
            };
            console.log(formData);
      
            // const response = await axios.post(
            //   "https://hr-management-1wt7.onrender.com/api/v1/create_company",
            //   formData
            // );
            // Rest of your code...
            console.log(response)
            setOpenModal(false)
            await onFormSubmit(formData);
          })
          .catch((validationErrors) => {
            console.log("Validation Errors:", validationErrors.message);
          });
      };
      
      

    return (
        <div>
            <div className="modal mb-5 mx-2">
                {renderCompanyList()}
                {company_type && (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ul className="company-inputs">{renderCompanyInputs()}</ul>
                        <div className="flex justify-center items-center mt-3">
                            <button
                                className="relative px-20 py-3 overflow-hidden font-medium text-gray-600 bg-blue-100 border border-blue-300 rounded-md mt-3 shadow-inner group text-center"
                                type="submit"
                            >
                                <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-blue-600 group-hover:w-full ease"></span>
                                <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-blue-600 group-hover:w-full ease"></span>
                                <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-blue-600 group-hover:h-full ease"></span>
                                <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-blue-600 group-hover:h-full ease"></span>
                                <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-blue-900 opacity-0 group-hover:opacity-100"></span>
                                <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">Submit</span>
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    )
}

export default CreateCompany

// import React, { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import Textinput from "../ui/Textinput";
// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";
// import axios from "axios";

// const CreateCompany = () => {
//   const [companyList, setCompanyList] = useState([]);
//   const [company_type, setCompanyType] = useState("");

//   const FormValidationSchema = yup
//     .object({
//       legal_name: yup.string().required("The legal name is required"),
//       trading_name: yup.string().required("The trading name is required"),
//       abn: yup.string(),
//       arbn: yup.string(),
//       acn: yup.string(),
//       other_license_number: yup.string().required("The License Number is required"),
//       shareholding_structure: yup.string(),
//       incorporation_number: yup.string(),
//     })
//     .required();
//   const {
//     register,
//     formState: { errors },
//     handleSubmit,
//   } = useForm({
//     resolver: yupResolver(FormValidationSchema),
//     mode: "all",
//   });



//   const handleCompanySelection = (company) => {
//     setCompanyType(company);
//   };

//   const renderCompanyList = () => {
//     return (
//       <ul className="company-list pb-4 grid grid-cols-2 gap-4">
//         {companyList?.map((company) => (
//           <li
//             key={company.name}
//             className={`p-3 rounded-md ${
//               company_type && company_type !== company.name ? "hidden" : ""
//             }`}
//             style={{
//               backgroundImage: `url(${company.backgroundImage})`,
//             }}
//             onClick={() => handleCompanySelection(company.name)}
//           >
//             {company.name}
//           </li>
//         ))}
//       </ul>
//     );
//   };

//   const renderCompanyInputs = () => {
//             switch (company_type) {
//                 case "sole-trader":
//                 case "Partnership":
//                 case "Trust":
//                 case "Incorporated Association":
//                     return (
//                         <div className="grid grid-cols-2 gap-4">
//                             <li>
//                                 <Textinput
//                                     label="Legal Name"
//                                     type="text"
//                                     placeholder="Type your Legal Name"
//                                     name="legal_name"
//                                     register={register}
//                                     error={errors.legal_name}
//                                 />
//                             </li>
//                             <li>
//                                 <Textinput
//                                     label="Trading Name"
//                                     type="text"
//                                     placeholder="Type your Trading Name"
//                                     name="trading_name"
//                                     register={register}
//                                     error={errors.trading_name}
//                                 />
//                             </li>
//                             <li>
//                                 <Textinput
//                                     label="ABN"
//                                     type="text"
//                                     placeholder="Type your ABN"
//                                     name="abn"
//                                     register={register}
//                                     error={errors.abn}
//                                 />
//                             </li>
//                             <li>
//                                 <Textinput
//                                     label="License number"
//                                     type="text"
//                                     placeholder="Other License number(s)"
//                                     name="other_license_number"
//                                     register={register}
//                                     error={errors.other_license_number}
//                                 />
//                             </li>
//                             {company_type === "Trust" && (
//                                 <li>
//                                     <Textinput
//                                         label="ARBN"
//                                         type="text"
//                                         placeholder="Type your ARBN"
//                                         name="arbn"
//                                         register={register}
//                                         error={errors.arbn}
//                                     />
//                                 </li>
//                             )}
//                             {company_type === "Incorporated Association" && (
//                                 <li>
//                                     <Textinput
//                                         label="Incorporation number"
//                                         type="text"
//                                         placeholder="Type your Incorporation number"
//                                         name="incorporation_number"
//                                         register={register}
//                                         error={errors.incorporation_number}
//                                     />
//                                 </li>
//                             )}
//                         </div>
//                     );
//                 case "Shareholding Company":
//                 case "Company Limited by Guarantee":
//                     return (
//                         <div className="grid grid-cols-2 gap-4">
//                             <li>
//                                 <Textinput
//                                     label="Legal Name"
//                                     type="text"
//                                     placeholder="Type your Legal Name"
//                                     name="legal_name"
//                                     register={register}
//                                     error={errors.legal_name}
//                                 />
//                             </li>
//                             <li>
//                                 <Textinput
//                                     label="Trading Name"
//                                     type="text"
//                                     placeholder="Type your Trading Name"
//                                     name="trading_name"
//                                     register={register}
//                                     error={errors.trading_name}
//                                 />
//                             </li>
//                             <li>
//                                 <Textinput
//                                     label="ACN"
//                                     type="text"
//                                     placeholder="Type your ACN"
//                                     name="acn"
//                                     register={register}
//                                     error={errors.acn}
//                                 />
//                             </li>
//                             <li>
//                                 <Textinput
//                                     label="ABN"
//                                     type="text"
//                                     placeholder="Type your ABN"
//                                     name="abn"
//                                     register={register}
//                                     error={errors.abn}
//                                 />
//                             </li>
//                             <li>
//                                 <Textinput
//                                     label="License number"
//                                     type="text"
//                                     placeholder="Other License number(s)"
//                                     name="other_license_number"
//                                     register={register}
//                                     error={errors.other_license_number}
//                                 />
//                             </li>
//                             {company_type === "Shareholding Company" && (
//                                 <li>
//                                     <Textinput
//                                         label="Shareholding Structure"
//                                         type="text"
//                                         placeholder="Shareholding structure(number)"
//                                         name="shareholding_structure"
//                                         register={register}
//                                         error={errors.shareholding_structure}
//                                     />
//                                 </li>
//                             )}
//                         </div>
//                     );
//                 default:
//                     return null;
//             }
//         };

//   const onSubmit = (data) => {
//     FormValidationSchema.validate(data, { abortEarly: false })
//       .then((validatedData) => {
//         const formData = {
//           company_type,
//           formData: validatedData,
//         };
//         console.log(formData);

//         // Rest of your code...

//       })
//       .catch((validationErrors) => {
//         console.log('Validation Errors:', validationErrors.errors);
//       });
//   };

//   return (
//     <div>
//       <div className="modal mb-5 mx-2">
//         {renderCompanyList()}
//         {company_type && (
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <ul className="company-inputs">{renderCompanyInputs()}</ul>
//             <div className="flex justify-center items-center mt-3">
//               <button
//                 className="relative px-20 py-3 overflow-hidden font-medium text-gray-600 bg-blue-100 border border-blue-300 rounded-md mt-3 shadow-inner group text-center"
//                 type="submit"
//               >
//                 <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2border-blue-600 group-hover:w-full ease"></span>
//                 <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-blue-600 group-hover:w-full ease"></span>
//                 <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-blue-600 group-hover:h-full ease"></span>
//                 <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-blue-600 group-hover:h-full ease"></span>
//                 <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-blue-900 opacity-0 group-hover:opacity-100"></span>
//                 <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">Submit</span>
//               </button>
//             </div>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CreateCompany;
