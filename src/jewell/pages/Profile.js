// Profile.js
import { useSelector } from 'react-redux'

const Profile = () => {
    const { userInfo } = useSelector((state) => state.auth)

    return (
        <div className='content-div'>

            <span>
                Welcome <strong>{userInfo?.username}!</strong> You can view this page
                because you're logged in
            </span>
        </div>
    )
}
export default Profile
