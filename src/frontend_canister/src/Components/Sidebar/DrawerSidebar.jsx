/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

import { useDispatch } from 'react-redux';
import { BiLogOutCircle } from "react-icons/bi";
import { logoutStart } from '../Reducers/InternetIdentityReducer';
import IndonesiaLogo from "../../../assets/images/logo.png";
import { Drawer } from '@mui/material';
import { useSidebar } from '../../hooks/useSidebar';
import { useSelector } from 'react-redux';
import { setEducatorPageTitle, setStudentPageTitle, setMobileNav } from '../Reducers/utilityReducer';
import { useTranslation } from 'react-i18next';
const DrawerSidebar = ({ type }) => {
    let navLinkStyle = "w-full flex items-center py-2.5 my-3 px-2 lg:px-4 rounded-md transition duration-200 hover:bg-[#7B61FF] hover:text-white text-[#696969]";
    let navLinkStyleActive = "w-full flex items-center py-2.5 my-3 px-2 lg:px-4 rounded-md bg-[#7B61FF] text-white";
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { isMobileNav, studentPageTitle, educatorPageTitle } = useSelector((state) => state.utility)
    const [isLoading, setIsLoading] = useState(false);
    const sidebarStruct = useSidebar()

    const handleLogout = async () => {
        setIsLoading(true);

        try {
            dispatch(logoutStart());
            setIsLoading(false);
            window.location.href =
                process.env.DFX_NETWORK === "ic" ?
                    '/' :
                    `/?canisterId=${process.env.CANISTER_ID_FRONTEND_CANISTER}`;
        } catch (error) {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Drawer open={isMobileNav} onClose={() => dispatch(setMobileNav(!isMobileNav))}
                variant="temporary"
                ModalProps={{
                    keepMounted: false
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '60%' },
                }}
                anchor="left"

            >
                <div className="relative flex flex-col w-full h-full px-2 space-y-6 py-7 lg:px-3">

                    <div className='flex flex-row items-center justify-center'>
                        <a href="#" className="w-auto h-20 space-x-2 text-white lg:px-4">
                            <img src={IndonesiaLogo} alt="Logo" className='object-contain w-full h-full' />
                        </a>
                    </div>

                    <nav className="flex flex-col items-center justify-center w-full">

                        {
                            type === "student" ? sidebarStruct.map((item) => (
                                <NavLink key={item.id} to={item.studentPath}
                                    className={({ isActive }) => isActive ? navLinkStyleActive : navLinkStyle}
                                    onClick={() => {
                                        dispatch(setStudentPageTitle(item.studentName));
                                        dispatch(setMobileNav(false))
                                    }}>
                                    {item.icon}
                                    <span className="sidebar_text_style">{item.studentName}</span>
                                </NavLink>
                            )) : sidebarStruct.map((item) => (
                                <NavLink key={item.id} to={item.educatorPath}
                                    className={({ isActive }) => isActive ? navLinkStyleActive : navLinkStyle}
                                    onClick={() => {
                                        dispatch(setEducatorPageTitle(item.educatorName));
                                        dispatch(setMobileNav(false))
                                    }}>
                                    {item.icon}
                                    <span className="sidebar_text_style">{item.educatorName}</span>
                                </NavLink>
                            ))
                        }
                    </nav>

                    <div className='absolute left-0 flex justify-center w-full px-3 bottom-2'>
                        <button
                            className="flex items-center justify-center w-full gap-2 py-2 text-gray-600 rounded-lg hover:bg-red-500 hover:text-white"
                            onClick={() => { !isLoading && handleLogout() }}>
                            <BiLogOutCircle size={28} />
                            <span className='hidden text-medium lg:block'>{t('Sidenavbar.Logout')}</span>
                        </button>
                    </div>
                </div>
            </Drawer>
        </>

    )
}

export default DrawerSidebar
