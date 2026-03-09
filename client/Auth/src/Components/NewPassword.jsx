import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import BrandBar from './BrandBar';

export default function NewPassword() {
    const navigate = useNavigate();
    const API = import.meta.env.VITE_API_URL;
    const [user,setUser] = useState({
            email:"",
            password:""
        })
  
      const handleChange = (e)=>{
          const {name,value} = e.target;
          setUser((prev)=>({...prev,[name]:value}));
      }
  
      const handleSubmit = async (e)=>{
          e.preventDefault();
          try{
              const response = await fetch(`${API}/api/auth/newpassword/`,{
                      method:'POST',
                      headers:{"Content-Type":"application/json"},
                      body: JSON.stringify(user)
                  })
  
              const data = await response.json()
  
              alert(data.message);

              if (data.message) navigate('/')
  
              }catch(error){
                  alert("Server Could not Reached")
              }
          }


  return (
    <> 
    <BrandBar/>
    <div className='register-container'>
            <h1 className='text-white text-center'>New Password</h1>
            <h6 className='text-font-blue text-center'>Enter the new password below</h6>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder='Email' name='email' value={user.value} onChange={handleChange} required/><br />
                <input type="password" placeholder='password' name='password' value={user.password} onChange={handleChange} required/><br />
                <button type='submit'  className='signup-btn my-2'>Submit</button><br />
            </form>
        </div>
    </>
  )
}
