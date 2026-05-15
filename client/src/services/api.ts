import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Sesuaikan dengan port server Anda

export const uploadVideo = async (file: File) => {
  const formData = new FormData();
  formData.append('video', file); // 'video' harus sama dengan upload.single('video') di backend

  const response = await axios.post(`${API_URL}/lectures/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    // Opsional: Bisa ditambahkan onUploadProgress untuk progress bar nantinya
  });
  return response.data;
};

export const getLectures = async () => {
  const response = await axios.get(`${API_URL}/lectures`);
  return response.data;
};