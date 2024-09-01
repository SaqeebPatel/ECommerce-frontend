// // src/hooks/useAuth.js

// import { useState, useEffect } from "react";
// import axios from "axios";

// const useAuth = () => {
//   const [products, setProducts] = useState([]);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     async function fetchProducts() {
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       setIsAuthenticated(true);

//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/products/getAllProduct",
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setProducts(response.data);
//       } catch (err) {
//         console.error("Failed to fetch product information", err);
//       }
//     }
//     fetchProducts();
//   }, []);

//   return { products, isAuthenticated };
// };

// export default useAuth;
// hooks/useAuth.js
import { useEffect } from "react";
import axios from "axios";

const useAuth = (setData, endpoint) => {
  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await axios.get(endpoint, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(response.data.category);
      } catch (err) {
        console.error("Failed to fetch data", err);
      }
    }

    fetchData();
  }, [setData, endpoint]);
};

export default useAuth;
