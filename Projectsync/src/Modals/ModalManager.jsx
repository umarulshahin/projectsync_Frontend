import React from 'react'
import BlockUnblock from './BlockUnblock'

const ModalManager = ({userdata,modaltype,isModal}) => {
   
  switch (modaltype){
    case 'blockunblock':
        return (< BlockUnblock userdata={userdata} isModal={isModal} isopen={modaltype === 'blockunblock'} />)
    
    default: 
       return null
  }
}

export default ModalManager