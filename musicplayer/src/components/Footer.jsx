import React from "react";
import { FaPlay, FaPause, FaVolumeMute } from "react-icons/fa";
import { GoUnmute } from "react-icons/go";
import { BsFileMusicFill } from "react-icons/bs";

const Footer = ({
  selectedSong,
  currentTime,
  duration,
  isPlaying,
  playAudio,
  pauseAudio,
  handleProgressBarChange,
  muteTogs,
  cmute,
  volume,
  handleVolumeChange,
  showFooter,
  selectedCategory,
  showModal,
  handleCloseModal,
  handleNavigate
}) => {
  return (
    showFooter && (
      <footer className="forcomp3 fixed bottom-0 left-0 w-full bg-[#18314F] p-6 flex flex-col items-center gap-4 shadow-lg">
        {selectedSong && (
          <div className="text-white flex items-center mr-16 gap-4 text-center mt-4">
            <BsFileMusicFill className="text-5xl mr-5" />
            <div className="flex flex-col text-xl font-semibold" style={{ fontFamily: 'Ubuntu Mono, monospace' }}>
              <strong style={{ userSelect: 'none' }}>{selectedSong.category}</strong><a style={{ userSelect: 'none' }}> - </a>
              {' '}
              <span className="flex flex-col items-center gap-3">
                <a
                  href={`https://www.google.com/search?q=${encodeURIComponent(selectedCategory)} ${encodeURIComponent(selectedSong.title)}`}
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
          <div className="w-full flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-300" style={{ userSelect: 'none' }}>
                {Math.floor(currentTime)}
              </span>
              <span className="text-sm text-gray-300" style={{ userSelect: 'none' }}>
                {Math.floor(duration)}
              </span>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-6">
                <div className="audio-controls-container ml-5">
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
                </button>
                {isPlaying ? (
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
    )
  );
};

export default Footer;
