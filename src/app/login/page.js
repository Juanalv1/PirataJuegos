"use client"

import { useState, useEffect } from "react";
import { useAppContext } from '../Context/AppContext';  
import Layout from "../../components/Layout";
import { redirect, useRouter } from 'next/navigation';

export default function Login() {
  const { session, setSession } = useAppContext()
  const router = useRouter();
  useEffect(() => {
    if (session) {
      router.push('/');
    }
  }, [session]);
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_FETCH_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...loginForm }),
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log(data)
        setSession(data)
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
        <div className="font-Quato p-4">
          <form className="flex flex-col">
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
            <button onClick={handleClick} className="bg-green-500 text-white px-4 py-1 rounde mt-4 mx-20">Login</button>
          </form>
        </div>
      </Layout>

  );
}
