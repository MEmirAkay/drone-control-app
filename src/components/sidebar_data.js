import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as VscIcons from 'react-icons/vsc';
import * as GiIcons from 'react-icons/gi';


export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Connection',
    path: '/connection',
    icon: <VscIcons.VscDebugDisconnect />,
    cName: 'nav-text'
  },
  {
    title: 'Control',
    path: '/control',
    icon: <GiIcons.GiConsoleController />,
    cName: 'nav-text'
  }
  
  
];