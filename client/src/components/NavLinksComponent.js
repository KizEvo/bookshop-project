import { NavLink } from 'react-router-dom'

const paddingStyle = { paddingRight: '3rem' }

const NavLinksComponent = ({ text, path, icon }) => {
  return (
    <>
      <NavLink
        to={path}
        className={({ isActive }) => (isActive ? 'active' : 'inactive')}
        style={paddingStyle}
      >
        {icon}
        {text}
      </NavLink>
    </>
  )
}
export default NavLinksComponent
