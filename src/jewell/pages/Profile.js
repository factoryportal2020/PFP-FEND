// Profile.js
import { useSelector } from 'react-redux'
import WorkerIndex from './worker/Index'
import CustomerIndex from './customer/Index'
import AdminIndex from './admin/Index'
import Pagenotfound from './Pagenotfound'

const Profile = () => {
    const { userInfo } = useSelector((state) => state.auth)

    let index = "";
    if (userInfo?.username) {
        if (userInfo.role == "worker") {
            index = <WorkerIndex viewEncryptId={userInfo?.profile_encrypt_id} action="view" />
        } else if (userInfo.role == "customer") {
            index = <CustomerIndex viewEncryptId={userInfo?.profile_encrypt_id} action="view" />
        } else if (userInfo.role == "admin") {
            index = <AdminIndex viewEncryptId={userInfo?.profile_encrypt_id} action="view" />
        } else {
            index = "Hi " + userInfo?.username
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
