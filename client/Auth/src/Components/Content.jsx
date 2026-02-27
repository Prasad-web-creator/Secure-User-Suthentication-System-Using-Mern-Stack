
import robo from '../assets/robo.jpg' 
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { userProfileContext } from '../Routes/AppRouter';

export default function Content() {

    const {profileName,setProfileName} = useContext(userProfileContext);
    const navigate = useNavigate();
  return (
    <>
        <div className='container explore-container'>
            <center>
                <div className='explore-div'>
                    <img src={robo} alt="robo" width="140px" height="140px" />
                    <h3 className='my-2'>Hey {profileName!='login'? profileName : 'Developer'}! 🖐️</h3>
                    <h1 className='my-2'>Welcome to our app</h1>
                    <p>Let's start with a quick product tour and we will have you up and running in no time!</p>
                    <button onClick={()=>navigate('/')} className='login-btn'>Get Started</button>
                </div>
            </center>
        </div> 
    </>
  )
}
