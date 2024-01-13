import { useSelector } from 'react-redux'
import TaskIndex from './List.js';
import WorkerIndex from './worker/List.js';

const TaskList = () => {
    const { userInfo } = useSelector((state) => state.auth)
    const role = (userInfo) ? userInfo.role : localStorage.getItem('role');
    return (
        (role == "admin") ? <TaskIndex action="list" /> : <WorkerIndex action="list" />
    )
}
export default TaskList
