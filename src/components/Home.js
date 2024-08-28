// import React,{useEffect,useState} from 'react';
// import axios from 'axios';
// import Navbar from './Navbar';

// const Home = () => {
//   const [user, setUser] = useState({});
 
//   useEffect(()=>
//     {async function getUserInfo () {
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/auth/getUserInfo",
//         {},
//         {
//           headers: {
//             Authorization: "Bearer " + localStorage.getItem("token"),
//           },
//         }
//       );
//       console.log(response.data);
//       setUser(response.data.user);
      
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   getUserInfo();
//   },[]);

//  if(user.role==="admin"){
//   return (
//     <div>
     
//       <h1>Welcome admin {user.name}</h1>
      
//     </div>
//   );
//  }else{
//   return (
//     <div>
//       <h1>Welcome User!{user.name}</h1>
//     </div>
//   );
//  }

// //   return (
// //     <div className="home-container d-flex justify-content-center align-items-center  mt-5">
// //     <div class="row">
// //   <div class="col-sm-6">
// //     <div class="card">
// //       <div class="card-body">
// //         <h5 class="card-title">{user.name}</h5>
// //         <p class="card-text">{user.email}</p>
// //         <a href="#" class="btn btn-primary">Go somewhere</a>
// //       </div>
// //     </div>
// //   </div>
// //   <div class="col-sm-6">
// //     <div class="card">
// //       <div class="card-body">
// //         <h5 class="card-title">Special title treatment</h5>
// //         <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
// //         <a href="#" class="btn btn-primary">Go somewhere</a>
// //       </div>
// //     </div>
// //   </div>
// // </div>
// // </div>
// //   );
// }

// export default Home;
import React from 'react';
import useAuth from '../hooks/useAuth'; // Ensure the correct path to useAuth
import Navbar from './Navbar';

const Home = () => {
  const { user } = useAuth(); // Get user from useAuth hook

  return (
    <div>
      <Navbar />
      <div className="home-container">
        {user ? (
          user.role === "admin" ? (
            <h1>Welcome admin {user.name}</h1>
          ) : (
            <h1>Welcome User! {user.name}</h1>
          )
        ) : (
          <h1>Loading...</h1> // Show a loading state if user is not yet available
        )}
      </div>
    </div>
  );
};

export default Home;
