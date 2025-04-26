import {useEffect} from 'react';

import {useNavigate,useLocation,Outlet} from 'react-router-dom';

export const AuthLayout = () => {
    const authPath = ['/login','/register','/booking','/room'];
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const path = window.location.pathname;


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!authPath.includes(path) && !token) {
            navigate('/room');
        }

    },[pathname]);

    return <div> <Outlet/> </div>



}