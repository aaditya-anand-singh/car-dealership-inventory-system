import { useState } from "react";


function SearchBar({ onSearch }) {


    const [keyword, setKeyword] = useState("");

    const [fuelType, setFuelType] = useState("");

    const [transmission, setTransmission] = useState("");

    const [minPrice, setMinPrice] = useState("");

    const [maxPrice, setMaxPrice] = useState("");





    const handleSubmit = (e) => {

        e.preventDefault();


        onSearch({

            keyword,

            fuelType,

            transmission,

            minPrice,

            maxPrice

        });

    };







    const clearSearch = () => {


        setKeyword("");

        setFuelType("");

        setTransmission("");

        setMinPrice("");

        setMaxPrice("");



        onSearch({

            keyword:"",

            fuelType:"",

            transmission:"",

            minPrice:"",

            maxPrice:""

        });


    };








return (


<form

onSubmit={handleSubmit}

className="

bg-white/10

backdrop-blur-xl

border

border-white/10

p-6

rounded-2xl

mb-8

grid

grid-cols-1

md:grid-cols-6

gap-4

shadow-xl

"

>






<input

type="text"

placeholder="Search Brand or Model"

value={keyword}

onChange={(e)=>setKeyword(e.target.value)}

className="

bg-slate-900/80

text-white

placeholder-gray-400

border

border-white/20

p-3

rounded-xl

outline-none

focus:ring-2

focus:ring-blue-500

transition

"

/>







<select

value={fuelType}

onChange={(e)=>setFuelType(e.target.value)}

className="

bg-slate-900/80

text-white

border

border-white/20

p-3

rounded-xl

outline-none

focus:ring-2

focus:ring-blue-500

"

>


<option value="">

All Fuel

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

value={transmission}

onChange={(e)=>setTransmission(e.target.value)}

className="

bg-slate-900/80

text-white

border

border-white/20

p-3

rounded-xl

outline-none

focus:ring-2

focus:ring-blue-500

"

>


<option value="">

All Transmission

</option>


<option value="Manual">

Manual

</option>


<option value="Automatic">

Automatic

</option>


</select>







<input

type="number"

placeholder="Minimum Price"

value={minPrice}

onChange={(e)=>setMinPrice(e.target.value)}

className="

bg-slate-900/80

text-white

placeholder-gray-400

border

border-white/20

p-3

rounded-xl

outline-none

focus:ring-2

focus:ring-blue-500

"

/>








<input

type="number"

placeholder="Maximum Price"

value={maxPrice}

onChange={(e)=>setMaxPrice(e.target.value)}

className="

bg-slate-900/80

text-white

placeholder-gray-400

border

border-white/20

p-3

rounded-xl

outline-none

focus:ring-2

focus:ring-blue-500

"

/>









<div className="flex gap-3">





<button

type="submit"

className="

flex-1

bg-blue-600

hover:bg-blue-700

transition

duration-300

text-white

font-semibold

rounded-xl

shadow-lg

hover:shadow-blue-500/40

"

>

Search

</button>








<button

type="button"

onClick={clearSearch}

className="

flex-1

bg-gray-600

hover:bg-gray-700

transition

duration-300

text-white

font-semibold

rounded-xl

"

>

Clear

</button>







</div>







</form>


);


}


export default SearchBar;