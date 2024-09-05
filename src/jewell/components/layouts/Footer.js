import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useGetUserDetailsQuery } from '../../app/services/auth/authService.js';
import FooterComponent from './FooterComponent.js';
import { setCredentials } from '../../features/auth/authSlice.js';

const Footer = () => {
  // const { userInfo } = useSelector((state) => state.auth)
  // const [usersInfo, setUsersInfo] = useState(userInfo);


  // const dispatch = useDispatch()

  // // automatically authenticate user if token is found
  // const { data, isFetching } = useGetUserDetailsQuery('userDetails', {
  //   // perform a refetch every 15mins
  //   pollingInterval: 900000,
  // })

  // // console.log(userInfo) // user object
  // useEffect(() => {
  //   if (data) {
  //     // setInterval(() => {
  //     dispatch(setCredentials(data.data))
  //     // }, 5000);

  //   }
  // }, [data, dispatch])

  // useEffect(() => {
  //   setUsersInfo(userInfo);
  // }, [userInfo])


  return (
    <div class="footer">
      <div class="copyright">
        <p className="mb-0 theme-brown">Powered by <a href="http://68o.be7.mytemp.website" className='theme-red' target="_blank">Tusker Apps</a></p>
      </div>
    </div>
    // (usersInfo) ? <FooterComponent userInfo={usersInfo} /> : ""
  )
}
export default Footer
