import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useUser from "../Hooks/useUser";
import { PlusCircleIcon } from "@heroicons/react/solid";import ModalManager from "../Modals/ModalManager";
const User_Dashboard = () => {
  const Userdetails = useSelector((state) => state.userdata.userDetails);
  const Userdata = useSelector((state) => state.userdata.userdata);
  const [Modal , setModal] = useState(false)

  const { is_permission } = Userdetails || {};

  const { Get_User } = useUser();
  useEffect(() => {
    if (Userdata) {
      Get_User(Userdata.user_id);
    }
  }, []);

  const handleAddproject=()=>{
     setModal('addproject')
  }
  return (
    <div className="text-black min-h-screen bg-stone-300">
      {is_permission && (
        <div className="flex p-10 justify-end ">
          {" "}
          <button onClick={handleAddproject} className="py-2 px-4 flex items-center  bg-orange-400 font-semibold rounded-lg text-white hover:bg-orange-500 ">
            {" "}
            < PlusCircleIcon className="pr-1 h-5 md:pr-2" /> Add New Project
          </button>
        </div>
      )}
      <div className="flex justify-center items-center">  
         {Modal && 
      <ModalManager 
      userdata={null}
      modaltype={Modal}
      isModal={setModal}

      />}

      </div>
   
    </div>
  );
};

export default User_Dashboard;
