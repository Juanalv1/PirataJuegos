"use client"

import { useState, useEffect } from "react";
import { useAppContext } from '../Context/AppContext';  
import Layout from "../components/Layout";
import { redirect, useRouter } from 'next/navigation';

export default function Login() {
  const { isLoged, setIsLoged } = useAppContext()
  const fetchUrl = 'https://piratajuegos.com/api/login'
  const router = useRouter();
  useEffect(() => {
    if (isLoged) {
      router.push('/');
    }
  }, [isLoged]);
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
    console.log(loginForm);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(fetchUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...loginForm }),
      });

      if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem('token', JSON.stringify(data));
        setIsLoged(true)
        router.push('/')

      }
      
        else {
          // Check the response status and handle errors accordingly
          if (response.status === 401) {
            console.error("Incorrect credentials");
          } else if (response.status === 500) {
            console.error("Server error");
          } else {
            console.error("Unexpected error");
          }
        }
       // Cierre del if (response.status === 200)
    } catch (err) {
      console.error(err);
    }
  };

  return (

      <Layout>
        <div className="font-Quato">
          <form>
            <label htmlFor="username">User</label>
            <input
              type="text"
              id="username"
              name="username"
              value={loginForm.username}
              onChange={handleChange}
            />
            <label htmlFor="password">Password</label>
            <input
              type="text"
              id="password"
              name="password"
              value={loginForm.password}
              onChange={handleChange}
            />
            <button onClick={handleClick}>Login</button>
          </form>
        </div>
      </Layout>

  );
}
