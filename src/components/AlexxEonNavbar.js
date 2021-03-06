
import { Link, NavLink } from "react-router-dom";
import React from 'react';

export default function AlexxEonNavbar() {

    function toggleBurgerMenu() {
        document.querySelector('.navbar-burger').classList.toggle('is-active');
        document.querySelector('.navbar-menu').classList.toggle('is-active');
    }

    return (
        <section className="section">
            <nav className="navbar has-background-primary-dark is-fixed-top is-spaced" role="navigation" aria-label="main navigation">
                <div className="navbar-brand pl-3 py-1">
                    
                <div className="navbar-item">
                    <NavLink to={"/"}>
                 <img src="./full-logo-white.png"></img>
                 </NavLink>
             </div>
             
                    <div className="navbar-burger has-text-primary-light" onClick={toggleBurgerMenu}>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </div>
                </div>
                <div className="navbar-menu has-background-primary-dark p-2 is-rounded">
                    <div className="navbar-end">
                        <div className="navbar-item is-family-monospace has-text-weight-semibold">
                            <Link to="/" className="box py-2 has-text-primary-dark" onClick={toggleBurgerMenu}>Home</Link>
                        </div>
                        <div className="navbar-item is-family-monospace has-text-weight-semibold">
                            <Link to="/bio" className="box py-2 has-text-primary-dark" onClick={toggleBurgerMenu}>Bio</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </section>
    );
}