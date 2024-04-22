// Authenticate.js
import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'


const Unauthenticate = () => {
    const { userInfo, userToken } = useSelector((state) => state.auth)

    return (
        <div data-page-version="login">
            {
                (!userInfo && !userToken) ? <Outlet /> : <Navigate to={'/profile'} />
            }
        </div>
    )
}
export default Unauthenticate
