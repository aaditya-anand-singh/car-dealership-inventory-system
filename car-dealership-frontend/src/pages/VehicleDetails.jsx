import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../api/axios";

import Navbar from "../components/Navbar";



function VehicleDetails(){


    const {id} = useParams();


    const [vehicle,setVehicle] = useState(null);








    useEffect(()=>{


        fetchVehicle();


    },[]);









    const fetchVehicle = async()=>{


        try{


            const response = await api.get(

                "/vehicles?page=1&limit=100"

            );



            const foundVehicle = response.data.find(

                (vehicle)=>

                vehicle.id === Number(id)

            );



            setVehicle(foundVehicle);



        }
        catch(error){


            console.log(

                error.response?.data ||

                error.message

            );


        }


    };









    const purchaseVehicle = async()=>{


        try{


            const response = await api.post(

                `/vehicles/${id}/purchase`

            );



            alert(response.data.message);



            fetchVehicle();



        }
        catch(error){


            alert(

                error.response?.data?.message ||

                "Purchase failed"

            );


        }


    };









    if(!vehicle){


        return(

            <>

            <Navbar/>


            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-blue-950 text-white p-10">


                <h1 className="text-3xl font-bold">

                    Loading Vehicle...

                </h1>


            </div>


            </>

        );


    }









return (

<>

<Navbar/>




<div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-blue-950 p-8 text-white">





<div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">






{/* Vehicle Preview */}


<div className="

bg-white/10

backdrop-blur-xl

border

border-white/10

rounded-3xl

p-8

shadow-2xl

flex

items-center

justify-center

"


>


<div className="text-center">


<div className="text-8xl mb-6">

🚗

</div>



<h1 className="text-4xl font-extrabold">

{vehicle.brand}

</h1>


<p className="text-2xl text-blue-400 font-bold">

{vehicle.model}

</p>



</div>



</div>









{/* Details */}


<div className="

bg-white/10

backdrop-blur-xl

border

border-white/10

rounded-3xl

p-8

shadow-2xl

"

>



<h1 className="text-4xl font-extrabold mb-6">

{vehicle.brand} {vehicle.model}

</h1>






<p className="text-3xl font-bold text-blue-400 mb-8">

₹ {vehicle.price}

</p>








<div className="space-y-4 text-gray-200">



<div className="flex justify-between border-b border-white/10 pb-2">

<span>

Year

</span>

<strong>

{vehicle.year}

</strong>

</div>





<div className="flex justify-between border-b border-white/10 pb-2">

<span>

Color

</span>

<strong>

{vehicle.color}

</strong>

</div>





<div className="flex justify-between border-b border-white/10 pb-2">

<span>

Fuel

</span>

<strong>

{vehicle.fuelType}

</strong>

</div>





<div className="flex justify-between border-b border-white/10 pb-2">

<span>

Transmission

</span>

<strong>

{vehicle.transmission}

</strong>

</div>





<div className="flex justify-between pb-2">

<span>

Available Stock

</span>


<strong>

{vehicle.stock}

</strong>


</div>




</div>









<button


onClick={purchaseVehicle}


disabled={vehicle.stock <= 0}



className="

mt-8

w-full

py-4

rounded-xl

font-bold

text-lg

bg-blue-600

hover:bg-blue-700

disabled:bg-gray-500

transition

duration-300

shadow-lg

hover:shadow-blue-500/40

"


>


{

vehicle.stock > 0

?

"Buy Now"

:

"Out of Stock"

}



</button>







</div>








</div>






</div>


</>


);


}


export default VehicleDetails;