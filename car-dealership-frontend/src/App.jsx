import { Routes, Route } from "react-router-dom";


import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";

import AdminPanel from "./pages/AdminPanel";

import AddVehicle from "./pages/AddVehicle";
import UpdateVehicle from "./pages/UpdateVehicle";

import RestockVehicle from "./pages/RestockVehicle";
import DeleteVehicle from "./pages/DeleteVehicle";

import CustomerPanel from "./pages/CustomerPanel";

import VehicleDetails from "./pages/VehicleDetails";


function App() {


    return (

        <Routes>


            <Route
                path="/"
                element={<Login />}
            />


            <Route
                path="/login"
                element={<Login />}
            />


            <Route
                path="/register"
                element={<Register />}
            />



            <Route
                path="/dashboard"
                element={<Dashboard />}
            />



            <Route
                path="/admin"
                element={<AdminPanel />}
            />


            <Route
                path="/admin/add-vehicle"
                element={<AddVehicle />}
            />


            <Route
                path="/admin/update/:id"
                element={<UpdateVehicle />}
            />


            <Route
                path="/admin/restock/:id"
                element={<RestockVehicle />}
            />


            <Route
                path="/admin/delete/:id"
                element={<DeleteVehicle />}
            />



            <Route
                path="/customer"
                element={<CustomerPanel />}
            />

        <Route

path="/vehicle/:id"

element={<VehicleDetails/>}

/>


        </Routes>

    );

}


export default App;