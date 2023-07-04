"use client"
import React, { useState } from "react";
import { AiOutlinePlusCircle } from 'react-icons/ai';
import Modal from "@/components/modal/modal";
import CreateCompany from "@/components/create_company/create_company";

const StarterPage = () => {
  const [openModal, setOpenModal] = useState(false);


  return <>
    <div className="flex justify-between items-center">
      <p className="text-xl font-semibold">Dashboard</p>
      <button 
      data-modal-target="defaultModal" data-modal-toggle="defaultModal" className="flex justify-center items-center mr-4 bg-secondary-500 px-4 py-2 rounded-md" type="button"
      onClick={() => setOpenModal(true)}
      style={{
        backgroundImage: `url(assets/images/all-img/widget-bg-1.png)`
      }
    }>
        <p className="text-xl font-bold mr-2"><AiOutlinePlusCircle /></p>
        <p className="text-xl font-semibold">Create a new company</p>
      </button>

    </div>
    <div>
      <Modal 
      isVisible={openModal}
      onClose= {()=>{setOpenModal(false)}}
      >
        <p className=' p-2 text-blue-700 text-semibold rounded text-md mb-5'>Create your new company</p>
      <CreateCompany/>
      </Modal>
    </div>
  </>
};

export default StarterPage;
