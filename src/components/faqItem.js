import React from "react";
import edit_icon from '../assets/icons/edit.svg';
import delete_icon from '../assets/icons/delete.svg';
import '../styles/FAQItem.css';

const FaqItem = ({ faq, onDelete, onEdit }) => {
  const handleEdit = () => {
    onEdit(faq.id);
}


  const handleDelete = () => {
    onDelete(faq.id);
}

  return (
    <tr>
      <td >
      <div className="faq-item-container" dir="rtl" >
        <div>
            <div className="faq-item-question" >{faq.question}</div>
            <div className="faq-item-answer">{faq.answer}</div>         
      </div>  
      <div style={{display:"flex"}}> 
        <img src={edit_icon} alt="Edit" className="edit-icon" onClick={handleEdit}
        />
        <img src={delete_icon} alt="Delete" className="delete-icon" onClick={handleDelete}
        />

</div>   </div>
       </td>
    </tr>
  );
};

export default FaqItem;
