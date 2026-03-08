import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import BrandBar from './BrandBar';

export default function Resetpass() {
    
    const navigate = useNavigate();
    const API = import.meta.env.VITE_API_URL;
    const [user,setUser] = useState({
            email : "",
        })
  
      const handleChange = (e)=>{
          const {name,value} = e.target;
          setUser((prev)=>({...prev,[name]:value}));
      }
  
      const handleSubmit = async (e)=>{
          e.preventDefault();
          try{
              const response = await fetch(`${API}/api/auth/resetpassword`,{
                      method:'POST',
                      headers:{"Content-Type":"application/json"},
                      body: JSON.stringify(user)
                  })
  
              if (!response.ok) alert("Server connection failed")
  
              const data = await response.json()
  
              alert(data.message||data.error);

              if (data.message) navigate('/otp_reset')
  
              }catch(error){
                  alert("Server Could not Reached")
              }
          }
  


  return (
    <>
        <BrandBar/>
        <div className='register-container'>
            <h1 className='text-white text-center'>Reset Password</h1>
            <h6 className='text-font-blue text-center'>Enter your registered email address</h6>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder='Email' name='email' value={user.value} onChange={handleChange} required/><br />
                <button type='submit' className='signup-btn my-2'>Submit</button><br />
            </form>
        </div>
    </>
  )
}
