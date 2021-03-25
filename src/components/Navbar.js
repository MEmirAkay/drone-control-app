import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './sidebar_data';
import './navbar.css';
import { IconContext } from 'react-icons';

function Navbar() {
    const [sidebar, setSidebar] = useState(false);
  
    const showSidebar = () => setSidebar(!sidebar);
  
    return (
      <>
        <IconContext.Provider value={{ color: '#fff' }}>
          <div className='navbar'>
            <Link to='#' className='menu-bars'>
              <FaIcons.FaBars onClick={showSidebar} />
            </Link>
            <div className="header">
                <h2 className="text-light">
                    Drone Control Panel
                </h2>          
            </div>  
          </div>
          
          <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-menu-items' onClick={showSidebar}>
              
              <li className='navbar-toggle'>
                <Link to='#' className='menu-bars'>
                  <AiIcons.AiOutlineClose />
                </Link>
              </li>

              {SidebarData.map((item, index) => {
                return (
                  <li  key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span className="navMenu-titles">{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          
          </nav>
        </IconContext.Provider>
      </>
    );
  }


export default Navbar