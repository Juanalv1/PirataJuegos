"use client"

import { useState, useEffect } from "react";
import { UserProvider, useUser } from './../userContext'; // Solo importa UserProvider, no useUser
import Layout from "../components/Layout";
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const { setIsAdmin, isAdmin, token, setToken } = useUser();
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  });
  console.log(isAdmin)

  useEffect(() => {
    if (isAdmin === true) {
      // Autenticación exitosa, redirigir al usuario a la página deseada
      router.push('/');
    }
  }, [isAdmin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
    console.log(loginForm);
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://pirataback.vercel.app/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...loginForm }),
        credentials: 'include',
      });

      if (response.status === 200) {
        const data = await response.json();
        if (data.success) {

          // El usuario ha iniciado sesión con éxito
          setIsAdmin(data.isAdmin); // Establece isAdmin en el estado local
          setToken(data.token)
          // Autenticación exitosa, redirigir al usuario a la página deseada
          // Cambia la URL de destino según tus necesidades
        } else {
          // Check the response status and handle errors accordingly
          if (response.status === 401) {
            console.error("Incorrect credentials");
          } else if (response.status === 500) {
            console.error("Server error");
          } else {
            console.error("Unexpected error");
          }
        }
      } // Cierre del if (response.status === 200)
    } catch (err) {
      console.error(err);
    }
  };

  return (

      <Layout>
        <div>
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
