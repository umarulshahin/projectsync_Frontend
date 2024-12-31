import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useSelector } from 'react-redux';
import useBase from '../Hooks/useBase';

const NewMember = ({role = null, member,isOpen}) => {
  const [selectedMembers, setSelectedMembers] = useState([]);
  const {Get_Employee,AddNewMember } = useBase()
  const employee = useSelector((state)=> state.userdata.employees)
  
//   Format available employees for the select options
  const formatEmployeeOptions = () =>
    
    employee && employee.filter((employee) =>  !member.some((mem)=>mem.employee.id === employee.id))
      .map((employee)=>({
        value: employee.id,
        label: employee.username,
      
    }));

  useEffect(()=>{
    Get_Employee(role)
  },[])
  
  const handleAddMembers = () => {
        
         if(selectedMembers.length > 0){
                AddNewMember(role,{members:selectedMembers,project_id:member[0].project})
         }
         isOpen(false)
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-lg font-bold mb-4">Add New Team Members</h2>
      <Select
        options={formatEmployeeOptions()}
        isMulti
        name="team"
        value={selectedMembers}
        onChange={(selectedOptions) => setSelectedMembers(selectedOptions)}
        placeholder="Select team members "
        className="w-full mb-4 border border-stone-300 focus:border-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-400"
      />
      <button
        onClick={handleAddMembers}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Add Members
      </button>
    </div>
  );
};

export default NewMember;
