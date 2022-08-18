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
    image: {},
    avatarUrl: "",
    bio: "",
    name: "",
    website: "",
    skills: [],
  });

  console.log("CURRENT PAGE:", page);
  console.log("FORM DATA:", formData);


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
        return <Review formData={formData} setFormData={setFormData} />;
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
    if (page === 4) {
      return (
        <button className="back" onClick={handleBack}>
          ←
        </button>
      );
    }
    if (page === 0) {
      return (
        <div className="firstpage">
        <button className="next" onClick={handleNext}>
          →
        </button>
        </div>
      );
    } else {
      return (
        <>
          <button className="back" onClick={handleBack}>
            ←
          </button>
          <button className="next" onClick={handleNext}>
            →
          </button>
        </>
      );
    }
  };

  return (
    <div>
      <div>
        {whichPage()}
        <div className="buttonz" id="buttonz">
        {whichButtons()}
        </div>
      </div>
    </div>
  );
};

export default Setup;
