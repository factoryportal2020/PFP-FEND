// Authenticate.js
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Outlet } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import Header from './components/layouts/Header'
import HeaderComponent from './components/layouts/Header'
import { setCredentials } from './features/auth/authSlice'
import { useGetUserDetailsQuery } from './app/services/auth/authService'
import StatusBar from './components/layouts/StatusBar'
import validator from './components/forms/validate'
import Login from './pages/login/Login'
import Footer from './components/layouts/Footer'

const Authenticate = () => {
    const { userInfo, userToken, permissions } = useSelector((state) => state.auth)
    const [urlMenuName, setUrlMenuName] = useState("");

    // onStatusClose(){

    // }
    // const dispatch = useDispatch()

    // // automatically authenticate user if token is found
    // const { data, isFetching } = useGetUserDetailsQuery('userDetails', {
    //     // perform a refetch every 15mins
    //     pollingInterval: 900000,
    // })

    // console.log(userInfo) // user object
    useEffect(() => {
        let urlMenuName = (window.location.pathname.split('/')[1]) ? window.location.pathname.split('/')[1] : "";
        // console.log(userInfo);
        // console.log(permissions);
        setUrlMenuName(urlMenuName);
    })
    // show unauthorized screen if no user is found in redux store
    if (!userInfo && !userToken) {
        return (
            // <Navigate to={'/login'} />
            <Login></Login>
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
            <div data-page-version="admin">

                {/* <HeaderComponent userInfo={userInfo} /> */}
                <Header />
                {
                    (permissions.includes(urlMenuName)) ?
                        <Outlet /> :
                        <>
                            <div className='content-div'>
                                <div className='row'>
                                    <div className='fs-20 text-center mt-5'>Unauthorized! Page Not found</div> :
                                </div>
                            </div>
                        </>
                }
                <Footer />
            </div>
        </>
        // : ""
    )
}
export default Authenticate
