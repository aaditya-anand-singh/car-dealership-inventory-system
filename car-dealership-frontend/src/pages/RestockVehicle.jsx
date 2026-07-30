import {useState} from "react";
import {useParams,useNavigate} from "react-router-dom";

import api from "../api/axios";

import Navbar from "../components/Navbar";



function RestockVehicle(){


const {id}=useParams();


const navigate=useNavigate();



const [quantity,setQuantity]=useState("");









const handleSubmit=async(e)=>{


e.preventDefault();



try{


await api.post(

`/vehicles/${id}/restock`,

{
    quantity:Number(quantity)
}

);




alert("Vehicle restocked successfully");



navigate("/admin");



}
catch(error){


console.log(error);



alert(

error.response?.data?.message ||

"Restock failed"

);


}


};









return (

<>

<Navbar/>




<div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-blue-950 p-8 text-white">






<div className="max-w-xl mx-auto">





<h1 className="text-5xl font-extrabold mb-10">

📦 Restock Vehicle

</h1>







<form


onSubmit={handleSubmit}


className="

bg-white/10

backdrop-blur-xl

border

border-white/10

rounded-3xl

p-8

shadow-2xl

"


>







<label className="text-gray-300">

Enter Quantity

</label>






<input


type="number"


placeholder="Add stock quantity"


value={quantity}


onChange={(e)=>setQuantity(e.target.value)}


className="

mt-3

w-full

bg-slate-900/70

border

border-white/20

text-white

placeholder-gray-400

p-4

rounded-xl

outline-none

focus:ring-2

focus:ring-yellow-500

"


/>









<button


type="submit"


className="

mt-6

w-full

bg-yellow-500

hover:bg-yellow-600

text-black

py-4

rounded-xl

font-bold

text-lg

transition

duration-300

shadow-lg

hover:shadow-yellow-500/40

"


>

Restock Vehicle

</button>







</form>





</div>





</div>


</>


);


}


export default RestockVehicle;