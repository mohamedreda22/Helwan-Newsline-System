import React, { useState, useEffect } from "react";
import axios from "axios";
import FaqItem from './faqItem';
import "../styles/Faq.css"; // Add your CSS file for styling
import EditFaq from "./editFaq";

function FAQs() {
  const [faqs, setFAQs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [faqsPerPage] = useState(8);
  const [isEditing, setIsEditing] = useState(false);
  const [faqIdToEdit, setFaqIdToEdit] = useState(null);
  const [editedFaq, setEditedFaq] = useState(null);

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const response = await axios.get("http://localhost:9090/university/faqs");
      setFAQs(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
      setError("An error occurred while fetching FAQs.");
      setIsLoading(false);
    }
  };

  const handleEditFAQ = async (faqId) => {
    try {
      // Set state variables for editing
      setIsEditing(true);
      setFaqIdToEdit(faqId);
      const faqToEdit = faqs.find((faq) => faq.id === faqId);
      setEditedFaq(faqToEdit);
    } catch (error) {
      console.error("Error editing FAQ:", error);
      setError("An error occurred while editing the FAQ.");
    }
  };

  const handleCancelEdit = () => {
    // Reset state variables for editing
    setIsEditing(false);
    setFaqIdToEdit(null);
    setEditedFaq(null);
  };

  const handleDeleteFAQ = async (faqId) => {
    try {
      await axios.delete(`http://localhost:9090/university/faqs/${faqId}`);
      fetchFAQs();
    } catch (error) {
      console.error("Error deleting FAQ:", error);
      setError("An error occurred while deleting the FAQ.");
    }
  };
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastFaq = currentPage * faqsPerPage;
  const indexOfFirstFaq = indexOfLastFaq - faqsPerPage;
  const currentFAQs = faqs.slice(indexOfFirstFaq, indexOfLastFaq);

  const renderPaginationButtons = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(faqs.length / faqsPerPage); i++) {
      pageNumbers.push(i);
    }
    return pageNumbers.map((number) => (
      <button
        key={number}
        className={`page-btn ${currentPage === number ? 'active' : ''}`}
        onClick={() => paginate(number)}
      >
        {number}
      </button>
    ));
  };

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  return (
    <div className={`faqs-page ${isEditing && faqIdToEdit ? 'blur-background' : ''}`}>
      {isEditing && faqIdToEdit ? (
        <EditFaq faq={editedFaq} onCancel={handleCancelEdit} />
      ) : (
        <>
          <h2>الأسئلة الشائعة</h2>
          <div className="total-faqs">
            <h3>إجمالي الأسئلة: {faqs.length}</h3>
          </div>
          {isLoading && <p className="loading-text">جاري تحميل الأسئلة...</p>}
          {error && <p className="error-text">{error}</p>}
          <div className="faqs-container">
          <table id="faq-table" className="faq-table">
          <tbody>
            {currentFAQs.map((faq) => (
              <FaqItem
                key={faq.faq_id}
                faq={faq}
                onDelete={handleDeleteFAQ}
                onEdit={handleEditFAQ}
              />
            ))}
          </tbody>
        </table>
                    
            {faqs.length > faqsPerPage && (
          <div className="pagination">
                  {renderPaginationButtons()}
          </div>
        )}
          </div>
        </>
      )}
    </div>
  );
}

export default FAQs;
