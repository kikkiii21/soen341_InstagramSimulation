import styled from 'styled-components'
import { NavLink as Link } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'

export const Nav = styled.nav `
 background: #fff;
 border-color:#000;
 ${'' /* border-width: 10px; */}
 height:80px;
 display:flex;
 justify-content:space-around;
 padding:0.5rem calc((100vw-1000px)/2);
 z-index:10;
 position: fixed;
 width: 100%;
 top: 0;
 left:0;
 box-shadow: 2px 2px 50px rgb(204, 204, 204);
 `

export const NavLink = styled(Link)
`
    
    display: flex;
    align-items:center;
    text-decoration:none;
    padding:0 1rem;
    height:100%;
    cursor:pointer;
    margin: 0% 1%;


    &.active{
        color:#000;
        text-decoration:none;
    }
 `



export const NavMenu = styled.div `
    display: flex;
    
    
 `

export const NavBtn = styled.nav `
 display:flex;
 align-items:center;
 margin-right:24px;

 `

export const NavBtnLink = styled(Link)
`
    border-radius:4px;
    display:flex;
    background-color: #abadb0;
    padding: 5px 5px;
    color:#fff;
    border:none;
    outline:none;
    cursor: pointer;
    transition:all 0.2s ease-in-out;
    text-decoration:none;
    width:100%;
    margin-left: 20px;

    &:hover{
        transition:all 0.2s ease-in-out;
        color: #fff;
        background:#e8415d;
    }
 `