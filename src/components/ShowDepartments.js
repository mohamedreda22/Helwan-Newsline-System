import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import axios from "axios";
import Simplert from "react-simplert";
import delete_icon from "../assets/icons/delete.svg";
import { FaPlus } from "react-icons/fa";
import NavbarSource from "../layouts/NavbarSource";
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
  const [departmentEditId, setDepartmentEditId] = useState(null);
  const [departmentName, setDepartmentName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchColleges();
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
      console.log("Response data:", response.data);
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
    } catch (error) {
      console.error("Error deleting department:", error);
      setErrorAlert({
        title: `حدث خطأ أثناء حذف القسم ${departmentName}`,
        type: "error",
      });
    }
  };

  const handleEditDepartment = (departmentId) => {
    setShowEditModal(true);
    setDepartmentEditId(departmentId);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditedDepartment(null);
  };

  const handleShowAddModal = () => {
    setShowAddModal(true);
    setEditedDepartment(null);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  const handleCollegeChange = (e) => {
    setSelectedCollege(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      if (!selectedCollege) {
        setErrorAlert(true);
        return;
      }
      const collegeId = selectedCollege;
      const response = await axios.post(
        "http://localhost:9090/university/departments",
        {
          department_name: departmentName,
          college_id: collegeId,
        }
      );
      if (response && (response.status === 201 || response.status === 200)) {
        console.log("Department added successfully:", response.data);
        setSuccessAlert(true);
        resetForm();
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.error("Error adding department:", error);
      setErrorAlert(true);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setDepartmentName("");
    setSelectedCollege("");
  };

  return (
    <div className="mt-2 container">
      <Simplert
        showSimplert={errorAlert}
        type="error"
        title="Error"
        message="  حدث خطأ ما يرجي اعادة المحاولة  والتأكد من اختيار الكلية"
        onClose={() => setErrorAlert(false)}
        customCloseBtnText="اغلاق"
      />
      <Simplert
        showSimplert={successAlert}
        type="success"
        title={"Success"}
        message="تمت إضافة القسم بنجاح"
        onClose={() => setSuccessAlert(false)}
        customCloseBtnText="تم"
      />
      <NavbarSource />
      <button type="button" className="AddDep" onClick={handleShowAddModal}>
        إضافة <FaPlus />
      </button>
      <select
        className="collagesSelector"
        onChange={handleCollegeChange}
        value={selectedCollege || ""}
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
          <div
            key={department.department_id}
            dir="rtl"
            className="dataContainer"
          >
            <div className="depName">
              <p>{department.department_name}</p>
            </div>
            <button
              type="button"
              className="edit-btn"
              onClick={() => handleEditDepartment(department.department_id)}
            >
              تعديل
            </button>
            <Button
              variant="light"
              className="delete-btn"
              onClick={() =>
                handleDeleteDepartment(
                  department.department_id,
                  department.department_name
                )
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
        <Modal.Header closeButton >
          <Modal.Title>إضافة قسم</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>اسم القسم</Form.Label>
              <Form.Control
                type="text"
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                الرجاء إدخال اسم القسم
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? (
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : (
                "إضافة القسم"
              )}
            </Button>
          </Form>
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
            departmentId={departmentEditId}
            onClose={handleCloseEditModal}
          />
        </Modal.Body>
      </Modal>
      
    </div>
  );
};

export default ShowDepartments;
