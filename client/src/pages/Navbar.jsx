export default function Navbar() {

    return (

        <nav className="navbar">

            <div className="navbar-brand">
                SDMS
            </div>

            <div className="navbar-links">

                <a className="navbar-link" href="/">
                    Dashboard
                </a>

                <a className="navbar-link" href="/daily-sale-form">
                    Daily Sale Form
                </a>

                <a className="navbar-link" href="/daily-sale-list">
                    Daily Sale List
                </a>

                <button className="navbar-button">
                    Logout
                </button>

            </div>

        </nav>

    );

}