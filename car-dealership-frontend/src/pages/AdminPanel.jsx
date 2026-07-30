import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";

import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import Navbar from "../components/Navbar";



function AdminPanel(){


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









    const changePage=(page)=>{


        setCurrentPage(page);



        window.scrollTo({

            top:0,

            behavior:"smooth"

        });


    };









    const handleUpdate=(id)=>{

        navigate(`/admin/update/${id}`);

    };






    const handleRestock=(id)=>{

        navigate(`/admin/restock/${id}`);

    };






    const handleDelete=(id)=>{

        navigate(`/admin/delete/${id}`);

    };









return (

<>

<Navbar/>




<div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-blue-950 p-8 text-white">





<h1 className="text-5xl font-extrabold mb-10">

Admin Dashboard 🚘

</h1>









<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">






<div className="

bg-white/10

backdrop-blur-xl

border

border-white/10

rounded-2xl

p-6

shadow-xl

hover:scale-105

transition

">


<h2 className="text-xl font-bold">

➕ Add Vehicle

</h2>



<p className="text-gray-300 mt-2">

Add new vehicles to inventory

</p>




<button


onClick={()=>navigate("/admin/add-vehicle")}


className="

mt-5

bg-blue-600

hover:bg-blue-700

px-5

py-2

rounded-xl

font-semibold

transition

"


>

Add Vehicle

</button>


</div>








<div className="

bg-white/10

backdrop-blur-xl

border

border-white/10

rounded-2xl

p-6

shadow-xl

hover:scale-105

transition

">


<h2 className="text-xl font-bold">

📦 Restock Vehicle

</h2>


<p className="text-gray-300 mt-2">

Increase available stock

</p>


</div>









<div className="

bg-white/10

backdrop-blur-xl

border

border-white/10

rounded-2xl

p-6

shadow-xl

hover:scale-105

transition

">


<h2 className="text-xl font-bold">

🗑 Delete Vehicle

</h2>


<p className="text-gray-300 mt-2">

Remove vehicle from inventory

</p>


</div>






</div>









<SearchBar

onSearch={handleSearch}

/>









<h2 className="text-3xl font-bold mb-6">

Vehicle Inventory

</h2>









<div className="grid grid-cols-1 md:grid-cols-3 gap-7">



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

rounded-2xl

p-6

shadow-xl

hover:-translate-y-2

transition

duration-300

"

>






<h3 className="text-2xl font-bold">

{vehicle.brand} {vehicle.model}

</h3>







<div className="mt-4 space-y-2 text-gray-300">


<p>

📅 Year: {vehicle.year}

</p>


<p>

💰 Price: ₹{vehicle.price}

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


onClick={()=>handleUpdate(vehicle.id)}


className="

bg-green-600

hover:bg-green-700

px-4

py-2

rounded-xl

font-semibold

transition

"


>

Update

</button>







<button


onClick={()=>handleRestock(vehicle.id)}


className="

bg-yellow-500

hover:bg-yellow-600

text-black

px-4

py-2

rounded-xl

font-semibold

transition

"


>

Restock

</button>







<button


onClick={()=>handleDelete(vehicle.id)}


className="

bg-red-600

hover:bg-red-700

px-4

py-2

rounded-xl

font-semibold

transition

"


>

Delete

</button>







</div>







</div>





))


:

<p>

No vehicles found

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


export default AdminPanel;