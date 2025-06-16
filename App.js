// import React from "react";
// import { Route,Routes } from "react-router-dom";

// import Home from "./Components/Home";
// import Donate from "./Components/Donate";
// import ThankYou from "./Components/ThankYou";
// import Patient from "./Components/Patient";
// import PatientList from "./Components/PatientList";


// import EventList from "./Components/EventList";
// import EventForm from "./Components/EventForm";
// import Charity  from "./Components/Charity";


// function App() {
//   return (
//     <div className="App">
//     <Routes>
      
//       <Route path="/" element={<Home/>} />
//       <Route path="/donate" element={<Donate/>}/>
//       <Route path="/thankyou" element={<ThankYou/>}/>
//       <Route path="/donate/:id" element={<Donate/>}/>
//       <Route path="/charity" element={<Charity/>}/>
//       <Route path="/patientlist" element={<PatientList/>}/>
//       <Route path="/patient" element={<Patient/>}/>
      
  
//     <Route path="/eventform" element={<EventForm/>}/>
//     <Route path="/events" element={<EventList/>}/> 
//     </Routes>

//           </div>
//   );
// }

// export default App;
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Home from "./Components/Home";
import Donate from "./Components/Donate";
import ThankYou from "./Components/ThankYou";
import Patient from "./Components/Patient";
import PatientList from "./Components/PatientList";
import EventList from "./Components/EventList";
import EventForm from "./Components/EventForm";
import Charity  from "./Components/Charity";

import Login from "./Components/Login"; // Add
import Signup from "./Components/Signup"; // Add


function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Signup />} />
       
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/donate" element={<PrivateRoute><Donate /></PrivateRoute>} />
        <Route path="/thankyou" element={<PrivateRoute><ThankYou /></PrivateRoute>} />
        <Route path="/donate/:id" element={<PrivateRoute><Donate /></PrivateRoute>} />
        <Route path="/charity" element={<PrivateRoute><Charity /></PrivateRoute>} />
        <Route path="/patientlist" element={<PrivateRoute><PatientList /></PrivateRoute>} />
        <Route path="/patient" element={<PrivateRoute><Patient /></PrivateRoute>} />
        <Route path="/eventform" element={<PrivateRoute><EventForm /></PrivateRoute>} />
        <Route path="/events" element={<PrivateRoute><EventList /></PrivateRoute>} />
      </Routes>
    </div>
  );
}

export default App;
