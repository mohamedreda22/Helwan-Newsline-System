import { useState } from 'react';
function useAlert() {
    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [customCloseBtnText, setCustomCloseBtnText] = useState('');

    const showAlertHandler = (type, title, message, customCloseText) => {
        setAlertType(type);
        setAlertTitle(title);
        setAlertMessage(message);
        setCustomCloseBtnText(customCloseText);
        setShowAlert(true);
    };

    const hideAlertHandler = () => {
        setShowAlert(false);
    };

    return {
        showAlert,
        showAlertHandler,
        hideAlertHandler,
        alertType,
        alertTitle,
        alertMessage,
        customCloseBtnText
    };
}

export default useAlert;
