
import { Link } from "react-router-dom";

export default function AlexxEonNavbar() {

    return (
            <section className="section">
                <nav className="navbar has-background-primary-light is-fixed-top is-transparent is-spaced" role="navigation" aria-label="main navigation">
                    <div className="navbar-brand">
                        <h1 className="title is-1 is-family-monospace has-text-primary-dark p-5">Alexx Eon</h1>
                    </div>
                    <div className="navbar-menu is-active">
                        <div className="navbar-start">
                            <div className="navbar-item is-family-monospace has-text-weight-semibold">
                                <Link to="/">Home</Link>
                            </div>
                            <div className="navbar-item is-family-monospace has-text-weight-semibold">
                                <Link to="/bio">Bio</Link>
                            </div>
                        </div>
                    </div>
                </nav>
            </section>
    );
}