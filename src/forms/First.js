import React from "react";

const First = ({ formData, setFormData }) => {

  return (
    <div>
      <h2 className="question bounce">I am a <span className="diffcolorfont"> {formData.isMentor ? "Mentor" : "Mentee"} </span> </h2>
      <div className="splitter">
        <div className="yes">
          <button
            className="choice"
            onClick={() => {
              setFormData({ ...formData, isMentor: true })
            }}
          >
            Mentor
          </button>
        </div>
        <div className="no">
          <button
            className="choice"
            onClick={() => {
              setFormData({ ...formData, isMentor: false })
            }}
          >
            Mentee
          </button>
        </div>
      </div>
    </div>
  );
};
export default First;
