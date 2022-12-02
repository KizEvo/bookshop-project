import logo from '../assets/book-logo.png'

const widthStyle = { width: '3rem' }

const Logo = () => {
  return (
    <>
      <img src={logo} alt='book logo' style={widthStyle}></img>
      BookShop
    </>
  )
}
export default Logo
