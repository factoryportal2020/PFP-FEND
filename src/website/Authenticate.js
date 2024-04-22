// Authenticate.js
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import Header from './components/layouts/Header'
import Home from './pages/Home'
import Login from './pages/visitors/login/Login'

const Authenticate = () => {
    const { userInfo, userToken, permissions } = useSelector((state) => state.websiteAuth)
    const { adminInfo, adminToken } = useSelector((state) => state.adminAuth)
    const [curAdminInfo, setCurAdminInfo] = useState(adminInfo);
    const [curUserInfo, setCurUserInfo] = useState(userInfo);

    // console.log(adminInfo);
    useEffect(() => {
        setCurUserInfo(userInfo);
        setCurAdminInfo(adminInfo);
    }, [adminInfo, userInfo])
    // show unauthorized screen if no user is found in redux store
    if (!curUserInfo && !userToken && curAdminInfo) {
        return (
            <Login />
        )
    }

    // returns child route elements
    return (
        <Outlet />
    )
}
export default Authenticate
