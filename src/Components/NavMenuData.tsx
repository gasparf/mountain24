import React from 'react';
import { IoMdHome } from 'react-icons/io';
import { FaUser } from "react-icons/fa";
import Locations from '../Pages/Locations';


export const NavMenuData = [
    {
        title: 'Home',
        path: '/',
        icon: <IoMdHome />,
        cName: 'nav-text'
    },

    {
        title: 'Locations',
        path: '/Locations',
        icon: <FaUser />,
        cName: 'nav-text'
    }
]
