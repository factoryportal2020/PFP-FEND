// Authenticate.js
import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import LoginIndex from './jewell/pages/login/LoginIndex'

const Unauthenticate = () => {
    const { userInfo, userToken } = useSelector((state) => state.auth)

    if (!userInfo && !userToken) {
        return (
            <LoginIndex />
        )
    }
    else {
        return (
            <Navigate to={'/profile'} />
        )
    }
}
export default Unauthenticate
