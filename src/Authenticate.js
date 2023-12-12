// Authenticate.js
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Outlet } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import Header from './jewell/components/layouts/Header'
import HeaderComponent from './jewell/components/layouts/Header'
import { setCredentials } from './jewell/features/auth/authSlice'
import { useGetUserDetailsQuery } from './jewell/app/services/auth/authService'
import StatusBar from './jewell/components/layouts/StatusBar'

const Authenticate = () => {
    const { userInfo, userToken } = useSelector((state) => state.auth)
    // let status = { show: success, type: "success", msg: message }

    // onStatusClose(){

    // }
    // const dispatch = useDispatch()

    // // automatically authenticate user if token is found
    // const { data, isFetching } = useGetUserDetailsQuery('userDetails', {
    //     // perform a refetch every 15mins
    //     pollingInterval: 900000,
    // })

    // // console.log(userInfo) // user object
    // useEffect(() => {
    //     if (data) {
    //         // setInterval(() => {
    //         dispatch(setCredentials(data))
    //         // }, 5000);

    //     }
    // }, [data, dispatch])
    // show unauthorized screen if no user is found in redux store
    if (!userInfo && !userToken) {
        return (
            <Navigate to={'/login'} />
            // <div className='row login-row'>
            //     <div className='col-sm login-half-round vertical right'>
            //         <div className='login-half-round-content'>
            //             <a href="/">
            //                 Pocket<br />Poche<br />Admin
            //             </a>
            //             <h5 className='grey'>Task Management Portal</h5>
            //         </div>
            //     </div>
            //     <div className='col-sm login-form-card mt-5'>
            //         <div className="card login-card">
            //             <div className="login-card-header">
            //                 Unauthorized
            //             </div>

            //             <span>
            //                 <NavLink to='/login'>Login</NavLink> to gain access
            //             </span>
            //         </div>
            //     </div>
            // </div>
        )
    }

    // returns child route elements
    return (

        // (userInfo) ?
        <>
            {/* <HeaderComponent userInfo={userInfo} /> */}
            <Header />
            <Outlet />
        </>
        // : ""
    )
}
export default Authenticate
