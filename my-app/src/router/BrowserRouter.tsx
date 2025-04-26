import { createBrowserRouter } from "react-router-dom";
import RoomPage from "../pages/Home";
import BookingPage from "../pages/Booking";
import { AuthLayout } from "../layout/Authlayout";
const router = createBrowserRouter([
    {
        element:<AuthLayout/>,
        children:[
            {
            index:true,
            path:'/',
            element: <RoomPage/>,

        },{
            path:'/booking',
            element: <BookingPage/>,
        }
    ]
    }
]);

export default router;