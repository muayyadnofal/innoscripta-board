import {Outlet} from "react-router-dom";
import {Navigation} from "./Navigation/Navigation";
import {Sidebar} from "./Sidebar/Sidebar";
import "./layout.css";
import {GlobalSearch} from "./GlobalSearch/GlobalSearch";

export const Layout = () => {

    return (
        <div className="layout">
            <Navigation/>
            <div className="layout__content">
                <Sidebar/>
                <div className="layout_main__holder">
                    <GlobalSearch/>
                    <main className="layout__main">
                        <Outlet/>
                    </main>
                </div>
            </div>
        </div>
    );
};
