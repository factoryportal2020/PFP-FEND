import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useGetUserDetailsQuery } from '../../app/services/auth/authService.js';
import HeaderComponent from './HeaderComponent.js';
import { setCredentials } from '../../features/auth/authSlice';

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth)
  const [usersInfo, setUsersInfo] = useState(userInfo);


  const dispatch = useDispatch()

  // automatically authenticate user if token is found
  const { data, isFetching } = useGetUserDetailsQuery('userDetails', {
    // perform a refetch every 15mins
    pollingInterval: 900000,
  })

  // console.log(userInfo) // user object
  useEffect(() => {
    if (data) {
      // setInterval(() => {
      dispatch(setCredentials(data.data))
      // }, 5000);

    }
  }, [data, dispatch])

  useEffect(() => {
    setUsersInfo(userInfo);
  }, [userInfo])


  return (
    (usersInfo) ? <HeaderComponent userInfo={usersInfo} /> : ""
  )
}
export default Header
