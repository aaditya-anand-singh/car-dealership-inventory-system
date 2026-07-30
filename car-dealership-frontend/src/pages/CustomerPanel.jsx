import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";

import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";



function CustomerPanel(){


    const navigate = useNavigate();



    const [vehicles,setVehicles] = useState([]);

    const [currentPage,setCurrentPage] = useState(1);

    const [totalPages,setTotalPages] = useState(1);

    const [isSearching,setIsSearching] = useState(false);









    useEffect(()=>{


        if(!isSearching){

            fetchVehicles();

        }


    },[currentPage,isSearching]);









    const fetchVehicles = async()=>{


        try{


            const response = await api.get(

                `/vehicles?page=${currentPage}&limit=6`

            );



            setVehicles(response.data);



            setTotalPages(

                Number(

                    response.headers["x-total-pages"]

                ) || 1

            );


        }
        catch(error){


            console.log(

                error.response?.data ||

                error.message

            );


        }


    };









    const handleSearch = async(filters)=>{


        try{


            const hasFilter =

                filters.keyword ||

                filters.fuelType ||

                filters.transmission ||

                filters.minPrice ||

                filters.maxPrice;






            if(!hasFilter){


                setIsSearching(false);

                setCurrentPage(1);

                fetchVehicles();

                return;

            }






            setIsSearching(true);







            const response = await api.get(

                "/vehicles/search",

                {

                    params:filters

                }

            );





            setVehicles(response.data);

            setTotalPages(1);



        }
        catch(error){


            console.log(

                error.response?.data ||

                error.message

            );


        }


    };









    const purchaseVehicle = async(id)=>{


        try{


            const response = await api.post(

                `/vehicles/${id}/purchase`

            );



            alert(response.data.message);



            fetchVehicles();



        }
        catch(error){


            alert(

                error.response?.data?.message ||

                "Purchase failed"

            );


        }


    };









    const changePage=(page)=>{


        setCurrentPage(page);



        window.scrollTo({

            top:0,

            behavior:"smooth"

        });


    };









return (

<>

<Navbar/>





<div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-blue-950 p-8 text-white">








<div className="mb-10">


<h1 className="text-5xl font-extrabold">

Customer Dashboard 🚗

</h1>


<p className="text-gray-300 mt-3">

Find your dream vehicle from our premium collection

</p>


</div>









<SearchBar

onSearch={handleSearch}

/>









<div className="flex items-center justify-between mb-6">


<h2 className="text-3xl font-bold">

Available Vehicles

</h2>



<span className="text-blue-400">

{vehicles.length} Cars

</span>



</div>









<div className="grid grid-cols-1 md:grid-cols-3 gap-8">



{

vehicles.length > 0 ?


vehicles.map((vehicle)=>(





<div

key={vehicle.id}

className="

bg-white/10

backdrop-blur-xl

border

border-white/10

rounded-3xl

p-6

shadow-xl

hover:-translate-y-2

transition

duration-300

"

>








<div className="mb-5">


<h3 className="text-3xl font-bold">

{vehicle.brand}

</h3>


<p className="text-xl text-blue-400">

{vehicle.model}

</p>


</div>








<div className="space-y-2 text-gray-300">


<p>

📅 Year: {vehicle.year}

</p>


<p className="text-white font-bold text-lg">

💰 ₹{vehicle.price}

</p>


<p>

🎨 Color: {vehicle.color}

</p>


<p>

⛽ Fuel: {vehicle.fuelType}

</p>


<p>

⚙ Transmission: {vehicle.transmission}

</p>


<p className="text-white font-bold">

📦 Stock: {vehicle.stock}

</p>



</div>









<div className="flex gap-3 mt-6 flex-wrap">





<button


onClick={()=>navigate(`/vehicle/${vehicle.id}`)}


className="

bg-purple-600

hover:bg-purple-700

px-4

py-2

rounded-xl

font-semibold

transition

"


>

View Details

</button>









<button


onClick={()=>purchaseVehicle(vehicle.id)}


className="

bg-blue-600

hover:bg-blue-700

px-4

py-2

rounded-xl

font-semibold

transition

"


>

Buy Vehicle

</button>







</div>







</div>





))


:

<p>

No vehicles available

</p>


}



</div>









{

!isSearching &&


<Pagination

currentPage={currentPage}

totalPages={totalPages}

onPageChange={changePage}

/>


}







</div>


</>


);


}


export default CustomerPanel;