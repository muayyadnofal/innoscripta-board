import "./navigation.css"
import {SwitchAccountDropdown} from "./SwitchAccountDropdown";

export const Navigation = () => {

    return (
        <nav className="navigation">
            <div className="logo">
                <img height={25} src="/innoscripta-logo.png" alt="logo"/>
            </div>
            <div className="navigation__actions">
                <SwitchAccountDropdown/>
            </div>
        </nav>
    )
}