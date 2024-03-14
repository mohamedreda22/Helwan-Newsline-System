import axios from "axios";
import React , { useState, useEffect } from "react";
import edit_icon from "../assets/icons/edit.svg";
import delete_icon from "../assets/icons/delete.svg";
import "../styles/Articles.css";
import Swal from "sweetalert2";
import Simplert from "react-simplert";
import { Table, Modal} from "react-bootstrap";
import EditSource from "../pages/EditSource";
 

const Sources = () => {
const [sources, setSources] = useState([]);
const [showEditModal, setShowEditModal] = useState(false);
const [editSource, setEditSource] = useState(null);
const [errorAlert, setErrorAlert] = useState(false);

const fetchSources = async () => {
  try {
    const response = await axios.get(  
      "http://localhost:9090/university/sources"
    );
    setSources(response.data);
  } catch (error) {
    console.error("Error fetching Sources:", error);
    setErrorAlert(true); 
  }
}; 

useEffect(() => {
  fetchSources();
}, []);

 
const handleDeleteSource = async (sourceId) => {
  try {
    // Optimistically remove the article from the UI
    setSources(sources.filter(source => source.source_id !== sourceId));

    const response = await axios.delete(
      `http://localhost:9090/university/sources/${sourceId}`
    );

    if (response && (response.status === 202||response.status === 200)) {
      setShowEditModal(false); 
    } else {
      throw new Error("An error occurred while deleting the source.");
    }
  } catch (error) {
    console.error("Error deleting source:", error);
    setErrorAlert(true);
    // Restore the article if the deletion fails
    fetchSources();
  }
};


const handleEditSource = (sourceId) => {
  const SourceToEdit = sources.find((source) => source.source_id === sourceId);
   setEditSource(SourceToEdit );
  setShowEditModal(true);
};

const handleCloseEditModal = () => {
  setShowEditModal(false);
  setEditSource(null);
};
  return (
    <>
      <div className="mt-2">
        <div className="notifNum"> عدد الناشرين :{sources.length} </div>
        
        <Table  responsive hover dir="rtl">
        <tbody>
        {sources.map((source) => (
          <tr key={source.source_id}>
             <td>{source.source_id}</td>
              <td>{source.source_department_id}</td> 
              <td>{source.college_id}</td>
              <td>{source.source_full_name} </td> 
              <td>{source.source_email}</td> 
             
             


              <td>
                <img
                  src={delete_icon}
                  alt="Delete article"
                  className="icon"
                  onClick={() => handleDeleteSource(source.source_id)}
                />
              </td>

              <td>
                <img
                  src={edit_icon}
                  alt="Edit article"
                  className="icon"
                  onClick={() => handleEditSource(source.source_id)}
                />
              </td>
          </tr>
        
        
          ))}
        </tbody>
      </Table>

      <Modal dir="rtl" show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <div className="d-flex justify-content-between align-items-center w-100">
            <Modal.Title>تعديل الناشر</Modal.Title>
          </div>
        </Modal.Header>
        <Modal.Body>
          {editSource && (
            <EditSource  articleId={editSource.source_id} onClose={handleCloseEditModal} />
          )}
        </Modal.Body>
      </Modal>


      <Simplert
          showSimplert={errorAlert}
          type="error"
          title="Error"
          message="An error occurred while fetching or deleting sources."
          onClose={() => setErrorAlert(false)}
          customCloseBtnText="Close"
        />
      </div>
    </>
  );
};

export default Sources;