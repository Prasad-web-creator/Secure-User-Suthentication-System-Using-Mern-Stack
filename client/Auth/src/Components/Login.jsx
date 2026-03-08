import {useState,useContext} from 'react'
import {useNavigate,Link} from 'react-router-dom'
import { userProfileContext } from '../Routes/AppRouter';
import BrandBar from './BrandBar';


export default function Login() {

    const API = import.meta.env.VITE_API_URL;
    const {profileName,setProfileName} = useContext(userProfileContext);

    const navigate = useNavigate();

    const [user,setUser] = useState({
            email : "",
            password : ""
        })

            
        const handleChange = (e)=>{
            const {name,value} = e.target;
            setUser((prev)=>({...prev,[name]:value}));
        }
    
        const handleSubmit = async (e)=>{
            e.preventDefault();
            try{
                const response = await fetch(`${API}/api/auth/login`,{
                        method:'POST',
                        headers:{"Content-Type":"application/json"},
                        body: JSON.stringify(user)
                    })
    
                const data = await response.json()

                alert(data.message)

                if(data.message!=="Invalid Password" && data.message!=="User not Found"){

                    localStorage.setItem('profileName',data.user.username || 'login')
                    localStorage.setItem('token',data.token)
                    const Uname = localStorage.getItem('profileName')
                    setProfileName(Uname)
                    navigate('/')
                }

                }catch(error){
                    alert("Server Could not Reached")
                }
            } 

  return (
    <>
        <BrandBar/>
        <div className='register-container'>
            <h1 className='text-white text-center'>Login</h1>
            <h6 className='text-font-blue text-center'>Login to your account!</h6>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder='Email' name='email' value={user.email} onChange={handleChange} required/><br />
                <input type="password" placeholder='Password' name='password' value={user.password} onChange={handleChange} required/><br />
                <Link to="/resetpassword" className='text-font-blue link'>forget password?</Link><br />
                <button type='submit'  className='signup-btn my-2'>Login</button><br />
                <p className='text-gray text-center'>Don't have an account? <Link to="/register" className='text-font-blue'>Signup.</Link></p>
            </form>
        </div>
    </>
  )
}
