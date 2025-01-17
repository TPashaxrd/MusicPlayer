module.exports = {
    "LOG_LEVEL": process.env.LOG_LEVEL || "debug",
    "CONNECTION_STRING": process.env.CONNECTION_STRING || "mongodb://localhost:27017/music_app",
    "PORT": process.env.PORT || "3000",
  }
  