import React from "react";
import Modal from "react-modal";

export const LoginModal = ({modalIsOpen, setModalIsOpen}) => {

    return (
        <Modal
            isOpen = {modalIsOpen}
            onRequestClose = {() => setModalIsOpen(false)}
            contentLabel = "Login Modal"
            closeTimeoutMS = {200}
            className="loginmodal"
            ariaHideApp={false}
        >
            <h3 className="loginmodal__title">You need to be connected to see our products</h3>
            <button className="loginmodal__button" onClick={() => setModalIsOpen(false)}>Close</button>
        </Modal>
    )
}