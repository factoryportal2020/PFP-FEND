import { Link } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';
import { useDispatch } from 'react-redux';

const Pagenotfound = () => {
    const dispatch = useDispatch()

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="error-template">
                        <h1>
                            Oops!</h1>
                        <h2>
                            404 Not Found</h2>
                        <div className="error-details">
                            Sorry, an error has occured, Requested page not found!
                        </div>
                        <div className="error-actions">
                            <Link
                                onClick={() => dispatch(logout())}
                                className="btn btn-primary jewell-yellow">
                                <span className="glyphicon glyphicon-home"></span>
                                Take Me Re-login </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Pagenotfound
