import {toast} from 'react-toastify';

export const handleSuccess=(msg)=>{
    toast.success(msg,{
        postion:'top-right'
    })
}

export const handleError=(msg)=>{
    toast.error(msg,{
        postion:'top-right'
    })
}