import React, { useState, useEffect, useRef } from 'react';
import { BsFileMusicFill } from 'react-icons/bs';
import { FaGoogle, FaPause, FaPlay, FaSearch, FaVolumeMute } from 'react-icons/fa';
import { MdAccessTime, MdFeaturedPlayList, MdFullscreen, MdOutlineMusicNote, MdSend } from 'react-icons/md';
import { AiFillInfoCircle } from "react-icons/ai";
import { IoIosClose, IoMdAdd } from "react-icons/io";
import { useLocation } from 'react-router-dom';
import { GoUnmute } from "react-icons/go";
import { ToastContainer, toast } from 'react-toastify';
import Footer from './components/Footer';
import 'react-toastify/dist/ReactToastify.css';
import OpenKeys from  './components/OpenKeys';
import './css/Main.css';
import { Helmet } from 'react-helmet';
const App = () => {

  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSong, setSelectedSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showAllSongs, setShowAllSongs] = useState(false);
  const audioRef = useRef(null);
  const [showFooter, setShowFooter] = useState(true);
  const [sanbr, setSanbr] = React.useState(false);
  const [cmute, setCmute] = useState(true);
  const [query, setQuery] = useState('');
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const location = useLocation();
  const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour12: false }));
  useEffect(() => {
  const interval = setInterval(() => {
  setTime(new Date().toLocaleTimeString([], { hour12: false }));
  }, 1000);
  return () => clearInterval(interval);
  }, []);    
  const groupedCategories = Array.isArray(data) ? data.reduce((acc, song) => {
    if (!acc[song.category]) {
      acc[song.category] = [];
    }
    acc[song.category].push(song);
    return acc;
  }, {}) : {};
  
  const togglePanel = () => {
  setSanbr(prev => !prev);
  };  
  const muteTogs = () => {
  if (audioRef.current) {
  audioRef.current.muted = !audioRef.current.muted;
  setCmute(audioRef.current.muted);
  }
  };  
  useEffect(() => {
  const handleMouseMove = (event) => {
  setPosition({ x: event.pageX, y: event.pageY });
  };
  document.addEventListener('mousemove', handleMouseMove);
  return () => {
  document.removeEventListener('mousemove', handleMouseMove);
  };
  }, []);
  const handleSearch = (query) => {
  const filteredResults = data.filter((song) => {
  const title = song.title || ""; 
  const artist = song.artist || ""; 
  return (
  title.toLowerCase().includes(query.toLowerCase()) || 
  artist.toLowerCase().includes(query.toLowerCase())
  );
  });
  setData(filteredResults);
  };

  // API START
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/songs');
        const result = await response.json();
        
        // Yeni veri yapısına uygun şekilde "data" nesnesine erişiyoruz
        if (result.code === 200 && result.data.success) {
          setData(result.data.data); // Burada "data" dizisini set ediyoruz
        } else {
          console.error('Veri alırken bir hata oluştu:', result);
        }
      } catch (error) {
        console.error('Veri çekme hatası:', error);
      }
    };
  
    fetchData();
  }, []);
  // API END

  const handlePlaylistClick = (category) => {
  setSelectedCategory(category);
  setIsPlaying(false); 
  setShowAllSongs(false);
  };
  const filteredSongs = data.filter((song) => song.category === selectedCategory);
  const handleSongClick = (song) => {
  if (audioRef.current) {
  if (selectedSong && selectedSong.id !== song.id) {
  audioRef.current.pause();
  setIsPlaying(false); 
  }
  setSelectedSong(song);
  audioRef.current.src = song.fileUrl;
  audioRef.current.play().then(() => {
  setIsPlaying(true); 
  }).catch((error) => {
  console.error('Error playing audio:', error);
  });
  }
  };
  const playAudio = () => {
  if (audioRef.current && !isPlaying) {
  audioRef.current.play().then(() => {
  setIsPlaying(true); 
  }).catch((error) => {
  console.error('Error playing audio:', error);
  });
  }
  };
  const handleOpenModal = () => {
  setShowModal(true);
  }
  const handleCloseModal = () => {
  setShowModal(false);
  }
  const handleNavigate = () => {
  setShowModal(false);
  window.location.reload();
  }
  const pauseAudio = () => {
  if (audioRef.current && isPlaying) {
  audioRef.current.pause();
  setIsPlaying(false);
  }
  };
  const handleKeyPress2 = (event) => {
  if (event.key === "m" || event.key === "M") {
  setCmute((prevCmute) => {
  const newMuteState = !prevCmute;
  if (audioRef.current) {
  audioRef.current.muted = newMuteState;
  }
  return newMuteState;
  });
  }
  };
  useEffect(() => {
  window.addEventListener("keydown", handleKeyPress2);
  return () => {
  window.removeEventListener("keydown", handleKeyPress2);
  };
  }, []);  
  const fullScreenOp = () => {
  const element = document.documentElement;
  if (element.requestFullscreen) {
  element.requestFullscreen();
  }
  setIsFullscreen(true);
  setIsActive(!isActive);
  }
  // Used to mitigate XSS (Cross-Site Scripting) and other security risks
  const handleKeyPress3 = (event) => {
  if (event.key === "F12" || event.key === "(" || event.key === ')' || event.key === "<" || event.key === ">") {
  // toast.error("Security")
  console.clear();
  console.log("Security")
  event.preventDefault();
  }
  };
  const detectDevTools = () => {
  const devToolsCheck = setInterval(() => {
  const widthThreshold = window.outerWidth - window.innerWidth > 100;
  const heightThreshold = window.outerHeight - window.innerHeight > 100;
  if (widthThreshold || heightThreshold) {
  clearInterval(devToolsCheck);
  // window.location.reload(); 
  }
  }, 200);
  };
  const handleRightClick = (event) => {
  event.preventDefault();
  // alert("");
  };
  useEffect(() => {
  window.addEventListener("keydown", handleKeyPress3); 
  window.addEventListener("contextmenu", handleRightClick);
  detectDevTools();
  return () => {
  window.removeEventListener("keydown", handleKeyPress3);
  window.removeEventListener("contextmenu", handleRightClick);
  };
  }, []);
  useEffect(() => {
  const handleKeyDown = (e) => {
  if (e.key === ' ') { 
  if (isPlaying) {
  pauseAudio();
  } else {
  playAudio();
  }
  }
  };
  document.body.addEventListener('keydown', handleKeyDown);
  return () => {
  document.body.removeEventListener('keydown', handleKeyDown);
  };
  }, [isPlaying]);
  useEffect(() => {
  const handleKeyDown = (e) => {
  if (e.key === 'Enter') { 
  if (isPlaying) {
  pauseAudio();
  } else {
  playAudio();
  }
  }
  };
  document.body.addEventListener('keydown', handleKeyDown);
  return () => {
  document.body.removeEventListener('keydown', handleKeyDown);
  };
  }, [isPlaying]);
  const handleProgressBarChange = (e) => {
  if (audioRef.current) {
  audioRef.current.currentTime = e.target.value;
  setCurrentTime(e.target.value);
  }
  };
  useEffect(() => {
  if (audioRef.current) {
  audioRef.current.ontimeupdate = () => {
  setCurrentTime(audioRef.current.currentTime);
  };
  audioRef.current.onloadedmetadata = () => {
  setDuration(audioRef.current.duration);
  };
  audioRef.current.onerror = (e) => {
  console.error('Error loading audio source:', e);
  toast.error('Audio source not found!, Please try again later.');
  };
  }
  }, [selectedSong]);
  const [volume, setVolume] = useState(1);
  const handleVolumeChange = (e) => {
  const newVolume = e.target.value;
  setVolume(newVolume);
  if (audioRef.current) {
  audioRef.current.volume = newVolume;
  }
  };
  const admins = () => {
  console.log('Going to admin page...')
  window.location.href = "admin";
  };
  const errAlert = () => {
  toast.error('Download is not available right now, Please try again later.');
  }
  const copySong = () => {
  toast.success(`${selectedSong.title} - Copied Successfully!`);
  navigator.clipboard.writeText(`${selectedSong.category} - ${selectedSong.title}`);
  }
  const [isActive, setIsActive] = useState(false);
  const [isFullScreen, setIsFullscreen] = useState(false);
  const UserConfig = {
  name: "Toprak",
  surname: "Altın",
  email: "altintoprak06@gmail.com",
  pURL: "https://toprak.nivesoft.com/img/tpasha.jpg",
  color: "#171717",
  font: '',
  Github: "https://github.com/TPashaxrd/MusicPlayer"
  // Think big, Think Different. Do not give up, World is yours.
  }
  return (
  <>
  <div className="security">
  <Helmet>
  <title>{UserConfig.name} | {selectedSong?.title || "Music Player"}</title>
  </Helmet>
  <div className="fixed top-0 right-0 m-4 cursor-pointer" style={{ fontSize: '30px', marginLeft: '-25px' }} onClick={togglePanel}><AiFillInfoCircle/></div>
  <div className="fixed top-0 right-20 m-4 cursor-pointer" style={{ fontSize: '30px', marginLeft: '-55px' }} onClick={admins}><IoMdAdd /></div>
  <OpenKeys/>
  <div style={{ userSelect: 'none' }} className={`forcomp4 ${isActive ? 'active' : ''} forcomp4s forphone fixed top-0 right-0 w-64 h-full bg-gray-800 text-white transition-transform transform ${ sanbr ? 'translate-x-0' : 'translate-x-full'}`}>
  <div className="p-6 theln seaa ">
  <div style={{ fontFamily: 'Teko, serif', marginLeft: '16px', fontSize: '28px' }} className="text-xl flex font-bold"><IoIosClose onClick={togglePanel} className="cursor-pointer forcomp4-close" style={{ marginLeft: '-5px', fontSize: '35px', marginTop: '-6px', fontFamily: 'Space Grotesk, serif' }}/>
  {selectedCategory ? selectedCategory : <a style={{ fontSize: '13px'}} className="text-red-500"><h2 className="forcomp4-h">Please select any category!</h2></a>} </div>
  <div className="forcomp4-img"><img className="rounded-2xl w-64 shadow-[0_0_20px_5px_rgba(59,130,246,0.5)] transition-transform duration-300 hover:scale-105" src="https://cdn-images.dzcdn.net/images/cover/ad2246bd9268ca7e7d1f08f28b23a031/1900x1900-000000-80-0-0.jpg" alt="Songİmg"></img></div>
  <div className="forcomp4-text relative group" style={{ fontFamily: 'Space Grotesk, serif' }}>
  {selectedSong ? (
  <a
  className="hover:underline hover:text-red-500"
  style={{
  cursor: 'pointer',
  marginLeft: '12px',
  fontFamily: 'Oswald, serif',
  fontSize: '30px',
  }}
  >
  {selectedSong.title}
  </a>
  ) : (
  <a
  style={{
  fontSize: '13px',
  marginLeft: '20px',
  }}
  className="text-red-500"
  >
  Please select any song!
  </a>
  )}
  {selectedSong && (
  <div
  className="absolute left-10 -translate-x-1/2 bottom-full mb-2 opacity-0 group-hover:opacity-100 transition duration-100 transform group-hover:translate-y-0 translate-y-2"
  >
  <div className="bg-slate-800 w-max max-w-xs text-white rounded-lg px-4 py-4">
  <p className="font-bold text-md mb-1"><a href={"https://www.google.com/search?q=" + encodeURIComponent(selectedCategory) + " " + encodeURIComponent(selectedSong.title)}><FaSearch className="text-red-500 hover:text-blue-500 hover:transform hover:rotate-45" /></a>Details for {selectedSong.title}</p>
  <p className="text-sm">
  Category: <b>{selectedSong.category}</b>
  <br></br>
  Song: <b>&nbsp;{selectedSong.title || 'Unknown Song'}</b>
  </p>
  </div>
  </div>
  )}
  </div>
  <div style={{ fontSize: '22px', marginTop: '3px' }} className="mybar flex justify-center mr-4 gap-14"><MdAccessTime style={{ marginTop: '-5px', fontSize: '33px' }} className="text-red-500 text-4xl"/><div className="one-times" style={{ marginTop: '-5px' }}>{Math.floor(currentTime)} - {Math.floor(duration)}</div></div>
  <input
  type="range"
  value={currentTime}
  max={duration}
  onChange={handleProgressBarChange}
  className="w-full h-1 bg-gray-600 cursor-pointer rounded-full"
  style={{ userSelect: 'none' }}
  />
  </div>
  <div className="forcomp4-time one-time text-red-500 text-6xl"><a>{time}</a></div>
  <div className="border-t-2 forcomp4-line border-gray-300 my-4"/>
  {selectedCategory && selectedSong ? (
  <div className="font-bold"><a className="justify-center text-2xl flex" href={"https://www.google.com/search?q=" + encodeURIComponent(selectedCategory) + " " + encodeURIComponent(selectedSong.title)}><FaGoogle style={{ marginTop: '5px', fontSize: '23px' }} /><a className="forcomp4-text2 hover:text-red-500 hover:underline ml-1" style={{ fontSize: '15px' }}><a style={{ fontFamily: 'Space Grotesk, serif' }}>Search in Google</a></a></a></div> ) : ( <span className="text-red-500">Please select a song and category first!</span>)}
  {selectedCategory && selectedSong ? (
  <div className="">
  <div className="flex">
  <div className="flscreen">
  <button onClick={fullScreenOp}><MdFullscreen className="text-4xl hover:text-red-500" /></button>
  </div>
  <a href={UserConfig.Github} target="_blank" rel="noopener noreferrer" className="forcomp4-github flex overflow-hidden items-center text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-black text-white shadow hover:bg-black/90 h-9 px-4 py-2 max-w-52 whitespace-pre md:flex group relative w-full justify-center gap-2 rounded-md transition-all duration-300 ease-out hover:ring-2 hover:ring-black hover:ring-offset-2"><span class="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-40"></span>
  <div class="flex items-center">
  <svg class="w-4 h-4 fill-current" viewBox="0 0 438.549 438.549">
  <path d="..."></path>
  </svg>
  <span class="ml-1 text-white">Star on github</span>
  </div></a></div>
  <div className="for-both-cpdw">
  <button class="forcomps4-download download-button mt-2">
  <div class="docs">
  <svg
  viewBox="0 0 24 24"
  width="20"
  height="20"
  stroke="currentColor"
  stroke-width="2"
  fill="none"
  stroke-linecap="round"
  stroke-linejoin="round"
  class="css-i6dzq1"
  >
  <path
  d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
  ></path>
  <polyline points="14 2 14 8 20 8"></polyline>
  <line x1="16" y1="13" x2="8" y2="13"></line>
  <line x1="16" y1="17" x2="8" y2="17"></line>
  <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
  <h2 onClick={errAlert}>Download</h2>
  </div>
  <div class="download">
  <svg
  onClick={errAlert}
  viewBox="0 0 24 24"
  width="24"
  height="24"
  stroke="currentColor"
  stroke-width="2"
  fill="none"
  stroke-linecap="round"
  stroke-linejoin="round"
  class="css-i6dzq1"
  >
  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
  <polyline points="7 10 12 15 17 10"></polyline>
  <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
  </div>
  </button>
  <div style={{ marginLeft: '123px', marginTop: '-41px' }}>
  <button onClick={copySong} class="Btn">
  <svg viewBox="0 0 512 512" class="svgIcon" height="1em"><path d="M288 448H64V224h64V160H64c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H288c35.3 0 64-28.7 64-64V384H288v64zm-64-96H448c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H224c-35.3 0-64 28.7-64 64V288c0 35.3 28.7 64 64 64z"></path></svg>
  <p class="text">COPY</p>
  <span class="effect"></span>
  </button>
  <a className="cursor-pointer hover:text-red-500 text-2xl" style={{ fontFamily: 'Ubuntu Mono, monospace'}} onClick={handleOpenModal}>Report</a>
  </div>
  </div>
  </div>
  ) : ( <span className="text-red-500 mt-5"><br></br>İf u want download, Select any song.!</span>)}
  </div>
  <div className="allfavs text-white bg-[#121212] min-h-screen">
  <div className="">
  {/* Up { container mx-auto p-4} Bottom = {#4F9D00} */}
  <div className="bg-[#384E77] w-full flex p-4 items-center mb-6">
  <div className="text-3xl song-img text-black">
  <img style={{ height: '45px', borderRadius: '50%' }} src={UserConfig.pURL}/>
  </div>
  <h1 className="ml-5 text-2xl text-black" style={{ fontFamily: 'Ubuntu Mono, monospace', userSelect: 'none' }}>
  <div class="card" style={{ marginLeft: '-45px' }}>
  <div class="loader" style={{ marginTop: '-15px' }}>
  <p style={{ marginTop: '10px', color: `${UserConfig.color}`, fontFamily: `${UserConfig.font}` }}>{UserConfig.name} {UserConfig.surname} </p>
  <div class="words">
      {/* <span class="word">Musics</span>
      <span class="word">Songs</span>
      <span class="word">Podcasts</span>
      <span class="word">Rapping</span>
      <span class="word">Classics</span> */}
  </div>
  </div>
  </div>
  </h1>
  </div>
  {Object.keys(groupedCategories).map((category, index) => (
  <div
  key={index}
  className="w-96 forcomp2 flex rounded-full p-3 bg-[#333333] items-center hover:bg-[#444444] transition-colors duration-300 cursor-pointer mb-2"
  onClick={() => {
  handlePlaylistClick(category);
  }}
  style={{ userSelect: 'none' }}
  >
  <MdFeaturedPlayList className="text-green-500 mt-1" />
  <span className="ml-3 text-white" style={{ fontFamily: `${UserConfig.font}` }}><strong>{category}</strong> - Playlist</span>
  </div>
  ))}
  </div>
  <div
  className="torch"
  style={{
  top: `${position.y}px`,
  left: `${position.x}px`,
  }}
  ></div>
  <Footer/>
  <div 
  className="songs-container myfs forcomp flex justify-center items-center">
  <div
  style={{
  marginTop: '-15px',
  overflowY: 'auto',
  width: '400px',
  userSelect: 'none',
  }}
  className="custom-scrollbar listphone listcomputer bg-[#222222] rounded-lg p-4 shadow-lg"
  >
  <h2
  style={{
  fontFamily: 'Ubuntu Mono, monospace',
  fontSize: '25px',
  justifyContent: 'center',
  alignItems: 'center',
  }}
  >
  <form
  onSubmit={handleSearch}
  className="form-search flex items-center bg-[#191414] text-white rounded-full px-4 py-2 shadow-md w-full max-w-md mx-auto"
  >
  <FaSearch className="text-gray-400 text-xl mr-3" />
  {selectedCategory && (
  <input
  type="text"
  style={{ fontFamily: 'Alfa Slab One, serif' }}
  placeholder={`Search in ${selectedCategory}`}
  value={query}
  onChange={(e) => {
  setQuery(e.target.value);
  handleSearch(e.target.value);
  }}
  className="bg-transparent text-sm placeholder-gray-400 focus:outline-none flex-grow"
  />
  )}
  </form>
  </h2>
  {filteredSongs.length > 0 ? (
  filteredSongs.map((song, index) => (
  <div
  key={index}
  style={{ fontFamily: 'Poppins, serif', userSelect: 'none' }}
  className="w-full flex rounded-lg p-3 mt-2 shadow-[0_0_20px_5px_rgba(52,1,436,0.2)] bg-[#333333] items-center songs-item hover:bg-[#444444] transition-colors cursor-pointer mb-2"
  onClick={() => {
  handleSongClick(song);
  togglePanel();
  }}
  >
  <MdOutlineMusicNote />
  <span className="ml-3 text-white">
  <strong>{song.category}</strong> - {song.title}
  </span>
  </div>
  ))
  ) : (
  <div className="text-white text-center">
  No songs found in this category.<br />
  <a className="text-red-500">Select Category!</a>
  </div>
  )}
  </div>
  </div>
  {showAllSongs && filteredSongs.length > 7 && (
  <div className="flex justify-center mt-4">
  <footer className="fixed bottom-0 left-0 w-full bg-[#7C9EB2] p-6 flex flex-col items-center gap-4 shadow-lg">
  {selectedSong && (
  <div className="text-white flex items-center mr-16 gap-4 text-center mt-4">
  <BsFileMusicFill className="text-5xl mr-5" />
  <div className="flex flex-col text-xl font-semibold" style={{ fontFamily: 'Ubuntu Mono, monospace' }}>
  <strong style={{ userSelect: 'none' }}>{selectedSong.category}</strong><a style={{ userSelect: 'none' }}> - </a> {' '}
  <span className="flex flex-col items-center gap-3">
  <a
  href={"https://www.google.com/search?q=" + encodeURIComponent(selectedCategory) + " " + encodeURIComponent(selectedSong.title)}
  className="text-blue-200 hover:text-blue-400 transition-all duration-300"
  target="_blank"
  rel="noopener noreferrer"
  >
  {selectedSong.title}
  </a>
  </span>
  </div>
  </div>
  )}
  {selectedSong && (
  <div className="w-full flex flex-col ">
  <div className="flex items-center justify-between mb-2">
  <span className="text-sm text-gray-300"   style={{ userSelect: 'none' }}  >{Math.floor(currentTime)}</span>
  <span className="text-sm text-gray-300"   style={{ userSelect: 'none' }}  >{Math.floor(duration)}</span>
  </div>
  <div className="flex flex-col items-center gap-4">
  <div className="flex items-center gap-6">
  <button style={{ fontSize: '25px', color: 'white'}} onClick={muteTogs}>
  {cmute ? <GoUnmute /> : <FaVolumeMute />}
  </button>  {isPlaying ? (
  <FaPause
  onClick={pauseAudio}
  className="text-white cursor-pointer text-4xl hover:text-gray-400 transition-all"
  />
  ) : (
  <FaPlay
  onClick={playAudio}
  className="text-white cursor-pointer text-4xl hover:text-gray-400 transition-all"
  />
  )}
  </div>
  <input
  type="range"
  value={currentTime}
  max={duration}
  onChange={handleProgressBarChange}
  className="w-full h-1 bg-gray-600 cursor-pointer rounded-full"
  style={{ userSelect: 'none' }}
  />
  </div>
  </div>
  )}
  </footer>
  </div>
  )}
  <audio ref={audioRef} hidden onEnded={() => setSelectedSong(null)} />
  {showFooter && (
  <footer className="forcomp3 fixed bottom-0 left-0 w-full bg-[#18314F] p-6 flex flex-col items-center gap-4 shadow-lg">
  {selectedSong && (
  <div className="text-white flex items-center mr-16 gap-4 text-center mt-4">
  <BsFileMusicFill className="text-5xl mr-5" />
  <div className="flex flex-col text-xl font-semibold" style={{ fontFamily: 'Ubuntu Mono, monospace' }}>
  <strong style={{ userSelect: 'none' }}>{selectedSong.category}</strong><a style={{ userSelect: 'none' }}> - </a> {' '}
  <span className="flex flex-col items-center gap-3">
  <a
  href={"https://www.google.com/search?q=" + encodeURIComponent(selectedCategory) + " " + encodeURIComponent(selectedSong.title)}
  className="text-blue-200 hover:text-blue-400 transition-all duration-300"
  target="_blank"
  rel="noopener noreferrer"
  >
  {selectedSong.title}
  </a>
  </span>
  </div>
  </div>
  )}
  {selectedSong && (
  <div className="w-full flex flex-col ">
  <div className="flex items-center justify-between mb-2">
  <span className="text-sm text-gray-300"   style={{ userSelect: 'none' }}  >{Math.floor(currentTime)}</span>
  <span className="text-sm text-gray-300"   style={{ userSelect: 'none' }}  >{Math.floor(duration)}</span>
  </div>
  <div className="flex flex-col items-center gap-4">
  <div className="flex items-center gap-6">
  <div className="audio-controls-container ml-5 ">
  <input
  id="audio-controls"
  type="range"
  min="0"
  max="1"
  step="0.01"
  value={volume}
  onChange={handleVolumeChange}
  className="audio-range"
  />
  </div>
  <button style={{ fontSize: '25px', color: 'white', display: 'flex' }} onClick={muteTogs}>
  {cmute ? <GoUnmute /> : <FaVolumeMute />}
  </button>  {isPlaying ? (
  <FaPause
  onClick={pauseAudio}
  className="text-white cursor-pointer text-4xl hover:text-gray-400 transition-all"
  />
  ) : (  
  <FaPlay
  onClick={playAudio}
  className="text-white cursor-pointer text-4xl hover:text-gray-400 transition-all"
  />
  )}
  </div>
  <input
  type="range"
  value={currentTime}
  max={duration}
  onChange={handleProgressBarChange}
  className="w-full h-1 bg-gray-600 cursor-pointer rounded-full"
  style={{ userSelect: 'none' }}
  />
  </div>
  </div>
  )}
  </footer>
  )}
  </div>
  <div>
  {showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
  <div className="bg-white p-6 forall rounded shadow-lg w-80">
  <h2 className="text-lg font-bold mb-4">
  <input 
   type="text"
   placeholder="Enter Your Message"
   className=""
   style={{ fontFamily: 'Teko, serif', fontSize: '25px' }}
  />
  <span class="input-border"></span>
  </h2>
  <div className="flex space-x-4">
  <button
  onClick={handleCloseModal}
  className="px-4 py-2 items-start bg-gray-300 rounded hover:bg-gray-400 transition"
  >
  Exit
  </button>
  <button
  onClick={handleNavigate}
  style={{ marginLeft: '155px' }}
  className="px-4 py-2 bg-blue-500 hover:text-red-500 text-white rounded hover:bg-blue-600 transition"
  ><MdSend className="-rotate-45"/>
  </button>
  </div>
  </div>
  </div>
  )}
  </div>
  <ToastContainer />
  </div>
  </>
  );
  };
export default App;
