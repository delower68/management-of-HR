"use client"
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const CreateCompany = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [selectedCompany, setSelectedCompany] = useState("");

    const handleCompanySelection = (company) => {
        setSelectedCompany(company);
    };
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
      

    const renderCompanyInputs = () => {
        switch (selectedCompany) {
            case "Sole Trader":
            case "Partnership":
            case "Trust":
            case "Incorporated Association":
                return (
                    <div className="grid grid-cols-2 gap-4">
                        <li>
                            <input className="block text-gray-700 text-sm font-bold p-3 border border-2 mb-2" type="text" placeholder="Legal Name" {...register("legalName", { required: true })} />
                            {errors.legalName && <span>This field is required</span>}
                        </li>
                        <li>
                            <input className="block text-gray-700 text-sm font-bold p-3 border border-2 mb-2" type="text" placeholder="Trading Name" {...register("tradingName", { required: true })} />
                            {errors.tradingName && <span>This field is required</span>}
                        </li>
                        <li>
                            <input className="block text-gray-700 text-sm font-bold p-3 border border-2 mb-2" type="text" placeholder="ABN" {...register("abn", { required: true })} />
                            {errors.abn && <span>This field is required</span>}
                        </li>
                        <li>
                            <input className="block text-gray-700 text-sm font-bold p-3 border border-2 mb-2" type="text" placeholder="Other License number(s)" {...register("licenseNumbers")} />
                        </li>
                        {selectedCompany === "Trust" && (
                            <li>
                                <input className="block text-gray-700 text-sm font-bold p-3 border border-2 mb-2" type="text" placeholder="ARBN" {...register("arbn")} />
                            </li>
                        )}
                        {selectedCompany === "Incorporated Association" && (
                            <li>
                                <input className="block text-gray-700 text-sm font-bold p-3 border border-2 mb-2" type="text" placeholder="Incorporation number" {...register("incorporationNumber")} />
                            </li>
                        )}
                    </div>
                );
            case "Shareholding Company":
            case "Company Limited by Guarantee":
                return (
                    <div className="grid grid-cols-2 gap-4">
                        <li>
                            <input className="block text-gray-700 text-sm font-bold p-3 border border-2 mb-2" type="text" placeholder="Legal Name" {...register("legalName", { required: true })} />
                            {errors.legalName && <span>This field is required</span>}
                        </li>
                        <li>
                            <input className="block text-gray-700 text-sm font-bold p-3 border border-2 mb-2" type="text" placeholder="Trading Name" {...register("tradingName", { required: true })} />
                            {errors.tradingName && <span>This field is required</span>}
                        </li>
                        <li>
                            <input className="block text-gray-700 text-sm font-bold p-3 border border-2 mb-2" type="text" placeholder="ACN" {...register("acn", { required: true })} />
                            {errors.acn && <span>This field is required</span>}
                        </li>
                        <li>
                            <input className="block text-gray-700 text-sm font-bold p-3 border border-2 mb-2" type="text" placeholder="ABN" {...register("abn", { required: true })} />
                            {errors.abn && <span>This field is required</span>}
                        </li>
                        <li>
                            <input className="block text-gray-700 text-sm font-bold p-3 border border-2 mb-2" type="text" placeholder="Other License number(s)" {...register("licenseNumbers")} />
                        </li>
                        {selectedCompany === "Shareholding Company" && (
                            <li>
                                <input className="block text-gray-700 text-sm font-bold p-3 border border-2 mb-2" type="number" placeholder="Shareholding structure(number)" {...register("shareholdingStructure")} />
                            </li>
                        )}
                    </div>
                );
            default:
                return null;
        }
    };
    const onSubmit = (data) => {
        const formData = {
            selectedCompany,
            formData: data 
        }
        console.log('FormData:', formData)
    };
    return (
        <div>
            {/* <div className="modal">
                <ul className="company-list pb-4 grid grid-cols-2 gap-4">
                    <li className="p-3" style={{
                        backgroundImage: `url(assets/images/all-img/widget-bg-1.png)`
                    }
                    } onClick={() => handleCompanySelection("Sole Trader")}>Sole Trader</li>
                    <li className="p-3" style={{
                        backgroundImage: `url(assets/images/all-img/widget-bg-4.png)`
                    }
                    } onClick={() => handleCompanySelection("Partnership")}>Partnership</li>
                    <li style={{
                        backgroundImage: `url(assets/images/all-img/widget-bg-3-1.png)`
                    }
                    } className="p-3" onClick={() => handleCompanySelection("Shareholding Company")}>Shareholding Company</li>
                    <li style={{
                        backgroundImage: `url(assets/images/all-img/widget-bg-8.png)`
                    }
                    } className="p-3" onClick={() => handleCompanySelection("Company Limited by Guarantee")}>Company Limited by Guarantee</li>
                    <li className="p-3 bg-blue-400" onClick={() => handleCompanySelection("Trust")}>Trust</li>
                    <li style={{
                        backgroundImage: `url(assets/images/all-img/widget-bg-7.png)`
                    }
                    } className="p-3" onClick={() => handleCompanySelection("Incorporated Association")}>Incorporated Association</li>
                </ul>
                {selectedCompany && (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ul className="company-inputs">
                            {renderCompanyInputs()}
                        </ul>
                        <div className="flex justify-center items-center">
                            <button className="relative px-20 py-3 overflow-hidden font-medium text-gray-600 bg-gray-100 border border-gray-300 rounded-md mt-3 shadow-inner group text-center" type="submit">
                                <span class="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
                                <span class="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
                                <span class="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                                <span class="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                                <span class="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
                                <span class="relative transition-colors duration-300 delay-200 group-hover:text-white ease">Submit</span>
                            </button>
                        </div>
                    </form>
                )}
            </div> */}
             <div className="modal">
        {renderCompanyList()}
        {selectedCompany && (
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* <div className="selected-company">{selectedCompany}</div> */}
            <ul className="company-inputs">{renderCompanyInputs()}</ul>
            <div className="flex justify-center items-center">
              <button
                className="relative px-20 py-3 overflow-hidden font-medium text-gray-600 bg-gray-100 border border-gray-300 rounded-md mt-3 shadow-inner group text-center"
                type="submit"
              >
                <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
                <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
                <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
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