import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";   // ✅

import { api } from "../../utilis/api";

interface PostFormProps {
  post?: any;
  onSuccess: () => void;
  consultantId: number;
}

const AddEditPostForm: React.FC<PostFormProps> = ({ post, onSuccess, consultantId }) => {
  const [title, setTitle] = useState(post?.post_title || "");
  const [description, setDescription] = useState(post?.post_description || "");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(post?.post_image || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTitle(post?.post_title || "");
    setDescription(post?.post_description || "");
    setImage(null);
    setImagePreview(post?.post_image || "");
  }, [post]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || (!post && !image)) {
      toast.error("Please fill all fields and upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("post_title", title);
    formData.append("post_description", description);
    if (image) formData.append("post_image", image);

    try {
      setLoading(true);
      const token = sessionStorage.getItem("token");
      if (!token) {
        toast.error("You must be logged in.");
        return;
      }

      if (post) {
        await api.put(`/market/consultants/posts/${post.id}/edit/`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Post updated successfully!");
      } else {
        await api.post(`/market/consultants/add-post/`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Post added successfully!");
      }

      onSuccess();
      setTitle("");
      setDescription("");
      setImage(null);
      setImagePreview("");
    } catch (error: any) {
      console.error(error);
      toast.error(
        error.response?.data?.detail || "Failed to save post. Check your inputs."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        {post ? "Edit Post" : "Create New Post"}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Post Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter post description"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200"
            rows={4}
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {post ? "Change Image" : "Upload Image"} <span className="text-red-500">*</span>
          </label>
          
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {imagePreview && (
              <div className="flex-shrink-0">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-40 w-40 object-cover rounded-lg border"
                />
              </div>
            )}
            
            <div className="flex-1">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center transition duration-200 hover:border-green-400">
                <div className="mb-2 text-green-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <p className="text-sm text-gray-600 mb-1">Drag & drop or click to upload</p>
                <p className="text-xs text-gray-500">Supported formats: JPG, PNG, GIF</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="post-image-upload"
                  required={!post}
                />
                <label
                  htmlFor="post-image-upload"
                  className="mt-3 inline-block px-4 py-2 bg-green-100 text-gray-700 rounded-lg text-sm font-medium cursor-pointer hover:bg-blue-200 transition duration-200"
                >
                  Choose File
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onSuccess}
            className="px-5 py-2 border cursor-pointer border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`px-5 py-2 rounded-lg font-medium transition duration-200 ${
              loading
                ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                : "bg-green-700 text-white hover:from-blue-700 hover:to-blue-900 shadow-md hover:shadow-lg cursor-pointer"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {post ? "Updating..." : "Saving..."}
              </span>
            ) : post ? (
              "Update Post"
            ) : (
              "Add Post"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEditPostForm;