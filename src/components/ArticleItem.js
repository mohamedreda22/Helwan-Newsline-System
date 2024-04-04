import React from 'react';
import delete_icon from '../assets/icons/delete.svg';
import edit_icon from '../assets/icons/edit.svg';
import '../styles/EventItem.css'; 

function ArticleItem({ article, onDelete, onEdit }) {
    const handleDelete = () => {
        onDelete(article.article_id);
    };

    const handleEdit = () => {
        onEdit(article.article_id);
    };

    const formatDateTime = (dateTimeString) => {
        const dateTime = new Date(dateTimeString);
        const day = dateTime.getDate();
        const month = dateTime.toLocaleString('default', { month: 'long' });
        return { day, month };
    };

    const { day, month} = formatDateTime(article.article_creation_date);

    return (
        <tr> 
            <td>
                <div className="event-item-container" dir='rtl'>
                    <img src={article.article_image_path} className='event-item-image' alt='Article Image' style={{ height: "100px", width: "100px", maxWidth: "15%" }}/>
                    <div className="event-item-address" >{article.article_address}</div>

                    <div className="event-item-description">{article.article_content}</div>
                    <div className="event-source-content">{article.source_string}</div>
                    
                    <img src={edit_icon} alt="Edit Article" className="edit-icon" onClick={handleEdit} />
                    <img src={delete_icon} alt="Delete Article" className="delete-icon" onClick={handleDelete}/>
                </div>
            </td>
        </tr>
    );
}

export default ArticleItem;
