import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom';
import { UseSelector, useDispatch, useSelector } from 'react-redux';
import {logout, reset} from '../features/auth/authSlice'

function Header() {
  const navigate = useNavigate()
  const dispatch= useDispatch()
  const {user} = useSelector((state)=>state.auth)
  
  const onLogout = async () =>{
    dispatch(logout())
    dispatch(reset())
    navigate('/login')
  }
  return (
    <header className='header'>
       <div className='logo'>
          <Link to='/login'>GoalSetter</Link>
       </div>
       <ul>
        {user ? (<li>
        <button className='btn' onClick={onLogout}>
       <FaSignInAlt /> logout
       </button>
       </li>) : (<> <li>
       <Link to='/login'><FaSignInAlt /> login</Link>
       </li>
       <li>
       <Link to='/register'><FaUser /> register</Link>
       </li> </>) }
       
       </ul>
    </header>
  )
}

export default Header