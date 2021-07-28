import React, {Fragment} from 'react';

    // Import Images MAnually
import Logo from '../assets/images/logo-app.png';
    
    // Material Imports 
import { House, People, GamesOutlined, InfoOutlined, ContactSupportOutlined} from '@material-ui/icons';



const SideNav = () => {
    return (
        <Fragment>
            <div className = "sideNavBar">
                <div className="app-name">
                    <img src={Logo} alt="App Name"/>
                </div>
                <div className="app-icon-list">
                    <ul>
                        <li className="active"><a href=""><House /></a></li>
                        <li><a href=""><People /></a></li>
                        <li><a href=""><GamesOutlined /></a></li>
                        <li><a href=""><InfoOutlined /></a></li>
                        <li><a href=""><ContactSupportOutlined /></a></li>
                    </ul>
                </div>
            </div>
        </Fragment>
    );
}

export default SideNav;