import React, { useEffect, useState, useRef, forwardRef } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Category from "../Category";
import StatusBar from "../StatusBar";
import Preloader from "../Preloader";

// function CategoryModal(props) {
const CategoryModal = (props) => {

    const [show, setShow] = useState(false);

    const catArrayRef = useRef(props.catArray);

    const handleClose = () => {setShow(false); props.setCloseModal()};
    const handleShow = () => { setShow(true); setPreLoading(true); };

    const clearFilter = () => { setShow(true); setPreLoading(true); catArrayRef.current = []; props.setFilterCat([]); handleClose() };

    const [status, setStatus] = useState({ show: false, type: 'success', msg: '' })
    const onStatusClose = () => setStatus({ show: false, type: 'success', msg: '' });

    const [preLoading, setPreLoading] = useState(true);

    const [catArray, setCatArray] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setPreLoading(false);
        }, 2000);
    }, [preLoading]);


    useEffect(() => {
        console.log(catArrayRef);
        props.setFilterCat(catArrayRef.current);
    }, [catArrayRef.current]);

    return (
        <>
            <button type="button" onClick={handleShow}
                className="submit__btn">Category  <i className="fa fa-angle-down"></i>
            </button>

            <Modal
                show={show}
                className="cat-filter-modal"
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered={true}
            >
                {/* <Modal.Header closeButton> */}
                <Modal.Header >
                    <Modal.Title className="w-100"><span className="fs-16">Choose Categories</span></Modal.Title>
                    <Button className="clear__btn ms-auto me-auto" onClick={clearFilter}>
                        Clear
                    </Button>
                    <Button className="submit__btn" onClick={handleClose}>
                        Submit
                    </Button>
                </Modal.Header>
                <Modal.Body>
                    {preLoading ? <Preloader /> : ""}
                    <Category ref={catArrayRef} for="filter" />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" className="clear__btn" onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    );
};

export default CategoryModal;
