"use client"
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Textinput from "../ui/Textinput";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const CreateCompany = () => {

    const FormValidationSchema = yup
        .object({
            legal_name: yup.string().required("The legal name is required"),
            trading_name: yup.string().required("The trading name is required"),
            abn: yup.string(),
            arbn: yup.string(),
            acn: yup.string(),
            license_numbers: yup.string().required("The License Number is required"),
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
    const [selectedCompany, setSelectedCompany] = useState("");

    // set the selected company 
    const handleCompanySelection = (company) => {
        setSelectedCompany(company);
    };

    // company list out here 
    const renderCompanyList = () => {
        const companyList = [
            { name: "Sole Trader", backgroundImage: "assets/images/all-img/widget-bg-1.png" },
            { name: "Partnership", backgroundImage: "assets/images/all-img/widget-bg-4.png" },
            { name: "Shareholding Company", backgroundImage: "assets/images/all-img/widget-bg-10.png" },
            { name: "Company Limited by Guarantee", backgroundImage: "assets/images/all-img/widget-bg-9.png" },
            { name: "Trust", backgroundImage: "assets/images/all-img/widget-bg-3-1.png" },
            { name: "Incorporated Association", backgroundImage: "assets/images/all-img/widget-bg-7.png" }
        ];

        return (
            <ul className="company-list pb-4 grid grid-cols-2 gap-4">
                {companyList.map((company) => (
                    <li
                        key={company.name}
                        className={`p-3 rounded-md ${selectedCompany && selectedCompany !== company.name ? "hidden" : ""}`}
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
        switch (selectedCompany) {
            case "Sole Trader":
            case "Partnership":
            case "Trust":
            case "Incorporated Association":
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
                                name="license_numbers"
                                register={register}
                                error={errors.license_numbers}
                            />
                        </li>
                        {selectedCompany === "Trust" && (
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
                        {selectedCompany === "Incorporated Association" && (
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
            case "Shareholding Company":
            case "Company Limited by Guarantee":
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
                                name="license_numbers"
                                register={register}
                                error={errors.license_numbers}
                            />
                        </li>
                        {selectedCompany === "Shareholding Company" && (
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
            .then((validatedData) => {
                const formData = {
                    selectedCompany,
                    formData: validatedData
                };
                console.log('FormData:', formData);

                // Rest of your code...

            })
            .catch((validationErrors) => {
                console.log('Validation Errors:', validationErrors.errors);
            });
    };

    return (
        <div>
            <div className="modal mb-5 mx-2">
                {renderCompanyList()}
                {selectedCompany && (
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