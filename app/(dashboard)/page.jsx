"use client"
import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Modal from "@/components/modal/modal";
import CreateCompany from "@/components/create_company/create_company";
import axios from "axios";
import Loading from "../loading";
import moment from 'moment';
import Link from "next/link";
import CompanyDetails from "./read_company/[read_company]/page";
import { useAuth } from "@/hooks/useAuth";


const StarterPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openSeconModal, setOpenSeconModal] = useState(false);
  const [createdCompany, setCreatedCompany] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCompany, setSelectedCompany] = useState(null);


  const { user } = useAuth()
  // const userID = user?.created_by
  // get all created companies
  // useEffect(() => {
  //   fetchCompanies(userID);
  // }, [userID]);

  const fetchCompanies = async () => {
    try {
      // const response = await axios.get(
      //   `https://hr-management-1wt7.onrender.com/api/v1/fetch_companies/${userID}`
      // );
      // setCreatedCompany(response?.data?.data);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching companies:", error);
      setLoading(false);
    }
  };

  const handleFormSubmit = async () => {
    await fetchCompanies();
  };


  const handleCompanyDetails = (company) => {
    setSelectedCompany(company);
    setOpenSeconModal(true);
  };
  console.log(createdCompany)
  return (
    <>
      <div className="flex justify-between items-center">
        <p className="text-xl font-semibold">Dashboard</p>
      {/* create company button */}
      <button
          data-modal-target="defaultModal" data-modal-toggle="defaultModal" className="flex justify-center items-center mr-4 bg-secondary-500 px-4 p-2 rounded-md" type="button"
          onClick={() => setOpenModal(true)}
          style={{
            backgroundImage: `url(assets/images/all-img/widget-bg-1.png)`
          }}
        >
          <p className="text-xl font-bold mr-2"><AiOutlinePlusCircle /></p>
          <p className="text-xl font-semibold">Create a new company</p>
        </button>
      </div>

      <div>
        <div className="grid grid-cols-3 gap-7 pt-8 m-3">
          {
          // loading ? (
          //   <div className="ml-20"><Loading /></div>
          // ) : (
            // createdCompany?.map((company, id) => (
              <>
                {/* <div
                  key={id}
                  className="bg-no-repeat bg-cover bg-center p-4 rounded-[6px] relative shadow-[0_0_9px_theme('colors.gray.700')] "
                  style={{
                    backgroundImage: `url(/assets/images/all-img/widget-bg-1.png)`,
                  }}
                >
                  <div className="flex justify-between">

                    <div className="max-w-[169px] ">
                      <div className="text-xl font-medium text-slate-900 mb-2">
                        {company.legal_name}
                      </div>
                      <p className="text-sm text-slate-800">{company?.company_type}</p>
                      <p className="text-sm text-slate-800">Date: {moment(company?.createdAt).format('DD-MM-YYYY')}</p>
                    </div>
                    <div className="float-right mt-0" >

                      <p
                        className="flex justify-center items-center  rounded-md"
                        
                        onClick={() => handleCompanyDetails(company)}>
                        <BsThreeDotsVertical />
                      </p>
                    </div>
                  </div>
                  
                  <Modal

                    isVisible={openSeconModal}
                    onClose={() => { setOpenSeconModal(false) }}
                  >

                    {selectedCompany && (
                      <CompanyDetails
                        loading={loading}
                        company={selectedCompany}
                      />
                    )}

                  </Modal>
                </div> */}
              </>
            // ))
          }
          <div
                  className="bg-no-repeat bg-cover bg-center p-4 rounded-[6px] relative shadow-[0_0_9px_theme('colors.gray.700')] "
                >
                  <div className="flex justify-between">

                    <div className="max-w-[169px] ">
                      <div className="text-xl font-medium text-slate-900 mb-2">
                        Apex
                      </div>
                      <p className="text-sm text-slate-800">Sole Trder</p>
                      <p className="text-sm text-slate-800">Date: </p>
                    </div>
                    <div className="float-right mt-0" >

                      <p
                        className="flex justify-center items-center  rounded-md"
                        // onClick={() => setOpenSeconModal(true)}
                        onClick={() => handleCompanyDetails()}>
                        <BsThreeDotsVertical />
                      </p>
                    </div>
                  </div>
                  {/* show company details modal  */}
                  <Modal

                    isVisible={openSeconModal}
                    onClose={() => { setOpenSeconModal(false) }}
                  >

                    {selectedCompany && (
                      <CompanyDetails
                        loading={loading}
                        company={selectedCompany}
                      />
                    )}

                  </Modal>
                </div>
        </div>

       
        <Modal
          isVisible={openModal}
          onClose={() => { setOpenModal(false) }}
        >
          <p className=' pb-2 text-blue-700 text-semibold rounded text-lg mb-5'>Create new company</p>
          <CreateCompany setOpenModal={setOpenModal} onFormSubmit={handleFormSubmit} />
        </Modal>
      </div>

    </>
  );
};

export default StarterPage;
