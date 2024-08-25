import React,{useEffect,useState} from 'react';
import axios from 'axios';

const Home = () => {
  const [user, setUser] = useState({});
  useEffect(()=>
    {async function getUserInfo () {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/getUserInfo",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(response.data);
      setUser(response.data.user);
    } catch (error) {
      console.log(error);
    }
  }
  getUserInfo();
  },[]);



  return (
    <div className="home-container d-flex justify-content-center align-items-center  mt-5">
    <div class="row">
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{user.name}</h5>
        <p class="card-text">{user.email}</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  </div>
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  </div>
</div>
</div>
  );
}

export default Home;
