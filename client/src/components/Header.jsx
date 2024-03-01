import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className='bg-black'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        
        <Link to='/'>
          <h1 className='font-bold text-slate-100'>Auth App</h1>
        </Link>
        <ul className='flex gap-4 text-white'>
        <Link to='/complaints'>
        {currentUser ? (
          <li>Add Complaint</li>) : (
            <li className='hidden'>Sign In</li>
          )}</Link>
        <Link to='/profile'/>
          
        
        <Link to='/my-complaints'>
        {currentUser ? (
          <li>MyComplaints</li>): (
            <li className='hidden'>Sign In</li>
          )}
        </Link>
        
          <Link to='/'>
            <li>Home</li>
          </Link>
          <Link to='/about'>
            <li>About</li>
          </Link>
          <Link to='/profile'>
            {currentUser ? (
              <img src={currentUser.profilePicture} alt='profile' className='h-7 w-7 rounded-full object-cover' />
            ) : (
              <li>Sign In</li>
            )}
          </Link>
        </ul>
      </div>
    </div>
  );
}