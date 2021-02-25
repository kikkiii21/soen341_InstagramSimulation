import React from 'react'
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink } from './NavbarElements'

const Navbar = () => {
    return ( < div >
        <Nav >
        <NavLink to = '/' >
                     <a className="Nav-brand-logo" href="/">
                       Instagram
                     </a>
        </NavLink >
        <Bars / >
        <NavMenu >

        <NavLink to = '/Subscribed' activeStyle > Subscribed </NavLink>
        <NavLink to = '/Myprofile' activeStyle >My profile </NavLink>
        <NavLink to = '/Account' activeStyle >Account Setting</NavLink>
        </NavMenu > 
        <NavBtn >
        <NavBtnLink to = '/signin' > Sign in </NavBtnLink> 
        <NavBtnLink to = '/register' > Register </NavBtnLink>
         </NavBtn >

        </Nav> 
        </div >
    )
}

export default Navbar