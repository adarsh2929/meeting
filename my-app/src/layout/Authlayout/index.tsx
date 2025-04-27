import {useEffect} from 'react';

import {useNavigate,useLocation,Outlet} from 'react-router-dom';

export const AuthLayout = () => {
    const authPath = ['/booking','/room'];
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const path = window.location.pathname;


    useEffect(() => {
        if (!authPath.includes(path)) {
            navigate('/room');
        }

    },[pathname]);

    return <div> <Outlet/> </div>



}