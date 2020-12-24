import {useState, useCallback} from 'react';

const Modal = ({children, modal, heading}) => {
    const [open, setOpen] = useState(false);
    return (
        <>
        <button onClick={() => setOpen(true)}>{modal}</button>
        <div className={`modal ${open ? "open" : ''}`} onClick={() => setOpen(false)}>
            <div className={`modal_container`} onClick={(e) => e.stopPropagation()}>
                <h2>{heading}</h2>
                {children}
            <button onClick={() => setOpen(false)}>cancel</button>
            </div>
        </div>
        </>
    )
}

export default Modal;