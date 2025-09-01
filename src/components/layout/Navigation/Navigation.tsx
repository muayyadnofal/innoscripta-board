import {Button} from "../../ui/Button";
import {SettingsIcon, SwitchIcon} from "../../icons";
import "./navigation.css"

export const Navigation = () => {

    return (
        <nav className="navigation">
            <div className="logo">
                <img height={25} src="/innoscripta-logo.png" alt="logo"/>
            </div>
            <div className="navigation__actions">
                <Button icon={<SwitchIcon/>} variant="text"/>
                <Button icon={<SettingsIcon/>} variant="text"/>
            </div>
        </nav>
    )
}