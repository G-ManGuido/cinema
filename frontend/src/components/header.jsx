import Navigation from "./navigation";

const Header = () => {
    return (
        <div id="header">
            <div className="logo">
                <h1>Vienna Cinema Palast</h1>
            </div>
            <Navigation />
        </div>

    );
}

export default Header;