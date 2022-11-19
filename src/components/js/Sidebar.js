import React from 'react';
import '../css/Sidebar.css';
import { NavLink } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { GrAppsRounded } from 'react-icons/gr';
import { CgProductHunt } from 'react-icons/cg';
import { BsCart2 } from 'react-icons/bs';
import { BiImage } from 'react-icons/bi';

const Sidebar = () => {
    return (
        <div className="sidebar-main-box">
            <ul>
                <NavLink to="/" exact activeClassName="sidebar-navlink">
                    <li>
                        <AiOutlineHome />
                        <span className="sidebar-list">Home</span>
                    </li>
                </NavLink>

                <NavLink to="/banner" activeClassName="sidebar-navlink">
                    <li>
                        <BiImage />
                        <span className="sidebar-list">Banner</span>
                    </li>
                </NavLink>

                <NavLink to="/category" activeClassName="sidebar-navlink">
                    <li>
                        <GrAppsRounded />
                        <span className="sidebar-list">Category</span>
                    </li>
                </NavLink>

                <NavLink to="/products" activeClassName="sidebar-navlink">
                    <li>
                        <CgProductHunt />
                        <span className="sidebar-list">Products</span>
                    </li>
                </NavLink>

                <NavLink to="/orders" activeClassName="sidebar-navlink">
                    <li>
                        <BsCart2 />
                        <span className="sidebar-list">Orders</span>
                    </li>
                </NavLink>
            </ul>
        </div>
    );
};

export default Sidebar;
