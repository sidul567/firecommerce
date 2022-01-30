import React, { useState } from 'react';
import { Link, } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = getAuth();

  async function login(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      setLoading(false);
      localStorage.setItem("currentUser",JSON.stringify(userCredential.user));
      toast.success("Login success!");
      window.location.href = "/";
    } catch (e) {
      console.log(e);
      setLoading(false);
      toast.error(e.message);
    }
  }

  return <div className='login-parent'>
    {loading && <Loader />}
    <div className='row'>
      <div className='col-md-4'>
        <div className='login-form'>
          <h2>login</h2>
          <hr />
          <form action='#' className='form' onSubmit={login}>
            <input type='email' required placeholder='Email' className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type='password' required placeholder='Passowrd' className='form-control' value={password} onChange={(e) => setPassword(e.target.value)} />
            <input type='submit' className='button mt-2' value='Login' />

            <hr />
            <Link to="/register">Click Here To Register</Link>

          </form>
        </div>
      </div>
      <div className='col-md-5'>
        <lottie-player src="https://assets6.lottiefiles.com/packages/lf20_hu9cd9.json" background="transparent" speed="1" style={{ width: '450px', height: '450px' }} loop autoplay></lottie-player>
      </div>
    </div>
    <div className='login-bottom'></div>
  </div>;
}

export default Login;
