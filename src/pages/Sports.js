import React, { useState, useEffect } from "react";
import axios from "axios";
import SportItem from "./SportItem";
import EditSport from "./EditSport";
import "../styles/Events.css";
import usePagination from '../hooks/usePagination';
import arrow_left from '../assets/icons/arrow_circle_left.svg';
import arrow_right from '../assets/icons/arrow_circle_right.svg';
import SideBar from "../components/SideBar";

function Sports() {
  const [sports, setSports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [sportIdToEdit, setSportIdToEdit] = useState(null);
  const [editedSport, setEditedSport] = useState(null);
  const [totalSports, setTotalSports] = useState(0);

  const sportsPerPage = 9;

  // Pagination hook
  const {
    currentPage,
    totalPages,
    goToPage,
    goToFirstPage,
    goToLastPage,
  } = usePagination(totalSports, sportsPerPage);

  const startIndex = (currentPage - 1) * sportsPerPage;
  const endIndex = startIndex + sportsPerPage - 1;

  const renderSports = () => {
    return sports.slice(startIndex, endIndex + 1).map((sport) => (
      <SportItem key={sport.sport_id} sport={sport} onDelete={handleDeleteSport} onEdit={handleEditSport} />
    ));
  };

  useEffect(() => {
    fetchSports();
  }, []);

  useEffect(() => {
    if (isEditing && sportIdToEdit) {
      const sportToEdit = sports.find((sport) => sport.sport_id === sportIdToEdit);
      setEditedSport(sportToEdit);
    }
  }, [isEditing, sportIdToEdit, sports]);
  

  const fetchSports = async () => {
    try {
      const response = await axios.get("http://localhost:9090/university/sports");
      setTotalSports(response.data.length);
      setSports(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching sports:", error);
      setError("An error occurred while fetching sports.");
      setIsLoading(false);
    }
  };

  const handleDeleteSport = async (sportId) => {
    try {
      await axios.delete(`http://localhost:9090/university/sports/${sportId}`);
      fetchSports();
    } catch (error) {
      console.error("Error deleting sport:", error);
      setError("An error occurred while deleting the sport.");
    }
  };

  const handleEditSport = (sportId) => {
    setIsEditing(true);
    setSportIdToEdit(sportId);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setSportIdToEdit(null);
  };

  const handleSave = async (updatedSportData) => {
    try {
      await axios.put(`http://localhost:9090/university/sports/${updatedSportData.sport_id}`, updatedSportData);
      fetchSports();
      handleCancelEdit();
      // Update the sports state with the updated data
      setSports(prevSports => prevSports.map(sport => sport.sport_id === updatedSportData.sport_id ? updatedSportData : sport));
    } catch (error) {
      console.error("Error updating sport:", error);
    }
  };
  

  return (
/*     <div className={`events-page ${isEditing && sportIdToEdit && editedSport ? 'blur-background' : ''}`}>
 */
    <div>
              <SideBar />
      {isEditing && sportIdToEdit && editedSport ? (
        <EditSport sport={editedSport} onSave={handleSave} onCancel={handleCancelEdit} />
      ) : (
        <>
          <h2>جميع الرياضات</h2>
          {isLoading && <p className="loading-text">جاري تحميل الرياضات...</p>}
          {error && <p>{error}</p>}

          <div className="total-events">
            عدد الرياضات : <span>{sports.length}</span>
          </div>
          <div className="events-container">
            <table id="events-table" className="events-table">
              <tbody>
                {renderSports()}
              </tbody>
            </table>

            {totalSports > sportsPerPage && (
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
        </>
      )}
    </div>
  );
}

export default Sports;
