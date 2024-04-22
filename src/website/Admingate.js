// Authenticate.js
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Outlet } from 'react-router-dom'
// import { Navigate } from 'react-router-dom'
// import Header from './components/layouts/Header'
// import HeaderComponent from './components/layouts/Header'
// import { setCredentials } from './features/auth/authSlice'
import adminSlice from './features/auth/adminSlice'
import { getAdmin } from './features/auth/adminAuctions'

const Admingate = (props) => {
    const { adminInfo, adminToken } = useSelector((state) => state.adminAuth)



    if ((!adminInfo && !adminToken) || adminInfo == null || adminToken == null) {
        return (
            <div className='row login-row'>
                <div className='col-sm login-half-round vertical right'>
                    <div className='login-half-round-content'>
                        <a href="/">
                            Pocket<br />Poche<br />Admin
                        </a>
                        <h5 className='grey'>Task Management Portal</h5>
                    </div>
                </div>
                <div className='col-sm login-form-card m-t-300'>
                    <div className="card login-card">
                        <div className="login-card-header">
                            <h6>Website has not launched or Unauthorized</h6>
                            <h6>Contact  <b>Pocket Poche Admin</b> </h6>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <Outlet />
    )


}
export default Admingate
