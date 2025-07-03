// Modern Resume Builder Template

import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGlobe, FaUser, FaGraduationCap, FaBriefcase, FaCode, FaLanguage, FaStar } from "react-icons/fa";

const templates = {
  modern: {
    background: "#ffffff",
    headingColor: "#0a66c2",
    font: "Segoe UI",
  },
};

const defaultSections = {
  summary: true,
  skills: true,
  experience: true,
  education: true,
  projects: true,
  languages: true,
  hobbies: true,
};

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    linkedin: "",
    portfolio: "",
    summary: "",
    skills: "",
    experience: "",
    education: "",
    projects: "",
    languages: "",
    hobbies: "",
  });

  const [customColor, setCustomColor] = useState("#0a66c2");
  const resumeRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const downloadPDF = () => {
    const input = resumeRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const margin = 10;
      const pageWidth = pdf.internal.pageSize.getWidth();
      const imgWidth = pageWidth - margin * 2;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", margin, margin, imgWidth, imgHeight);
      pdf.save("resume.pdf");
    });
  };

  const template = { ...templates.modern, headingColor: customColor };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", padding: 20 }}>
      {/* Form */}
      <div style={{ flex: 1, minWidth: 300, margin: 10, background: "#fff", padding: 20, borderRadius: 10, boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
        <h2>Resume Form</h2>
        <input type="text" name="name" placeholder="Full Name" onChange={handleChange} style={inputStyle} />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} style={inputStyle} />
        <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} style={inputStyle} />
        <input type="text" name="address" placeholder="Address" onChange={handleChange} style={inputStyle} />
        <input type="text" name="linkedin" placeholder="LinkedIn URL" onChange={handleChange} style={inputStyle} />
        <input type="text" name="portfolio" placeholder="Portfolio URL" onChange={handleChange} style={inputStyle} />

        <label>Choose Heading Color</label>
        <input type="color" value={customColor} onChange={(e) => setCustomColor(e.target.value)} style={{ ...inputStyle, padding: 5 }} />

        {Object.keys(defaultSections).map((key) => (
          <div key={key} style={{ marginBottom: 12 }}>
            <label style={{ fontWeight: "bold", textTransform: "capitalize" }}>{key}</label>
            {key === "skills" ? (
              <input
                type="text"
                name={key}
                placeholder="Comma-separated"
                onChange={handleChange}
                style={inputStyle}
              />
            ) : (
              <textarea
                name={key}
                placeholder={key}
                onChange={handleChange}
                style={inputStyle}
              ></textarea>
            )}
          </div>
        ))}

        <button onClick={downloadPDF} style={buttonStyle}>Download PDF</button>
      </div>

      {/* Resume Preview */}
      <div style={{ flex: 1, minWidth: 300, margin: 10, background: "#fff", padding: 20, borderRadius: 10, boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
        <div
          ref={resumeRef}
          style={{
            background: template.background,
            color: template.headingColor,
            fontFamily: template.font,
            padding: 20,
            lineHeight: 1.6,
            paddingRight: 30,
            paddingLeft: 30,
          }}
        >
          <h1 style={{ marginBottom: 5 }}>{formData.name}</h1>

          {/* Contact Row */}
          <div style={contactRowStyle}>
            {formData.email && <span style={rowStyle}><FaEnvelope style={iconStyle} /> {formData.email}</span>}
            {formData.phone && <span style={rowStyle}><FaPhone style={iconStyle} /> {formData.phone}</span>}
            {formData.address && <span style={rowStyle}><FaMapMarkerAlt style={iconStyle} /> {formData.address}</span>}
          </div>
          <div style={contactRowStyle}>
            {formData.linkedin && <span style={rowStyle}><FaLinkedin style={iconStyle} /> {formData.linkedin}</span>}
            {formData.portfolio && <span style={rowStyle}><FaGlobe style={iconStyle} /> {formData.portfolio}</span>}
          </div>

          {defaultSections.summary && formData.summary && <><h3><FaUser style={iconStyle} /> Summary</h3><p>{formData.summary}</p></>}
          {defaultSections.skills && formData.skills && (
            <>
              <h3><FaStar style={iconStyle} /> Skills</h3>
              <ul>
                {formData.skills.split(",").map((skill, i) => (
                  <li key={i}>{skill.trim()}</li>
                ))}
              </ul>
            </>
          )}
          {defaultSections.experience && formData.experience && <><h3><FaBriefcase style={iconStyle} /> Experience</h3><p>{formData.experience}</p></>}
          {defaultSections.education && formData.education && <><h3><FaGraduationCap style={iconStyle} /> Education</h3><p>{formData.education}</p></>}
          {defaultSections.projects && formData.projects && <><h3><FaCode style={iconStyle} /> Projects</h3><p>{formData.projects}</p></>}
          {defaultSections.languages && formData.languages && <><h3><FaLanguage style={iconStyle} /> Languages</h3><p>{formData.languages}</p></>}
          {defaultSections.hobbies && formData.hobbies && <><h3 style={rowStyle}>🎯 Hobbies</h3><p>{formData.hobbies}</p></>}
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  marginBottom: 12,
  padding: 10,
  fontSize: "1rem",
  border: "1px solid #ccc",
  borderRadius: 5,
  boxSizing: "border-box",
};

const buttonStyle = {
  marginTop: 10,
  marginRight: 10,
  padding: "10px 20px",
  backgroundColor: "#0a66c2",
  color: "white",
  fontWeight: "bold",
  border: "none",
  borderRadius: 5,
  cursor: "pointer",
};

const rowStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  marginRight: 15,
};

const contactRowStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "15px",
  marginBottom: 10,
};

const iconStyle = {
  fontSize: "1rem",
  verticalAlign: "middle",
};

export default App;
