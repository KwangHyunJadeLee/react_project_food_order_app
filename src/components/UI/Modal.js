import React from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

// Components for React Portal
const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onClose}/>;
};

const ModalOverlay = (props) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};

// the value to set up portal position.
const porterElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    // adding React Fragment & React Portal
    // The content icluded in Cart component, so the content should be called by props.children.
    <React.Fragment>
      {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>, porterElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        porterElement
      )}
    </React.Fragment>
  );
};

export default Modal;
