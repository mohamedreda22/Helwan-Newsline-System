import axios from "axios";
import React, { useState, useEffect } from "react";
import delete_icon from "../assets/icons/delete.svg";
import "../styles/Articles.css";
import Simplert from "react-simplert";
import { Table, Modal } from "react-bootstrap";
import EditSource from "../pages/EditSource";
 
const Sources = () => {
  const [sources, setSources] = useState([]);
const [showEditModal, setShowEditModal] = useState(false);
const [editSource, setEditSource] = useState(null);
const [errorAlert, setErrorAlert] = useState(false);
const [colleges, setColleges] = useState([]);
const [departments, setDepartments] = useState([]);

  const fetchSources = async () => {
    try { 
      const response = await axios.get(
        "http://localhost:9090/university/sources"
      );
      setSources(response.data);
    } catch (error) {
      console.error("Error fetching sources:", error);
      setErrorAlert(true); 
    }
  };
  const fetchColleges = async ()=>{
    try{
      const response = await axios.get(
        "http://localhost:9090/university/colleges"
      );
      setColleges(response.data);
    }catch(error){
      console.error("Error fetching colleges:", error);
      setErrorAlert(true);
    }
  
  }
  const fetchDepartments =async ()=>{
    try{
      const response = await axios.get(
        "http://localhost:9090/university/departments"
      );
      setDepartments(response.data);
    }catch(error){
      console.error("Error fetching departments:", error);
      setErrorAlert(true);
    }
  
  }

  useEffect(() => {
    fetchSources();
    fetchColleges();
    fetchDepartments();
  }, []);

  const handleDeleteSource = async (sourceId) => {
    try {
      // Optimistically remove the article from the UI
      setSources(sources.filter((source) => source.source_id !== sourceId));

      const response = await axios.delete(
        `http://localhost:9090/university/sources/${sourceId}`
      );

      if (response && (response.status === 202 || response.status === 200)) {
        setShowEditModal(false); 
      } else {
        throw new Error("An error occurred while deleting the source.");
      }
    } catch (error) {
      console.error("Error deleting source:", error);
      setErrorAlert(true); 
      fetchSources();
    }
  };

  const handleEditSource = (sourceId) => {
    const sourceToEdit = sources.find((source) => source.source_id === sourceId);
    setEditSource(sourceToEdit);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditSource(null);
  };

  return (
    <>
      <div className="mt-2">
        <div className="total-events">عدد الناشرين : <span>{sources.length}</span></div>

        <Table responsive hover dir="rtl"   style={{marginBottom:"10px"}}>
          <thead>
            <tr>
              <th>الاسم الكامل</th>
              <th>البريد الالكتروني</th>
              <th>الكلية</th>   
              <th>القسم</th>           
              <th>مسؤول عن</th>
              <th>حذف</th>
              <th>تعديل</th>
            </tr>
          </thead>
          <tbody>
            {sources.map((source) => (
              <React.Fragment key={source.source_id}>
              <tr>
                <td>{source.full_name}</td>
                <td>{source.email}</td>
                <td>
                  {colleges.map((college) => (
                    college.college_id === source.college_id && (
                      <span key={college.college_id}>{college.college_name}</span>
                    )
                  ))}
                </td>
                <td>
                  {departments.map((department) => (
                    department.department_id === source.department_id && (
                      <span key={department.department_id}>{department.department_name}</span>
                    )
                  ))}
                </td>
                <td>{source.source_responsible}</td>

                <td>
                  <img
                    src={delete_icon}
                    alt="Delete source"
                    className="icon"
                    onClick={() => handleDeleteSource(source.source_id)}
                  />
                </td>

                <td>
                  
                  <button className="btnsource" onClick={() => handleEditSource(source.source_id) }>تعديل</button>
                </td>
              </tr>
               <tr>
               <td colSpan="9"></td> {/* هذا العنصر لإنشاء الفاصل بين الصفوف */}
             </tr>
             </React.Fragment>
            ))}
          </tbody>
        </Table>

        <Modal dir="rtl" show={showEditModal} onHide={handleCloseEditModal}>
          <Modal.Header closeButton>
            <div className="d-flex justify-content-between align-items-center w-100">
              <Modal.Title>تعديل  الناشر</Modal.Title>
            </div>
          </Modal.Header>
          <Modal.Body>
            {editSource && (
              <EditSource sourceId={editSource.source_id} onClose={handleCloseEditModal} />
            )}
          </Modal.Body>
        </Modal>

        {/* Error Simplert */}
        <Simplert
          showSimplert={errorAlert}
          type="error"
          title="Error"
          message="An error occurred while fetching or deleting articles."
          onClose={() => setErrorAlert(false)}
          customCloseBtnText="Close"
        />
      </div>
    </>
  );
};

export default Sources;