import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import delete_icon from "../assets/icons/delete.svg";
import Simplert from "react-simplert";
import { FaPlus } from "react-icons/fa";
import AddDepartment from "./AddDepartmentForm";
import EditDepartment from "./EditDepartment";
import "../styles/ShowDepartments.css";

const ShowDepartments = () => {
  const [departments, setDepartments] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editedDepartment, setEditedDepartment] = useState(null);
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [userRole, setUserRole] = useState(""); 


  useEffect(() => {
    fetchColleges();
    const role = localStorage.getItem("userRole");
    setUserRole(role);
  }, []);

  useEffect(() => {
    if (selectedCollege) {
      fetchDepartments(selectedCollege);
    }
  }, [selectedCollege]);

  const fetchDepartments = async (collegeId) => {
    try {
      const response = await axios.get(
        `http://localhost:9090/university/colleges/getAllDepartments/${collegeId}`
      );
      setDepartments(response.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
      setErrorAlert(true);
    }
  };

  const fetchColleges = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9090/university/colleges"
      );
      setColleges(response.data);
    } catch (error) {
      console.error("Error fetching colleges:", error);
    }
  };

  const handleDeleteDepartment = async (departmentId, departmentName) => {
    try {
      await axios.delete(
        `http://localhost:9090/university/departments/${departmentId}`
      );
      fetchDepartments(selectedCollege);
      setSuccessAlert({
        title: `تم حذف القسم ${departmentName} بنجاح`,
        type: "success",
      });
    } catch (error) {
      console.error("Error deleting department:", error);
      setErrorAlert({
        title: `حدث خطأ أثناء حذف القسم ${departmentName}`,
        type: "error",
      });
    }
  };

  const handleEditDepartment = (department) => {
    setEditedDepartment(department);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditedDepartment(null);
  };

  const handleShowAddModal = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  const handleCollegeChange = (e) => {
    setSelectedCollege(e.target.value);
  };

  return (
    <div className="mt-2 container">
      
      <button type="button" className="AddDep" onClick={handleShowAddModal}>
        إضافة <FaPlus />
      </button>
      <select
        className="collagesSelector"
        onChange={handleCollegeChange}
        value={selectedCollege}
      >
        <option value="">اختر الكلية</option>
        {colleges.map((college) => (
          <option key={college.college_id} value={college.college_id}>
            {college.college_name}
          </option>
        ))}
      </select>
      <div>
        {departments.map((department) => (
          <div key={department.id} dir="rtl" className="dataContainer">
            <div className="depName">
              <p>{department.name}</p>
            </div>
            <button
              type="button"
              className="edit-btn"
              onClick={() => handleEditDepartment(department)}
            >
              تعديل
            </button>
            <Button
              variant="light"
              className="delete-btn"
              onClick={() =>
                handleDeleteDepartment(department.id, department.name)
              }
            >
              <img src={delete_icon} alt="Delete" /> حذف
            </Button>
          </div>
        ))}
      </div>
      <Modal
        dir="rtl"
        show={showAddModal}
        onHide={handleCloseAddModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>إضافة قسم</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddDepartment onClose={handleCloseAddModal} />
        </Modal.Body>
      </Modal>
      <Modal
        dir="rtl"
        show={showEditModal}
        onHide={handleCloseEditModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>تعديل قسم</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditDepartment
            department={editedDepartment}
            onClose={handleCloseEditModal}
          />
        </Modal.Body>
      </Modal>
      <Simplert
        showSimplert={errorAlert}
        type="error"
        title="Error"
        message="حدث خطأ ما يرجي اعادة المحاولة"
        onClose={() => setErrorAlert(false)}
        customCloseBtnText="اغلاق"
      />
      <Simplert
        showSimplert={successAlert}
        type="success"
        title={successAlert.title}
        onClose={() => setSuccessAlert(false)}
        customCloseBtnText="تم "
      />
    </div>
  );
};

export default ShowDepartments;
