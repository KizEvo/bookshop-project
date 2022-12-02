import img from '../assets/register-img.png'
import { LoginForm } from '../components'

const Register = () => {
  return (
    <div className='container'>
      <div className='row text-center full-screen align-items-center'>
        <div className='col-xl'>
          <LoginForm />
        </div>
        <div className='col-xl'>
          <img
            src={img}
            alt='login form image'
            className='w-75 d-none d-xl-block m-auto'
          />
        </div>
      </div>
    </div>
  )
}
export default Register
