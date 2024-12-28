import React from 'react'
import BlockUnblock from './BlockUnblock'
import PermissionModal from './PermissionModal'
import AddProject from './AddProject'
import DeleteProject from './DeleteProject'
import ProjectStatusModal from './ProjectStatusModal'
import EditProjctModal from './EditProjctModal'
import RemoveMember from './RemoveMember'
import AddTask from './AddTask'
import TaskDeleteModal from './TaskDeleteModal'
import EditTask from './EditTask'

const ModalManager = ({userdata,modaltype,isModal}) => {
   console.log('yes working modal manager')
  switch (modaltype){
    case 'blockunblock':
        return (< BlockUnblock userdata={userdata} isModal={isModal} isOpen={modaltype === 'blockunblock'} />)

    case 'permission':
        return (< PermissionModal userdata={userdata} isModal={isModal} isOpen={modaltype === 'permission'} />)

    case 'addproject':
        return ( <AddProject isModal={isModal} isOpen={modaltype === 'addproject'} />)

    case 'deleteproject':
        return (<DeleteProject projectdata={userdata} isModal={isModal} isOpen={modaltype === 'deleteproject'} />)

    case "statusmanagement":
        return (<ProjectStatusModal projectdata={userdata} isModal={isModal} isOpen={modaltype === 'statusmanagement'} />)

    case 'editproject':
        return (<EditProjctModal projectdata={userdata} isModal={isModal} isOpen={modaltype === 'editproject'} />) 
    
    case "remove member":
        return (<RemoveMember projectdata={userdata} isModal={isModal} isOpen={modaltype === "remove member"}  />)
    
    case "add task":
        return (<AddTask projectdata={userdata} isModal={isModal} isOpen={modaltype === "add task"} />)

    case "Task_Delete" : 
       return (<TaskDeleteModal  Taskdata={userdata} isModal={isModal} isOpen={modaltype === "Task_Delete"}/>)

    case "Task_Edit":
        return (<EditTask Task_data={userdata} isModal={isModal} isOpen={modaltype === "Task_Edit"}/>)
    
    default: 
       return null
  }
}

export default ModalManager