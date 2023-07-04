"use client"
import React, { useState } from "react";
import { AiOutlinePlusCircle } from 'react-icons/ai';
import Modal from "@/components/modal/modal";
import CreateCompany from "@/components/create_company/create_company";
import ImageBlock1 from "@/components/partials/widget/block/image-block-1";
import ImageBlock2 from "@/components/partials/widget/block/image-block-2";

const StarterPage = () => {
  const [openModal, setOpenModal] = useState(false);


  return <>
    <div className="flex justify-between items-center">
      <p className="text-xl font-semibold">Dashboard</p>
      {/* create company button  */}
      <button 
      data-modal-target="defaultModal" data-modal-toggle="defaultModal" className="flex justify-center items-center mr-4 bg-secondary-500 px-4 p-2 rounded-md" type="button"
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
    
      <div className="grid grid-cols-3 gap-3 pt-8 m-3">
      <ImageBlock1/>
      <ImageBlock2/>
      <ImageBlock1/>
      <ImageBlock1/>
      <ImageBlock2/>
      <ImageBlock1/>
      </div>
        {/* create new company modal here */}
        <Modal 
      isVisible={openModal}
      onClose= {()=>{setOpenModal(false)}}
      >
        <p className=' pb-2 text-blue-700 text-semibold rounded text-lg mb-5'>Create new company</p>
      <CreateCompany/>
      </Modal>
    </div>
  </>
};

export default StarterPage;
