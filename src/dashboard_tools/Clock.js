import { useState, useEffect } from "react";

function Clock() {
  const [clock, setClock] = useState();

  useEffect(() => {
    setInterval(() => {
      const date = new Date();
      setClock(date.toLocaleTimeString('en-GB')); //24 hour time format
    }, 1000);
  }, []);

  return <div className="clock">{clock}</div>;
}


export default Clock;