import React from "react";
import delete_icon from "../assets/icons/delete.svg";
import "../styles/FAQItem.css";
import editIcon from "../assets/icons/edit.svg";

const FaqItem = ({ question, answer, onDelete ,onEdit}) => {
    
  const handleDelete = () => {
    onDelete(question); 
  };
    const handelEdit = () => {  
        onEdit(question, answer);
    };

  return (
    <div className="faq-item" dir="rtl">
      <div className="faq-details">
        <h3 className="faq-question">{question}</h3>
        <p className="faq-answer">{answer}</p>
      </div>
      <div className="faq-actions">
        <img 
          src={delete_icon}
          alt="Delete FAQ"
          className="delete-icon"
          onClick={handleDelete}
        />
        <img 
            src={editIcon}
            alt="Edit FAQ"
            className="edit-icon"
            onClick={handelEdit}
        
        />
      </div>
    </div>
  );
};

export default FaqItem;
