import React from 'react'
import "./Header.css"
import logo from '../Assets/arbitradinglogo.png'

function Header() {
    return (
        // <div className="header">ARBITRADING</div>
        <div  className='imgdiv'>
            <img className="logoImg" src={logo} alt="ARBITRADING" />
        </div>
    )
}

export default Header
