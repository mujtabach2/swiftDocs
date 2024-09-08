"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { documentTypes } from "./type";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function Document() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [documentType, setDocumentType] = useState("");
  const [formData, setFormData] = useState({ name: "", content: "" });
  const [downloadLink, setDownloadLink] = useState("");

  const [theme, setTheme] = useState("synthwave");

  useEffect(() => {
    document.querySelector("body").setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === "mytheme" ? "synthwave" : "mytheme",
    );
  };
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleDocumentTypeChange = (event) => {
    setDocumentType(event);
    setFormData({}); // Reset form data when document type changes
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "/api/create-document",
        { documentType, formData },
        { responseType: "blob" },
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      setDownloadLink(url);
    } catch (error) {
      console.error("Error creating document:", error);
    }
  };

  const renderInputs = () => {
    return documentTypes[documentType]?.map((field) => (
      <div key={field.name} className="form-control">
        <label className="label">
          <span className="label-text">{field.label}:</span>
          {field.type === "textarea" ? (
            <textarea
              name={field.name}
              onChange={handleInputChange}
              required
              className="textarea textarea-bordered"
            ></textarea>
          ) : (
            <input
              type={field.type}
              name={field.name}
              onChange={handleInputChange}
              required
              className="input input-bordered"
            />
          )}
        </label>
      </div>
    ));
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen py-8">
        <button
          className="btn bg-[#6bba83] text-white mb-4"
          onClick={openModal}
        >
          Choose Document Type
        </button>
        {modalIsOpen && (
          <div className="modal modal-open">
            <div className="modal-box">
              <h2 className="font-bold text-lg mb-10 flex justify-center">
                Choose Document Type
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {Object.keys(documentTypes).map((type) => (
                  <button
                    key={type}
                    className="btn bg-[#6bba83] text-white"
                    onClick={() => handleDocumentTypeChange(type)}
                  >
                    {type.split(/(?=[A-Z])/).join(" ")}
                  </button>
                ))}
              </div>
              <div className="modal-action">
                <button className="btn" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {documentType && (
          <card className="bg-slate-900 p-20 rounded-3xl">
            <form
              onSubmit={handleSubmit}
              className="mt-4 space-y-4 w-full max-w-md"
            >
              <h2 className="font-bold text-lg text-center">
                Fill in the information for{" "}
                {documentType.split(/(?=[A-Z])/).join(" ")}
              </h2>
              {renderInputs()}
              <button
                type="submit"
                className="btn bg-[#6bba83] text-white w-full"
              >
                Create Document
              </button>
            </form>
          </card>
        )}

        {downloadLink && (
          <div className="mt-4">
            <a
              href={downloadLink}
              download={`document.${documentType}`}
              className="btn btn-success w-full"
            >
              Download {documentType}
            </a>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
