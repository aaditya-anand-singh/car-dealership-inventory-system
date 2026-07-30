import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";

import Navbar from "../components/Navbar";



function AddVehicle(){


    const navigate = useNavigate();



    const [formData,setFormData] = useState({

        brand:"",
        model:"",
        year:"",
        price:"",
        color:"",
        fuelType:"",
        transmission:"",
        stock:""

    });







    const handleChange=(e)=>{


        setFormData({

            ...formData,

            [e.target.name]:e.target.value

        });


    };









    const handleSubmit=async(e)=>{


        e.preventDefault();



        try{


            const response = await api.post(

                "/vehicles",

                formData,

                {
                    headers:{
                        Authorization:
                        `Bearer ${localStorage.getItem("token")}`
                    }
                }

            );



            alert(response.data.message);



            navigate("/admin");



        }
        catch(error){


            alert(

                error.response?.data?.message ||

                "Vehicle add failed"

            );


        }


    };









return(

<>

<Navbar/>




<div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-blue-950 p-8 text-white">





<h1 className="text-5xl font-extrabold mb-10">

➕ Add New Vehicle

</h1>








<form


onSubmit={handleSubmit}


className="

max-w-5xl

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








<input

name="brand"

placeholder="Brand"

value={formData.brand}

onChange={handleChange}

className="

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








<input

name="model"

placeholder="Model"

value={formData.model}

onChange={handleChange}

className="

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








<input

name="year"

placeholder="Manufacturing Year"

type="number"

value={formData.year}

onChange={handleChange}

className="

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








<input

name="price"

placeholder="Price"

type="number"

value={formData.price}

onChange={handleChange}

className="

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








<input

name="color"

placeholder="Color"

value={formData.color}

onChange={handleChange}

className="

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









<select

name="fuelType"

value={formData.fuelType}

onChange={handleChange}

className="

bg-slate-900/70

border

border-white/20

text-white

p-4

rounded-xl

outline-none

focus:ring-2

focus:ring-blue-500

"

>


<option value="">

Select Fuel Type

</option>


<option value="Petrol">

Petrol

</option>


<option value="Diesel">

Diesel

</option>


<option value="Electric">

Electric

</option>


</select>









<select

name="transmission"

value={formData.transmission}

onChange={handleChange}

className="

bg-slate-900/70

border

border-white/20

text-white

p-4

rounded-xl

outline-none

focus:ring-2

focus:ring-blue-500

"

>


<option value="">

Select Transmission

</option>


<option value="Manual">

Manual

</option>


<option value="Automatic">

Automatic

</option>


</select>









<input

name="stock"

placeholder="Available Stock"

type="number"

value={formData.stock}

onChange={handleChange}

className="

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









<button


type="submit"


className="

md:col-span-2

bg-blue-600

hover:bg-blue-700

transition

duration-300

py-4

rounded-xl

font-bold

text-lg

shadow-lg

hover:shadow-blue-500/40

"


>

Add Vehicle

</button>








</form>





</div>


</>


);


}


export default AddVehicle;