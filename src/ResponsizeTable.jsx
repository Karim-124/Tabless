import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { FaEdit, FaTrash, FaPlus, FaFileCsv, FaFilePdf } from "react-icons/fa";
import { CSVLink } from "react-csv";

import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";   

// Initial Data
const initialData = [
  {
    id: 1,
    country: "Argentina",
    languages: "Spanish (official), English, Italian, German, French",
    population: "41,803,125",
    medianAge: "31.3",
    area: "2,780,387",
  },
  {
    id: 2,
    country: "Australia",
    languages: "English 79%, native and other languages",
    population: "23,630,169",
    medianAge: "37.3",
    area: "7,739,983",
  },
  {
    id: 3,
    country: "Greece",
    languages: "Greek 99% (official), English, French",
    population: "11,128,404",
    medianAge: "43.2",
    area: "131,956",
  },
  {
    id: 4,
    country: "Luxembourg",
    languages: "Luxembourgish (national) French, German (both administrative)",
    population: "536,761",
    medianAge: "39.1",
    area: "2,586",
  },
  {
    id: 5,
    country: "Russia",
    languages: "Russian, others",
    population: "142,467,651",
    medianAge: "38.4",
    area: "17,076,310",
  },
  {
    id: 6,
    country: "Sweden",
    languages: "Swedish, small Sami- and Finnish-speaking minorities",
    population: "9,631,261",
    medianAge: "41.1",
    area: "449,954",
  },
  {
    id: 7,
    country: "Norway",
    languages: "Norwegian",
    population: "5,347,896",
    medianAge: "39.5",
    area: "385,207",
  },
  {
    id: 8,
    country: "Finland",
    languages: "Finnish",
    population: "5,518,371",
    medianAge: "42.6",
    area: "338,424",
  },
  {
    id: 9,
    country: "Denmark",
    languages: "Danish",
    population: "5,831,579",
    medianAge: "42.0",
    area: "43,094",
  },
  {
    id: 10,
    country: "Iceland",
    languages: "Icelandic",
    population: "343,599",
    medianAge: "37.3",
    area: "103,000",
  },
  {
    id: 11,
    country: "Estonia",
    languages: "Estonian",
    population: "1,330,068",
    medianAge: "42.1",
    area: "45,227",
  },
];

// Modal Component
// Modal Component
const Modal = ({ show, onClose, onSubmit, data }) => {
    const [formData, setFormData] = useState(data);
    const [errors, setErrors] = useState({});
  
    useEffect(() => {
      setFormData(data);
    }, [data]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    const validate = () => {
      const errors = {};
      if (!formData.country) errors.country = "Country is required";
      if (!formData.languages) errors.languages = "Languages are required";
      if (!formData.population) errors.population = "Population is required";
      if (!formData.medianAge) errors.medianAge = "Median Age is required";
      if (!formData.area) errors.area = "Area is required";
      return errors;
    };
  
    const handleSubmit = () => {
      const validationErrors = validate();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
      } else {
        onSubmit(formData);
        setErrors({});
      }
    };
  
    if (!show) return null;
  
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-2xl w-11/12 md:w-1/2 lg:w-1/3 transition-all transform duration-300 ">
          <h2 className="text-xl mb-4">
            {data.id ? "Edit Entry" : "Add New Entry"}
          </h2>
          <div className="space-y-4">
            <div>
              <input
                type="text"
                name="country"
                value={formData.country || ""}
                onChange={handleChange}
                placeholder="Country"
                className="w-full p-2 border rounded"
              />
              {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
            </div>
            <div>
              <input
                type="text"
                name="languages"
                value={formData.languages || ""}
                onChange={handleChange}
                placeholder="Languages"
                className="w-full p-2 border rounded"
              />
              {errors.languages && <p className="text-red-500 text-sm">{errors.languages}</p>}
            </div>
            <div>
              <input
                type="text"
                name="population"
                value={formData.population || ""}
                onChange={handleChange}
                placeholder="Population"
                className="w-full p-2 border rounded"
              />
              {errors.population && <p className="text-red-500 text-sm">{errors.population}</p>}
            </div>
            <div>
              <input
                type="text"
                name="medianAge"
                value={formData.medianAge || ""}
                onChange={handleChange}
                placeholder="Median Age"
                className="w-full p-2 border rounded"
              />
              {errors.medianAge && <p className="text-red-500 text-sm">{errors.medianAge}</p>}
            </div>
            <div>
              <input
                type="text"
                name="area"
                value={formData.area || ""}
                onChange={handleChange}
                placeholder="Area"
                className="w-full p-2 border rounded"
              />
              {errors.area && <p className="text-red-500 text-sm">{errors.area}</p>}
            </div>
          </div>
          <div className="flex justify-end space-x-4 mt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  };
  
// Delete Confirmation Modal Component
const DeleteModal = ({ show, onClose, onDelete, data }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl mb-4">Delete Confirmation</h2>
        <p>Are you sure you want to delete {data.country}?</p>
        <div className="flex justify-end space-x-4 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={() => onDelete(data.id)}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

// Responsive Table Component
const ResponsiveTable = () => {
  const [data, setData] = useState(initialData);
  const [modalData, setModalData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [deleteData, setDeleteData] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [filterText, setFilterText] = useState("");

  const handleEdit = (row) => {
    setModalData(row);
    setShowModal(true);
  };

  const handleDelete = (row) => {
    setDeleteData(row);
    setShowDeleteModal(true);
  };

  const handleAdd = () => {
    setModalData({});
    setShowModal(true);
  };

  const handleSubmit = (formData) => {
    if (formData.id) {
      // Edit existing entry
      const updatedData = data.map((item) =>
        item.id === formData.id ? formData : item
      );
      setData(updatedData);
    } else {
      // Add new entry
      const newEntry = { ...formData, id: data.length + 1 };
      setData([...data, newEntry]);
    }
    setShowModal(false);
    setModalData({});
  };
  

  const handleDeleteConfirmed = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
    setShowDeleteModal(false);
  };

  const handleSearch = (e) => {
    setFilterText(e.target.value);
  };

  const filteredData = data.filter((item) =>
    item.country.toLowerCase().includes(filterText.toLowerCase())
  );

  const columns = [
    { name: "Order", selector: (row) => row.country, sortable: true },
    { name: "Description", selector: (row) => row.languages, sortable: true },
    { name: "Deadline", selector: (row) => row.population, sortable: true },
    { name: "Status", selector: (row) => row.medianAge, sortable: true },
    { name: "Amount", selector: (row) => row.area, sortable: true },
    {
      name: (
        <FaPlus
          className="text-green-500 hover:text-green-700 cursor-pointer "
          onClick={handleAdd}
        />
      ),
      cell: (row) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleEdit(row)}
            className="text-blue-500 hover:text-blue-700"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => handleDelete(row)}
            className="text-red-500 hover:text-red-700"
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Table Data", 14, 20);
    doc.autoTable({
      head: [['Country', 'Languages', 'Population', 'Median Age', 'Area']],
      body: data.map(row => [
        row.country, row.languages, row.population, row.medianAge, row.area
      ]),
      startY: 30,
    });
    doc.save('table_data.pdf');
  };
  const generateExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    XLSX.writeFile(workbook, "table_data.xlsx");
  };
  return (
    <div className="bg-white h-screen">
      <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="Search by country"
            value={filterText}
            onChange={handleSearch}
            className="p-2 border rounded"
          />
          <div className="flex space-x-2">
            <CSVLink
              data={data}
              filename="table_data.csv"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
            >
              Export CSV
            </CSVLink>
            <button
              onClick={generatePDF}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Export PDF
            </button>
            <button
              onClick={generateExcel}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700"
            >
              Export Excel
            </button>
          </div>
        </div>
      

        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          responsive
          striped
          highlightOnHover
          className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md"
        />
      </div>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
        data={modalData}
      />
      <DeleteModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={handleDeleteConfirmed}
        data={deleteData}
      />
    </div>
  );
};

export default ResponsiveTable;
