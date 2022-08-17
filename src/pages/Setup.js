import { useState } from "react";
import First from "../forms/First";
import Second from "../forms/Second";
import Third from "../forms/Third";
import Fourth from "../forms/Fourth";
import Review from "../forms/Review";

const Setup = () => {
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    isMentor: null,
    industry: "",
    image: "",
    bio: "",
    name: "",
    website: "",
    skills: [],
  });

  const whichPage = () => {
    switch (page) {
      case 0:
        return <First formData={formData} setFormData={setFormData} />;
      case 1:
        return <Second formData={formData} setFormData={setFormData} />;
      case 2:
        return <Third formData={formData} setFormData={setFormData} />;
      case 3:
        return <Fourth formData={formData} setFormData={setFormData} />;
      case 4:
        return <Review formData={formData} />;
      default:
        return <First formData={formData} setFormData={setFormData} />;
    }
  };

  const handleBack = () => {
    if (page < 0) {
      return 0;
    }
    setPage(page - 1);
  };

  const handleNext = () => {
    setPage(page + 1);
  };

  const whichButtons = () => {
    if (page >= 4) {
      return buttons = (
        <button className="logout" onClick={handleBack}>
          Back
        </button>
      );
    }
    if (page <= 1) {
      return buttons = (
        <button className="logout" onClick={handleNext}>
          Next
        </button>
      );
    } else {
      return buttons = (
        <>
          <button className="logout" onClick={handleBack}>
            Back
          </button>
          <button className="logout" onClick={handleNext}>
            Next
          </button>
        </>
      );
  }
};

  return (
    <div>
      <h1>This is the setup page.</h1>
      <div>
        <whichPage />
      </div>
    </div>
  );
};

export default Setup;
