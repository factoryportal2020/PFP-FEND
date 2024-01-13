import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { useGetUserDetailsQuery } from '../../app/services/auth/authService.js';
import HeaderComponent from './HeaderComponent.js';
import { logout, setCredentials } from '../../features/auth/authSlice';
import LoginIndex from '../../pages/login/Login.js';
import Delayed from './Delayed.js';

const Header = () => {
  const { userInfo} = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  // automatically authenticate user if token is found
  const { data, isFetching } = useGetUserDetailsQuery('userDetails', {
    // perform a refetch every 15mins
    pollingInterval: 900000,
  })

  // console.log(userInfo) // user object
  useEffect(() => {
    if (data) {
      console.log(data);
      // setInterval(() => {
      dispatch(setCredentials(data.data))
      // }, 5000);

    }
  }, [data, dispatch])


  return (
    (userInfo) ? <HeaderComponent userInfo={userInfo} /> : ""
  )
}
export default Header
