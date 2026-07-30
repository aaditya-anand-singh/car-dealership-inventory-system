import {useState} from "react";
import {useNavigate} from "react-router-dom";

import api from "../api/axios";



function Register(){


const navigate = useNavigate();


const [form,setForm] = useState({

    username:"",
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

"/auth/register",

form

);



alert(response.data.message);



navigate("/login");



}
catch(error){


alert(

error.response?.data?.message ||

"Registration failed"

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

Create your premium vehicle account

</p>


</div>









<label className="text-sm text-gray-300">

Username

</label>


<input


name="username"


placeholder="Enter username"


value={form.username}


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

Email

</label>


<input


name="email"


placeholder="Enter email"


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


placeholder="Create password"


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


Create Account


</button>









<button


type="button"


onClick={()=>navigate("/login")}


className="

w-full

mt-5

text-blue-400

hover:text-blue-300

transition

"


>


Already have an account? Login


</button>









</form>





</div>


);


}


export default Register;