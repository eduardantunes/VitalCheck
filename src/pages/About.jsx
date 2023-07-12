import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import HeartRateTable from "../components/HeartRateTable";

const AboutPage = () => {
    useEffect(() => {
    }, []);
  return (
    <>
      <Sidebar active={"/sobre"} />
      <main className="content">
        <Navbar />
        <div className="container">
        <HeartRateTable />
          <div className="table-container">
            
          </div>
        </div>
      </main>
    </>
  );
};

export default AboutPage;
