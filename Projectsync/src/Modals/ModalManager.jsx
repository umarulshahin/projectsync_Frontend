import React from 'react'
import BlockUnblock from './BlockUnblock'
import PermissionModal from './PermissionModal'
import AddProject from './AddProject'

const ModalManager = ({userdata,modaltype,isModal}) => {
   console.log('yes working modal manager')
  switch (modaltype){
    case 'blockunblock':
        return (< BlockUnblock userdata={userdata} isModal={isModal} isOpen={modaltype === 'blockunblock'} />)

    case 'permission':
        return (< PermissionModal userdata={userdata} isModal={isModal} isOpen={modaltype === 'permission'} />)

    case 'addproject':
        return ( <AddProject isModal={isModal} isOpen={modaltype === 'addproject'} />)
    
    default: 
       return null
  }
}

export default ModalManager