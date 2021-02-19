import { Button, Navbar, Nav, NavDropdown, Dropdown } from 'react-bootstrap';
import React, { useEffect, useState } from "react";
import "../../css/navbar.css";
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import { baseURL } from '../../baseUtils';

const Login = () => {

  const history = useHistory()
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('jwtToken') ? true : false)
  const [show, setShow] = useState(false)

  const handleLogout = () => {
    fetch(`${baseURL}/api/signout`, {
      method: 'post'
    }).then(res => res.json())
      .then(data => {
        localStorage.removeItem('jwtToken')
        localStorage.removeItem('role')
        setLoggedIn(false)
        toast.success(data.message)
        history.push('/')
        window.location.reload()
      })
  }

  return (
    <>
      {
        loggedIn ?
          <Dropdown className="pad right-btn"
            show={show}
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
          >
            <Dropdown.Toggle id="dropdown-basic" className='mr-sm-2 my-2' size='lg'
              variant='danger'
            >
              Profile
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="/user/dashboard">Dashboard</Dropdown.Item>
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          :
          <Button className="mr-sm-2 my-2 right-btn btn-danger" href='/user/login' size='lg'>Login</Button>
      }
    </>
  )
}

export default function Navigbar() {

  const [show1, setShow1] = useState(false)
  const [show2, setShow2] = useState(false)

  useEffect(() => {

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)

  }, [])

  let prevScrollpos = window.pageYOffset

  const handleScroll = () => {

    if (document.getElementById('responsive-navbar-nav')?.classList.contains('show')) return

    const currentScrollPos = window.pageYOffset;

    if (document.getElementById("navbar")) {
      if (prevScrollpos > currentScrollPos) {
        document.getElementById("navbar").style.top = "0";
      } else {
        document.getElementById("navbar").style.top = "-100px";
      }
      prevScrollpos = currentScrollPos;
    }
  }

  return (
    <>
      <Navbar sticky="top" collapseOnSelect expand="lg" variant="light" className="style top-bottom" id='navbar'>
        <Navbar.Brand href="/" className="title-nav"><img src={`${baseURL}/images/utils/circle-cropped.png`} style={{ height: 50, marginRight: 5, marginLeft: 8 }} />AERO CLUB MNNIT</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link eventKey='blogs' href='/blogs' className='nav-items'>Blogs</Nav.Link>
            <Nav.Link eventKey='blogs' href='/projects' className='nav-items'>Projects</Nav.Link>
            <NavDropdown title="Our Team" id="basic-nav-dropdown"
              onMouseEnter={() => setShow1(true)}
              onMouseLeave={() => setShow1(false)}
              show={show1}
            >
              <NavDropdown.Item href="/faculty">Faculty Corner</NavDropdown.Item>
              <NavDropdown.Item href="/coordinators">Coordinators</NavDropdown.Item>
              <NavDropdown.Item href="/non-tech">Non-Tech Members</NavDropdown.Item>
              <NavDropdown.Item href="/alumni">Our Alumni</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link eventKey='blogs' href='/events' className='nav-items'>Events</Nav.Link>
            <Nav.Link eventKey='blogs' href='/workshop' className='nav-items'>Jigyasa</Nav.Link>
            <NavDropdown title="More" id="basic-nav-dropdown" className="pad"
              onMouseEnter={() => setShow2(true)}
              onMouseLeave={() => setShow2(false)}
              show={show2}
            >
              <NavDropdown.Item eventKey='members' href='/gallery'>Gallery</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/news" eventKey='news'>News Section</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="https://tsaw.tech/" eventKey='startups'>Our StartUps</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Login />

        </Navbar.Collapse>
      </Navbar>
    </>
  );
}