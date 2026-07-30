import {useState,useEffect} from "react";
import {useParams,useNavigate} from "react-router-dom";

import api from "../api/axios";

import Navbar from "../components/Navbar";



function UpdateVehicle(){


const {id}=useParams();

const navigate=useNavigate();




const [vehicle,setVehicle]=useState({

brand:"",
model:"",
year:"",
price:"",
color:"",
fuelType:"",
transmission:"",
stock:""

});






useEffect(()=>{


fetchVehicle();


},[id]);









const fetchVehicle=async()=>{


try{


const response = await api.get(

"/vehicles?page=1&limit=100",

{

headers:{

Authorization:

`Bearer ${localStorage.getItem("token")}`

}

}

);





const foundVehicle = response.data.find(

(vehicle)=>vehicle.id === Number(id)

);





if(foundVehicle){

setVehicle(foundVehicle);

}

else{

alert("Vehicle not found");

navigate("/admin");

}



}

catch(error){


console.log(

error.response?.data ||

error.message

);


}


};









const handleChange=(e)=>{


setVehicle({

...vehicle,

[e.target.name]:e.target.value

});


};









const updateVehicle=async(e)=>{


e.preventDefault();



try{


await api.put(

`/vehicles/${id}`,

{

brand:vehicle.brand,

model:vehicle.model,

year:Number(vehicle.year),

price:Number(vehicle.price),

color:vehicle.color,

fuelType:vehicle.fuelType,

transmission:vehicle.transmission,

stock:Number(vehicle.stock)

},

{

headers:{

Authorization:

`Bearer ${localStorage.getItem("token")}`

}

}

);





alert("Vehicle Updated Successfully");


navigate("/admin");



}

catch(error){


console.log(

error.response?.data ||

error.message

);


alert(

error.response?.data?.message ||

"Update failed"

);


}


};









return(


<>

<Navbar/>




<div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-blue-950 p-8 text-white">





<h1 className="text-5xl font-extrabold mb-10">

✏️ Update Vehicle

</h1>









<form


onSubmit={updateVehicle}


className="

max-w-3xl

bg-white/10

backdrop-blur-xl

border

border-white/10

rounded-3xl

p-8

grid

grid-cols-1

md:grid-cols-2

gap-6

shadow-2xl

"


>








{

Object.keys(vehicle).map((field)=>(



<div key={field}>


<label className="text-gray-300 capitalize">

{field}

</label>




<input


name={field}


value={vehicle[field] || ""}


onChange={handleChange}


placeholder={field}


className="

mt-2

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

focus:ring-blue-500

"


/>



</div>



))


}









<button


type="submit"


className="

md:col-span-2

bg-green-600

hover:bg-green-700

transition

duration-300

py-4

rounded-xl

font-bold

text-lg

shadow-lg

hover:shadow-green-500/40

"


>

Update Vehicle

</button>









</form>







</div>


</>


);


}


export default UpdateVehicle;