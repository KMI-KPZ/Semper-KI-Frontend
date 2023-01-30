import React from "react";
import { Route, Routes, useParams } from "react-router-dom";
import "./Service.scss";

interface Props {}

const Service: React.FC<Props> = ({}) => {
  return (
    <div className="service">
      <h1>Service</h1>
      <Routes>
        <Route index element={<h2>index</h2>} />
        <Route path="accompany" element={<h2>Gesamtprozess begleiten</h2>} />
        <Route path="let-design" element={<h2>Herstellen lassen</h2>} />
        <Route path="produce" element={<h2>Herstellen</h2>} />
        <Route path="design" element={<h2>Entwerfen</h2>} />
        <Route path="*" element={<h2>nicht gefunden</h2>} />
      </Routes>
    </div>
  );
};

export default Service;
