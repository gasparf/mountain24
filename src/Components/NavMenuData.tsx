import React from 'react';
import {IoMenuOutline} from 'react-icons/io5';

import { FaUser } from "react-icons/fa";

export const NavMenuData = [
    {
        title: 'Home',
        path: '/',
        icon: <IoMenuOutline />,
        cName: 'nav-text'
    },

    {
        title: 'Locations',
        path: '/locations',
        icon: <FaUser />,
        cName: 'nav-text'
    }
]
