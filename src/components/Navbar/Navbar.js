import React from 'react';

function Navbar({logout}) {
    return (
        <nav className="navbar">Ja
            <span style={{color:"mediumpurple"}}>mmm</span>
            ing
            <button className="btn-logout" onClick={logout}>LOGOUT</button>
        </nav>

    )
}

export default Navbar;