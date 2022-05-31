import { useReducer } from 'react'

const modalModes = {
  OPEN: "OPEN",
  CLOSE: "CLOSE",
  EDIT: "EDIT"
}

export const useModal = () => {
    const modalReducer = (state, action) => {
        switch (action.type) {
          case modalModes.OPEN: return {open:true, data:action.data}
          case modalModes.CLOSE: return {open:false, data:action.data}
          case modalModes.EDIT: return {open:true, edit:true, data:action.data}
          default: return {open:false}
        }
      }
    
    const [modal, dispatchModal] = useReducer(modalReducer, {open:false})

    return [modal, dispatchModal, modalModes]
}