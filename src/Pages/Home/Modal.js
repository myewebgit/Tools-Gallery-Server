import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebasse.init";
import { toast } from 'react-toastify';

const Modal = ({ orders, setOrders}) => {
  const {_id, name, moq, img, available, price } = orders;
  const [user, loading, error] = useAuthState(auth);

  const total = parseInt(moq*price );
  
 
  

 
  const handleBooking =event =>{
    
  
const booking = {
  
 orderId: _id,
 order:name,
 quantity:moq,
 available:available,
 price:price,
 total:total,
 amount:parseInt
 (event.target.OrderUnit.value*price),
 client:user.email,
 clientName: user.displayName,
 phone: event.target.phone.value,
 orQty:event.target.OrderUnit.value
}

fetch('http://localhost:5000/booking',{
  method: 'POST',
  headers:{
    'content-type': 'application/json'
  },
  body: JSON.stringify(booking)

})
.then(res => res.json())
.then(data => {
  console.log(data);
  if(data.success){
    toast(`Order is placed successfully, ${name} of ${moq}`)
  }
  else{
    toast(`Order is not placed successfully, ${name} of ${moq}`)
  }
  setOrders(null);

})


  }

 
  return (
    <div>

      <input type="checkbox" id="booking-modal" class="modal-toggle" />
      <div class="modal modal-bottom sm:modal-middle ">
        <div class="modal-box ">
          <label for="booking-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
         
         
        <div className="flex justify-center">
        <img className="h-24 w-24 " src={img} alt="" />
         <div className="">
          <h3 class="font-bold text-lg ">{name}</h3>
          <h3 class="font-bold text-sm">Unit Price:{price}</h3>
          <h3 class="font-bold text-sm">Min Order Qty:{moq}</h3>
          <h3 class="font-bold text-sm">Available Qty:{available}</h3>
         </div>
        </div>
          <form  onSubmit={handleBooking }  className="grid grid-cols-1 gap-2 justify-items-center mt-2 ">
          
          <input type="text" name="name" disabled value={user?.displayName || ''} className="input input-bordered w-full max-w-xs" />
                        <input type="email" name="email" disabled value={user?.email || ''} className="input input-bordered w-full max-w-xs" />
                        <input type="text" name="phone" placeholder="Phone Number" className="input input-bordered w-full max-w-xs" />
           
            <input type="text" placeholder={name} class="input input-bordered w-full max-w-xs" />
            
            <input type="number" name="OrderUnit"  placeholder="Order Quantity" class="input input-bordered w-full max-w-xs" />
            <label class="label">
    <span class="label-text-alt">Alt label</span>
    <span class="label-text-alt">Alt label</span>
  </label>
            <input  type="Submit" placeholder="Order" class="btn btn-secondery w-full max-w-xs" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
