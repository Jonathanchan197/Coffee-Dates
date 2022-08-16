import { useState } from "react";
import First from "../forms/First";
import Second from "../forms/Second";
import Third from "../forms/Third";

const Setup = () => {
  const [page, setPage] = useState(0);

  const whichPage = () => {
    switch (page) {
      case 0:
        return <First/>;
      case 1:
        return <Second/>;
      case 2:
        return <Third/>;
      default:
        return <First/>;
    }
  };

  const handleBack = () => {
    if(page < 0){
      return 0;
    }
    setPage(page - 1);
  }

  const handleNext = () => {
    setPage(page + 1);
  }

  return (
    <div>
      <h1>This is the setup page.</h1>
      <div>
        {whichPage()}
        <button className="logout" onClick={handleBack} >Back</button>
        <button className="logout" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default Setup;
