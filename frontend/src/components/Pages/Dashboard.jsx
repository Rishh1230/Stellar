import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from "../../util";
import { ToastContainer } from 'react-toastify';

function Dashboard() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'))
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess("Logged out successfully");
    setTimeout(() => {
      navigate('/');
    }, 1000);
  }

  const fetchProducts = async () => {
    try {
      const url = "http://localhost:8080/products";
      const headers = {
        'Authorization': localStorage.getItem('token')
      }

      const response = await fetch(url, {
        headers: headers
      });

      const result = await response.json();
      setProducts(result);

    } catch (err) {
      handleError(err);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [])

  return (
    <div>
      <h1>{loggedInUser}</h1>
      <button onClick={handleLogout}>Logout</button>

      <div>
        {
          products && products.map((item, index) => (
            <ul key={index}>
              <li>{item.name} : {item.price}</li>
            </ul>
          ))
        }
      </div>

      <ToastContainer />
    </div>
  )
}

export default Dashboard;