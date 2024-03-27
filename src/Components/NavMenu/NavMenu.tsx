import React, { useState } from  'react';

import {IoMenuOutline} from 'react-icons/io5';
import {IoClose} from 'react-icons/io5';

import { BiSolidDownArrow } from "react-icons/bi";
import { RxEnterFullScreen } from "react-icons/rx";

import { Link } from 'react-router-dom';
import { NavMenuData } from './NavMenuData';
import { IconContext } from 'react-icons';
import './NavMenu.css';



const NavMenu = () => {
    const [appear, setAppear] = useState(false);

    const handleAppear = () => {
        setAppear(!appear);
    }
    
    return (
        <>
            <IconContext.Provider value={{color: '#fff'}}>
                <div className='appear'>
                    <Link to="#" className = 'menu-bars'> 
                        <IoMenuOutline onClick={handleAppear}/>
                    </Link>
                </div>
                
            </IconContext.Provider>

            <IconContext.Provider value={{ color: "#fff" }}>
        <nav className={appear ? "nav-menu active" : "nav-menu"}>
          <div className="nav-menu-items">
            {NavMenuData.map((item, index) => {
              return (
                <div key={index} className={"option" + index + " btn"}>
                  <Link to={item.path}>
                    {item.icon}
                    {/* <span className="navbar-title">{item.title}</span> */}
                  </Link>
                </div>
              );
            })}
          </div>
        </nav>
      </IconContext.Provider>
        </>
    )

};
export default NavMenu;