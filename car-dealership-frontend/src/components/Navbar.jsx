import {useNavigate} from "react-router-dom";


function Navbar(){


const navigate = useNavigate();


const user = JSON.parse(

    localStorage.getItem("user")

);





const logout=()=>{


    localStorage.removeItem("token");

    localStorage.removeItem("user");


    navigate("/login");


};







return(

<nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/10 text-white px-8 py-4 flex justify-between items-center">


    {/* Logo */}

    <div 
    onClick={()=>navigate("/")}
    className="cursor-pointer"
    >

        <h2 className="text-3xl font-extrabold tracking-wide">

            🚗 AutoHub

        </h2>

        <p className="text-xs text-gray-400">

            Premium Vehicle Marketplace

        </p>

    </div>







    {/* User Section */}

    <div className="flex items-center gap-5">



        <div className="hidden md:block text-right">


            <p className="font-semibold text-lg">

                {user?.username}

            </p>


            <p className="text-sm text-blue-400 capitalize">

                {user?.role}

            </p>


        </div>






        <button

        onClick={logout}

        className="

        bg-red-600

        hover:bg-red-700

        transition-all

        duration-300

        px-5

        py-2

        rounded-xl

        font-semibold

        shadow-lg

        hover:shadow-red-500/30

        "

        >

            Logout

        </button>



    </div>




</nav>

);


}


export default Navbar;