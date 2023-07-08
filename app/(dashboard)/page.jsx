"use client"
import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from 'react-icons/ai';
import Modal from "@/components/modal/modal";
import CreateCompany from "@/components/create_company/create_company";
import axios from "axios";
import Loading from "../loading";
import Card from "@/components/ui/Card";
import moment from 'moment';
import Link from "next/link";


const StarterPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [createdCompany, setCreatedCompany] = useState([]);
  const [loading, setLoading] = useState(true);

  // get all created companies
  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await axios.get(
        "https://hr-management-1wt7.onrender.com/api/v1/fetch_companies/a74c1d90-3b62-49e3-93ff-7090145b98d2"
      );
      setCreatedCompany(response?.data?.data);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching companies:", error);
      setLoading(false);
    }
  };
  console.log(createdCompany)

  const handleFormSubmit = async () => {
    await fetchCompanies();
  };

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
          {loading ? (
            <div className="ml-20"><Loading/></div>
          ) : (
            createdCompany.map((company, id) => (
              <>
                <div
                key={id}
                  className="bg-no-repeat bg-cover bg-center p-4 rounded-[6px] relative shadow-[0_0_5px_theme('colors.blue.700')]"
                  style={{
                    backgroundImage: `url(/assets/images/all-img/widget-bg-1.png)`,
                  }}
                >
                  <div className="max-w-[169px] ">
                    <div className="text-xl font-medium text-slate-900 mb-2">
                      {company.legal_name}
                    </div>
                    <p className="text-sm text-slate-800">{company?.company_type}</p>
                    <p className="text-sm text-slate-800">Date: {moment(company?.createdAt).format('DD-MM-YYYY')}</p>
                  </div>
                  <div className="absolute top-1/2 -translate-y-1/2 ltr:right-6 rtl:left-6 mt-2 h-12 w-12 bg-white text-slate-900 rounded-full text-sm font-medium flex flex-col items-center justify-center">
                    <Link href={`/read_company/${company.id}`} ><p>More</p></Link>
                  </div>
                </div>
              </>
            ))
          )}
        </div>

        <Card/>
        {/* create new company modal here */}
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
