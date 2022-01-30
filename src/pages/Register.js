import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Loader from '../components/Loader';
import { toast } from 'react-toastify';

function Register() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = getAuth();

  async function register(e){
    e.preventDefault();
    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      setLoading(false);
      toast.success("Registration success!");
    } catch (e) {
      console.log(e);
      setLoading(false);
      toast.error(e.message);
    }
  }

  return <div className='register-parent'>
    {loading && <Loader />}
    <div className='register-top'></div>
    <div className='row'>
      <div className='col-md-5'>
        <lottie-player src="https://assets6.lottiefiles.com/packages/lf20_yr6zz3wv.json" background="transparent" speed="1" style={{ width: '450px', height: '450px' }} loop autoplay></lottie-player>
      </div>
      <div className='col-md-4'>
        <div className='register-form'>
          <h2>Register</h2>
          <hr />
          <form action="#" className='form' onSubmit={register}>
            <input type='email' required placeholder='Email' className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type='password' required placeholder='Passowrd' className='form-control' value={password} onChange={(e) => setPassword(e.target.value)} />
            <input type='password' required placeholder='Confirm Password' className='form-control' value={cpassword} onChange={(e) => setCpassword(e.target.value)} />
            <input type='submit' className='button mt-2' value='REGISTER' />

            <hr />
            <Link to="/login">Click Here To Login</Link>
          </form>
        </div>
      </div>
    </div>
  </div>;
}

export default Register;
