import { useSelector } from 'react-redux'
import TaskIndex from './Index.js';
import WorkerIndex from './worker/Index.js';

const TaskForm = (props) => {
    const { userInfo } = useSelector((state) => state.auth)
    const role = (userInfo) ? userInfo.role : localStorage.getItem('role');

    return (
        (role == "admin") ? <TaskIndex action={props.action} viewEncryptId={props.viewEncryptId}
            afterChangedStatusTrigger={() => props.afterChangedStatusTrigger()} /> :
            <WorkerIndex action={props.action} viewEncryptId={props.viewEncryptId}
                afterChangedStatusTrigger={() => props.afterChangedStatusTrigger()} />
    )
}
export default TaskForm
