import React from 'react';

class DeleteConfirm extends React.Component {
    render() {
        return (
            <>
                <div className="modal fade show d-block" tabindex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Modal title</h5>
                                <a href="#/">
                                    <i className="fa-solid fa-close fs-4" />
                                </a>
                            </div>
                            <div className="modal-body">
                                <p>Modal body text goes here.</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary">Save changes</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>


            </>
        )
    }
}

export default DeleteConfirm;