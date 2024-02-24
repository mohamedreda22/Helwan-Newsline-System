import { Link } from 'react-router-dom';
import FAQItem from './faqItem';

const FAQ = ({ currentFAQs, handleDeleteFAQ, handleEditFAQ }) => (
  <div className="container">
    <h2>جميع الاسئلة الشائعة</h2>
    <div className="total-faqs">
      <button>
        <Link to="/admin/add_question" className="btn btn-primary add-new">
          إضافة أسئلة جديدة
        </Link>
      </button>
    </div>
    <tbody>
      {currentFAQs.map((faq) => (
        <FAQItem
          key={faq.faq_id}
          faq={faq}
          onDelete={handleDeleteFAQ}
          onEdit={handleEditFAQ}
        />
      ))}
    </tbody>
  </div>
);

export default FAQ;
