import { useSelector } from 'react-redux'
import WorkerIndex from '../worker/Index'
import CustomerIndex from '../customer/Index'
import AdminIndex from '../admin/Index'

const Index = (props) => {
    const { userInfo } = useSelector((state) => state.auth)

    let index = "";
    if (userInfo?.username) {
        let role = (userInfo.role)?userInfo.role:localStorage.getItem('role');
        if (role == "worker") {
            index = <WorkerIndex action={props.action} />
        } else if (role == "customer") {
            index = <CustomerIndex action={props.action} />
        } else if (role == "admin") {
            index = <AdminIndex action={props.action} />
        }
    }
    
    return (
        index
    )
}
export default Index
