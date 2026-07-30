import {useState} from "react";
import {useNavigate} from "react-router-dom";

import api from "../api/axios";



function Login(){


const navigate = useNavigate();


const [form,setForm]=useState({

    email:"",
    password:""

});







const handleChange=(e)=>{


setForm({

    ...form,

    [e.target.name]:e.target.value

});


};









const handleSubmit=async(e)=>{


e.preventDefault();



try{


const response = await api.post(

"/auth/login",

form

);




localStorage.setItem(

"token",

response.data.token

);




localStorage.setItem(

"user",

JSON.stringify(response.data.user)

);





if(response.data.user.role==="admin"){


    navigate("/admin");


}
else{


    navigate("/customer");


}



}
catch(error){


alert(

error.response?.data?.message ||

"Login failed"

);


}


};










return(


<div className="min-h-screen flex items-center justify-center px-5 bg-gradient-to-br from-slate-950 via-gray-900 to-blue-950">





<div className="absolute inset-0 bg-black/30"></div>






<form


onSubmit={handleSubmit}


className="

relative

w-full

max-w-md

bg-white/10

backdrop-blur-xl

border

border-white/20

rounded-3xl

p-8

shadow-2xl

text-white

"

>







<div className="text-center mb-8">


<h1 className="text-4xl font-extrabold">

🚗 AutoHub

</h1>


<p className="text-gray-300 mt-2">

Welcome back to premium vehicles

</p>


</div>








<label className="text-sm text-gray-300">

Email

</label>


<input


name="email"


placeholder="Enter your email"


value={form.email}


onChange={handleChange}


className="

mt-2

mb-5

w-full

p-3

rounded-xl

bg-slate-900/70

border

border-white/20

text-white

outline-none

focus:ring-2

focus:ring-blue-500

"


/>








<label className="text-sm text-gray-300">

Password

</label>


<input


name="password"


type="password"


placeholder="Enter your password"


value={form.password}


onChange={handleChange}


className="

mt-2

mb-6

w-full

p-3

rounded-xl

bg-slate-900/70

border

border-white/20

text-white

outline-none

focus:ring-2

focus:ring-blue-500

"


/>









<button


type="submit"


className="

w-full

py-3

rounded-xl

bg-blue-600

hover:bg-blue-700

transition

duration-300

font-bold

shadow-lg

hover:shadow-blue-500/40

"

>


Login


</button>









<button


type="button"


onClick={()=>navigate("/register")}


className="

w-full

mt-5

text-blue-400

hover:text-blue-300

transition

"


>


Don't have an account? Register


</button>








</form>





</div>


);


}


export default Login;