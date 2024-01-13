// Authenticate.js
import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'


const Unauthenticate = () => {
    const { userInfo, userToken } = useSelector((state) => state.auth)

    if (!userInfo && !userToken) {
        return (
            <Outlet />
        )
    }
    else {
        return (
            <Navigate to={'/profile'} />
        )
    }
}
export default Unauthenticate
