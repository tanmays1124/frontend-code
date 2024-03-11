import React, { useState } from 'react';
import './AdminNav.css'
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";


const Navbar = ({onSearch, tab}) => {
  const [searchInput, setSearchInput] = useState('');
  const [searchResult, setSearchResult] = useState('');
  const navigate = useNavigate()
  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchInput);
    console.log('clicked',searchInput)
  };

  const onAddQuestions = () =>{
    if(tab === 'Add Questions')
    navigate('/addquestion')
    else
    navigate('/admin')
    
  }

  
  const handleLogout = () => {
    fetch(`http://127.0.0.1:8000/api/logout/`, {
      method: "POST",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        Cookies.remove("jwt");
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("username");
        localStorage.removeItem("csrf_token");
        console.log("Logout successful:", data);
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  };


  return (
    <nav className="admin-navbar">
      <div className="logo">
        <h1>QuizVizz</h1>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Username"
          value={searchInput}
          onChange={handleSearchInputChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      
      <div className="user-info">
        <span>Admin</span>
      </div>
      <div className="admin-nav-tabs">
        <button onClick={onAddQuestions}>{tab}</button>
      </div>
      <div className="admin-nav-tabs">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
