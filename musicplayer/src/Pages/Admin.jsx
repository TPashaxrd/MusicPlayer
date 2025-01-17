import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminPanel = () => {
  const [songs, setSongs] = useState([]);
  const [songTitle, setSongTitle] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const verifyPassword = () => {
    const trueKey = "2025";
    const userInput = prompt("Please Enter Key: ");
    if (userInput === trueKey) {
      setIsAuthenticated(true);
    } else {
      alert("Yanlış şifre!");
      window.location.reload();
    }
  };

  useEffect(() => {
    verifyPassword();
  }, []);

  const fetchSongs = async () => {
  try {
  const response = await axios.get("http://localhost:5000/songs");
  setSongs(response.data);
  } catch (error) {
  console.error("fetchSongs API ile ilgili sorun var", error);
  }
  };
  useEffect(() => {
  if (isAuthenticated) fetchSongs();
  }, [isAuthenticated]);
  const handleFileChange = (e) => {
  setFile(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!file || !songTitle || !category) {
  setMessage("Lütfen tüm alanları doldurun!");
  return;
  }
  const formData = new FormData();
  formData.append("file", file);
  formData.append("songTitle", songTitle);
  formData.append("category", category);
  try {
  setUploading(true);
  setMessage("Yükleniyor...");
  const response = await axios.post("https://sdasd-dd60d16ceb6d.herokuapp.com/upload", formData, {
  headers: { "Content-Type": "multipart/form-data" },
  });
  setMessage(`Successfully Uploaded! File: ${response.data.fileUrl}`);
  setSongTitle("");
  setCategory("");
  setFile(null);
  const newSong = {
  title: songTitle,
  category: category,
  fileUrl: response.data.fileUrl,
  };
  setSongs((prevSongs) => [...prevSongs, newSong]);
  } catch (error) {
  setMessage("Bir sorun oluştu..");
  } finally {
  setUploading(false);
  }
  };
  return (
  <>
  {!isAuthenticated ? (
  <div className="for-admin">
  <button onClick={verifyPassword} className="btn btn-primary">
  Admin | Song Upload
  </button>
  </div>
  ) : (
  <div className="min-h-screen bg-gray-100 p-8">
  <title>Admin Panel</title>
  <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
  <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Song Admin Panel</h1>
  <form className="space-y-4" onSubmit={handleSubmit}>
  <input
  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
  type="text"
  placeholder="Şarkı Adı"
  value={songTitle}
  onChange={(e) => setSongTitle(e.target.value)}
  />
  <input
  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
  type="text"
  placeholder="Kategori"
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  />
  <input
  type="file"
  className="w-full px-4 py-2 border rounded-md file:bg-blue-500 file:text-white file:px-4 file:py-2 file:rounded file:cursor-pointer"
  onChange={handleFileChange}
  accept=".mp3, .mp4"
  />
  <button
  type="submit"
  className={`w-full py-2 text-white rounded-md ${
  uploading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
  } `}
  disabled={uploading}
  >
  {uploading ? "Uploading..." : "Yükle"}
  </button>
  </form>
  {message && <p className="mt-4 text-center text-sm text-gray-600">{message}</p>}
  <div className="mt-8">
  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Uploaded Songs</h2>
  {songs.length === 0 ? (
  <p className="text-gray-600">No song uploaded yet.</p>
  ) : (
  <ul className="space-y-2">
  {songs.map((song, index) => (
  <li
  key={index}
  className="p-4 bg-gray-50 rounded-md shadow-md flex justify-between items-center"
  >
  <div>
  <p className="font-medium text-gray-800">{song.title}</p>
  <p className="text-sm text-gray-500">Category: {song.category}</p>
  </div>
  <a
  href={song.fileUrl}
  target="_blank"
  rel="noopener noreferrer"
  className="text-blue-500 underline hover:text-blue-600"
  >
  Listen
  </a>
  </li>
  ))}
  </ul>
  )}
  </div>
  </div>
  </div>
  )}
  </>
  );
};

export default AdminPanel;
