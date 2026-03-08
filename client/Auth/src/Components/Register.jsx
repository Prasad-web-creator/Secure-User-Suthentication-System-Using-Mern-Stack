import {useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import BrandBar from './BrandBar'

export default function Register() {

    const API = import.meta.env.VITE_API_URL;

    const navigate = useNavigate();

    const [user,setUser] = useState({
        username : "", 
        email : "",
        password : "", 
        otp : ""
    })

    const handleChange = (e)=>{
        const {name,value} = e.target;
        setUser((prev)=>({...prev,[name]:value}));
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            const response = await fetch(`${API}/api/auth/register`,{
                    method:'POST',
                    headers:{"Content-Type":"application/json"},
                    body: JSON.stringify(user)
                })

            const data = await response.json()

            console.log(data)

            alert(data.message);

            navigate('/login')

            }catch(error){
                alert("Server Could not Reached")
            }
        }


        const handleOtp = async (e)=>{
        e.preventDefault();
        try{
            const response = await fetch(`${API}/api/auth/getotp`,{
                    method:'POST',
                    headers:{"Content-Type":"application/json"},
                    body: JSON.stringify(user)
                })

            if (!response.ok) alert("Server connection failed")

            const data = await response.json()

            console.log(data)

            alert(data.message);


            }catch(error){
                alert("Server Could not Reached")
            }
        }

  return (
    <>
        <BrandBar/>
        <div className='register-container'>
            <h1 className='text-white text-center'>Create Account</h1>
            <h6 className='text-font-blue text-center'>Create your account</h6>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Full Name' name='username' value={user.username} onChange={handleChange} required/><br />
                <input type="email" placeholder='Email' name='email' value={user.email} onChange={handleChange} required/><br />
                <input type="password" placeholder='Password' name='password' value={user.password} onChange={handleChange} required/><br />
                <input  type="tel" placeholder='otp' maxLength={6} name='otp' value={user.otp} onChange={handleChange} required/>
                <button type="button" onClick={handleOtp} className='signup-btn my-2'>Get Otp</button><br />
                <Link to="/resetpassword" className='text-font-blue link'>forget password?</Link><br />
                <button type='submit' className='signup-btn my-2'>Sign Up</button><br />
                <p className='text-gray text-center'>Already have an account? <Link to="/login" className='text-font-blue'>Login here.</Link></p>
            </form>
        </div>
    </>
  )
}
