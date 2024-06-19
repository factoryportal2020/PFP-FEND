// Profile.js
import { useSelector } from 'react-redux'
import CustomerIndex from './customer'
import Pagenotfound from './Pagenotfound'
import { useEffect, useState } from 'react'

const Profile = () => {
    const { userInfo } = useSelector((state) => state.websiteAuth)
    // const [curUserInfo, setCurUserInfo] = useState(userInfo)

    // useEffect(() => {
    //     if (userInfo) {
    //         // console.log(userInfo);
    //         setCurUserInfo(userInfo)
    //     }
    // }, [userInfo])

    // console.log(curUserInfo);
    let index = "";
    if (userInfo?.username) {
        if (userInfo.role == "customer") {
            index = <CustomerIndex viewEncryptId={userInfo?.profile_encrypt_id} action="view" />
        } else {
            index =
                <div className='mt-20 m-b-40 p-5'>
                    <h2>Hi {userInfo?.username} </h2>
                    <h6>Your Profile page not support in website view.. Go to your Admin login <a href="/">Admin</a></h6>
                </div>
        }
    }

    return (
        <div className='content-div'>
            {
                (userInfo?.username) ?
                    index
                    :
                    <Pagenotfound />
            }
        </div>
    )
}
export default Profile
