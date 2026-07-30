import {useParams,useNavigate} from "react-router-dom";

import api from "../api/axios";

import Navbar from "../components/Navbar";



function DeleteVehicle(){


const {id}=useParams();


const navigate=useNavigate();









const handleDelete=async()=>{


try{


await api.delete(

`/vehicles/${id}`

);




alert("Vehicle deleted successfully");



navigate("/admin");



}
catch(error){


console.log(error);



alert(

error.response?.data?.message ||

"Delete failed"

);


}


};









return (

<>

<Navbar/>




<div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-blue-950 p-8 text-white">







<div className="max-w-xl mx-auto">





<h1 className="text-5xl font-extrabold mb-10">

🗑 Delete Vehicle

</h1>







<div

className="

bg-white/10

backdrop-blur-xl

border

border-red-500/20

rounded-3xl

p-8

shadow-2xl

"


>








<div className="text-center mb-8">


<div className="text-6xl mb-5">

⚠️

</div>



<h2 className="text-2xl font-bold">

Confirm Delete

</h2>



<p className="text-gray-300 mt-3">

Are you sure you want to remove this vehicle from inventory?

</p>


</div>









<div className="flex gap-4">





<button


onClick={handleDelete}


className="

flex-1

bg-red-600

hover:bg-red-700

py-3

rounded-xl

font-bold

transition

duration-300

shadow-lg

hover:shadow-red-500/40

"


>

Delete

</button>








<button


onClick={()=>navigate("/admin")}


className="

flex-1

bg-gray-700

hover:bg-gray-600

py-3

rounded-xl

font-bold

transition

duration-300

"


>

Cancel

</button>







</div>








</div>






</div>







</div>


</>


);


}


export default DeleteVehicle;