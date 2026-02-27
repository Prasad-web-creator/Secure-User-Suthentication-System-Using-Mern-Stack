import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import BrandBar from './BrandBar';

export default function Otp() {

    const navigate = useNavigate();

    const [user,setUser] = useState({
        email:"",
        otp:""
    })

    const handleChange = (e)=>{
        const {name,value} = e.target;
        setUser((prev)=>({...prev,[name]:value}));
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            const response = await fetch('http://127.0.0.1:8000/verify/',{
                    method:'POST',
                    headers:{"Content-Type":"application/json"},
                    body: JSON.stringify(user)
                })

            if (!response.ok) alert("Server connection failed")

            const data = await response.json()

            alert(data.message||data.error);

            if (data.message) navigate('/new_password')

            }catch(error){
                console.log("Server Could not Reached")
            }
        }

  return (
    <>
        <BrandBar/>
        <div className='register-container'>
            <h2 className='text-white text-center'>Reset Password OTP</h2>
            <h6 className='text-font-blue text-center'>Enter your 6-digit code sent to your email</h6>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder='Email' name='email' value={user.value} onChange={handleChange} required/><br />
                <input  type="tel" placeholder='otp' maxLength={6} name='otp' value={user.otp} onChange={handleChange} required/>
                <button type='submit' className='signup-btn my-2'>Submit</button><br />
            </form>
        </div>
    </>
  )
}
