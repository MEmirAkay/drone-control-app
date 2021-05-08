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
        <IconContext.Provider value={{ color: 'black' }}>
          <div className='navbar'>
            <Link to='#' className='menu-bars'>
              <FaIcons.FaBars onClick={showSidebar} />
            </Link>
          </div>
          <IconContext.Provider value={{ color: 'white' }}>
          <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-menu-items' onClick={showSidebar}>
              
              <li className='navbar-toggle'>
                <Link to='#' className='menu-bars'>
                  <AiIcons.AiOutlineClose />
                </Link>
              </li>
              
              {SidebarData.map((item, index) => {
                return (
                  <li  key={index} className={item.cName} >
                    <Link to={item.path}>
                      <div className="nav-item-icons">
                        {item.icon}
                      </div>
                      
                      <span className="navMenu-titles">{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          
          </nav>
          </IconContext.Provider>
        </IconContext.Provider>
      </>
    );
  }


export default Navbar