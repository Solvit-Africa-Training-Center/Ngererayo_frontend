import { api } from "../../utilis/api";

const token = sessionStorage.getItem("token");

export const fetchConsultantPosts = async (consultantId: number) => {
  const res = await api.get(`/market/consultants/${consultantId}/posts/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateConsultantPost = async (postId: number, data: FormData) => {
  const res = await api.put(`/market/consultants/posts/${postId}/edit/`, data, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const deleteConsultantPost = async (postId: number) => {
  const res = await api.delete(`/market/consultants/posts/${postId}/delete/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
