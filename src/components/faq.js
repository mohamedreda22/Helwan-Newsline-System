import React, { useState, useEffect } from "react";
import axios from "axios";
import FaqItem from './faqItem';
import EditFaq from "./editFaq";
import "../styles/Faq.css"; 
import AddFaq from "./addFaq";
import SideBar from '../layouts/SideBar';
import usePagination from '../hooks/usePagination';
import arrow_left from '../assets/icons/arrow_circle_left.svg';
import arrow_right from '../assets/icons/arrow_circle_right.svg';

function FAQs() {
  const [faqs, setFAQs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [faqIdToEdit, setFaqIdToEdit] = useState(null);
  const [editedFaq, setEditedFaq] = useState(null);
  const [showAddFaq, setShowAddFaq] = useState(false); 
  const [totalFaqs, setTotalFaqs] = useState(0);
  const faqsPerPage = 4; 

  // Pagination hook
  const {
    currentPage,
    totalPages,
    goToPage,
    goToFirstPage,
    goToLastPage,
  } = usePagination(totalFaqs, faqsPerPage);
 

  useEffect(() => {
    fetchFAQs();
  }, [currentPage]);

  useEffect(() => {
    if (isEditing && faqIdToEdit) {
      const faqToEdit = faqs.find((faq) => faq.id === faqIdToEdit);
      setEditedFaq(faqToEdit);
    }
  }, [isEditing, faqIdToEdit, faqs]);

  const renderFaqs = () => {
    return faqs.map((faq) => (
      <FaqItem key={faq.id} faq={faq} onDelete={handleDeleteFAQ} onEdit={handleEditFAQ} />
    ));
  };

  const handleSave = async () => {
    try {
        const updatedFAQ = {
          id: editedFaq.id,
          question: editedFaq.question,
          answer: editedFaq.answer,
          source_id: editedFaq.source_id,
        };
        await axios.put(`http://localhost:9090/university/faqs/${editedFaq.id}`, updatedFAQ);
      fetchFAQs();
      handleCancelEdit();

    } catch (error) {
      setError("An error occurred while updating FAQ. Please try again later.");
    }
  };

  const fetchFAQs = async () => {
    try {
      const response = await axios.get(`http://localhost:9090/university/faqs?page=${currentPage-1}&size=${faqsPerPage}`);
      const response1 = await axios.get('http://localhost:9090/university/faqs');
      setFAQs(response.data);
      setTotalFaqs(response1.data.length); 
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
      setError("An error occurred while fetching FAQs. Please try again later.");
      setIsLoading(false);
    }
  };

  const handleEditFAQ = (faqId) => {
    setIsEditing(true);
    setFaqIdToEdit(faqId);
    const faqToEdit = faqs.find((faq) => faq.id === faqId);
    setEditedFaq(faqToEdit);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setFaqIdToEdit(null);
    setEditedFaq(null); 
  };

  const handleDeleteFAQ = async (faqId) => {
    try {
      await axios.delete(`http://localhost:9090/university/faqs/${faqId}`);
      fetchFAQs();
      console.log("Deleted succusefuly" )
    } catch (error) {
      console.error("Error deleting FAQ:", error);
      setError("An error occurred while deleting the FAQ. Please try again later.");
    }
  };

  return (
    <div className={`faqs-page ${isEditing && faqIdToEdit && editedFaq ?  'blur-background' : ''}`}>
      {isEditing && faqIdToEdit && editedFaq ? (
        <EditFaq faq={editedFaq} onCancel={handleCancelEdit}  onSave={handleSave}/>
      ) : (
        <div >
        <SideBar/>
          <h2></h2>{/*HIGH IMPORTANT DON'T DARE TO REMOVE IT 💀*/ }
          <h1 className="header" dir="rtl">الاسئلة الشائعة</h1>
          <div className="total-faqs">
            <h3>إجمالي الأسئلة: {totalFaqs}</h3>
          </div>
          {isLoading && <p className="loading-text">جاري تحميل الأسئلة...</p>}
          {error && <p className="error-text">{error}</p>}
          {!isLoading && !error && faqs.length === 0 && (
            <p className="empty-text">لا توجد أسئلة شائعة في الوقت الحالي.</p>
          )}
          <div className="faqs-container" style={{}}>
            <div className="add-faq-btn-container">
              <button
                className="add-faq-btn"
                onClick={() => setShowAddFaq(!showAddFaq)}
              >
                {showAddFaq ? "إلغاء -" : "إضافة سؤال شائع +"}
              </button>
              {showAddFaq && <AddFaq onClose={() => setShowAddFaq(false)} />}
            </div>
            <table id="faq-table" className="faq-table">
            <thead>
                <tr>
                  <th>&emsp;&emsp;
                   السؤال / الاجابة &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                 تعديل&emsp;
                حذف
                 </th>
                </tr>
              </thead>
              <tbody>
                {renderFaqs()}
              </tbody>
            </table>
            {totalFaqs > faqsPerPage && (
              <div className="pagination">
                  <img src={arrow_left} onClick={goToFirstPage} alt="Left Arrow" className="arrow-icon" />
                  <div className="page-numbers">
                      {Array.from({ length: totalPages }, (_, index) => (
                          <span
                              key={index + 1}
                              className={`page-btn ${currentPage === index + 1 ? 'active' : ''}`}
                              onClick={() => goToPage(index + 1)}
                              disabled={currentPage === index + 1}

                          >
                              {index + 1}
                          </span>
                      ))}
                     </div>
              <img src={arrow_right} onClick={goToLastPage} alt="Right Arrow" className="arrow-icon" />
                            </div>

                                     )}
          </div>
        </div>
      )}
    </div>
  );
}

export default FAQs;
