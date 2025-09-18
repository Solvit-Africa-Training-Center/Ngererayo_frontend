import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../utilis/api";
import Footer from "../../components/landingpage/Footer";
import Header from "./DashboardHeader";

const SellerApplicationForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    farming_name: "",
    location: "",
    national_id: null as File | null,
    license: null as File | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  const token = sessionStorage.getItem("token");
  if (!token) {
    alert("You must be logged in to submit an application.");
    setIsSubmitting(false);
    return;
  }

  try {

    // 2️⃣ Prepare FormData
    const fd = new FormData();
   
    fd.append("farming_name", formData.farming_name);
    fd.append("location", formData.location);
    if (formData.national_id) fd.append("national_id", formData.national_id);
    if (formData.license) fd.append("license", formData.license);

    // 3️⃣ Submit to backend
    await api.post("/market/Requested-owner/", fd, {
      headers: { Authorization: `Bearer ${token}` ,
      "Content-Type": "multipart/form-data",},
      
    });

    alert("Application submitted successfully!");

  } catch (err: any) {
    console.error(err);
    alert(
      err.response?.data?.message ||
        "Error submitting application. Make sure all fields are correct."
    );
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-amber-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Application Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-3">
              Become a Verified Seller
            </h1>
            <p className="text-gray-600 max-w-md mx-auto">
              Join our marketplace of agricultural producers. Complete your application to start selling your products.
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-green-700">Application Progress</span>
              <span className="text-sm font-medium text-green-700">1/2</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div className="h-2 bg-green-600 rounded-full w-1/2"></div>
            </div>
          </div>

          {/* Application Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-lg overflow-hidden border border-green-100"
          >
            {/* Form Header */}
            <div className="bg-green-700 py-4 px-6">
              <h2 className="text-xl font-semibold text-white">Seller Application Form</h2>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Farming Name Field */}
              <div>
                <label htmlFor="farming_name" className="block text-sm font-medium text-gray-700 mb-1">
                  Farming/Business Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="farming_name"
                  name="farming_name"
                  value={formData.farming_name}
                  onChange={handleChange}
                  placeholder="Enter your farming business name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200"
                  required
                />
              </div>

              {/* Location Field */}
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter your farm location"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200"
                  required
                />
              </div>

              {/* File Uploads Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-800">Verification Documents</h3>
                <p className="text-sm text-gray-600">Please upload the required documents for verification.</p>
                
                {/* National ID Upload */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 transition duration-200 hover:border-green-400">
                  <label htmlFor="national_id" className="block text-sm font-medium text-gray-700 mb-2">
                    National ID <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center">
                    <div className="mr-3 text-green-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">Upload a clear photo or scan of your National ID</p>
                      <p className="text-xs text-gray-500 mt-1">Accepted formats: JPG, PNG, PDF</p>
                      {formData.national_id && (
                        <p className="text-sm text-green-600 mt-1 font-medium">
                          Selected: {formData.national_id.name}
                        </p>
                      )}
                    </div>
                  </div>
                  <input
                    type="file"
                    id="national_id"
                    name="national_id"
                    accept=".jpg,.png,.pdf"
                    onChange={handleChange}
                    className="hidden"
                    required
                  />
                  <label
                    htmlFor="national_id"
                    className="mt-3 inline-block px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium cursor-pointer hover:bg-green-200 transition duration-200"
                  >
                    Choose File
                  </label>
                </div>

                {/* License Upload */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 transition duration-200 hover:border-green-400">
                  <label htmlFor="license" className="block text-sm font-medium text-gray-700 mb-2">
                    Business License <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center">
                    <div className="mr-3 text-green-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">Upload your business license or permit</p>
                      <p className="text-xs text-gray-500 mt-1">Accepted formats: JPG, PNG, PDF</p>
                      {formData.license && (
                        <p className="text-sm text-green-600 mt-1 font-medium">
                          Selected: {formData.license.name}
                        </p>
                      )}
                    </div>
                  </div>
                  <input
                    type="file"
                    id="license"
                    name="license"
                    accept=".jpg,.png,.pdf"
                    onChange={handleChange}
                    className="hidden"
                    required
                  />
                  <label
                    htmlFor="license"
                    className="mt-3 inline-block px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium cursor-pointer hover:bg-green-200 transition duration-200"
                  >
                    Choose File
                  </label>
                </div>
              </div>
            </div>

            {/* Form Footer */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
                <p className="text-sm text-gray-600">
                  Your information is secure and encrypted.
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-3 rounded-lg font-medium transition duration-200 ${
                    isSubmitting
                      ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                      : "bg-gradient-to-r from-green-600 to-green-800 text-white hover:from-green-700 hover:to-green-900 shadow-md hover:shadow-lg"
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    "Submit Application"
                  )}
                </button>
              </div>
            </div>
          </form>
          
          {/* Additional Information */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Have questions about the application process?{" "}
              <a href="#" className="text-green-600 hover:text-green-800 font-medium">
                Contact support
              </a>
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SellerApplicationForm;