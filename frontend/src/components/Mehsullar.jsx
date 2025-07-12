import React, { useEffect } from 'react'
import Mehsul from './Mehsul'
import { useGetProductsQuery } from '../redux/api/productsApi'
import toast from 'react-hot-toast'

const Mehsullar = () => {
  

  const {data,isLoading,error,isError} = useGetProductsQuery()
  useEffect(()=> {
    if(isError) {
        console.log(error)
       
        toast.error(error?.data || "Serverde xeta var")
    }
}, [isError])
  return (
    <div className='products container py-5 mx-auto gap-4  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 '>
      {
        data?.products?.map(birProduct=>(
          <Mehsul key={birProduct._id} mehsulunId={birProduct._id} mehsulAdiProps = {birProduct.name} mehsulQiymetiProps={birProduct.price} mehsulShekliProps={birProduct.images[0]} />
        ))
       
        
      }
    </div>
  )
}

export default Mehsullar