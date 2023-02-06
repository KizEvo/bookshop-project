import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavLinksComponent from './NavLinksComponent'
import Logo from './Logo'
import { links } from '../utils/links'
import { useAppContext } from '../context/appContext'

const NavbarComponent = () => {
  const { user } = useAppContext()
  return (
    <Navbar bg='primary' expand='lg'>
      <Container>
        <Link to='/'>
          <Logo />
        </Link>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ms-auto'>
            {links.map((link) => {
              return <NavLinksComponent key={link.id} {...link} />
            })}
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ms-auto'>
            <NavLinksComponent text={'Cart'} path={'cart'} />
            {user ? (
              user.role === 'admin' ? (
                <span>
                  <NavLinksComponent text={'Admin'} path={'admin'} />
                  <NavLinksComponent text={'User'} path={'user'} />
                </span>
              ) : (
                <NavLinksComponent text={'User'} path={'user'} />
              )
            ) : (
              <NavLinksComponent text={'Login'} path={'register'} />
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
export default NavbarComponent
