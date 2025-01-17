const Enum = require("../config/Enum");
const AuditLogsModel = require("../db/models/AuditLogs");

let instance = null;

class AuditLogs {
  constructor() {
    if (!instance) {
      instance = this;
    }

    return instance;
  }

  info(email, location, procType, log) {
    this.#saveToDB({
      level: Enum.LOG_LEVELS.INFO,
      email,
      location,
      procType,
      log,
    });
  }
  warn(email, location, procType, log) {
    this.#saveToDB({
      level: Enum.LOG_LEVELS.WARN,
      email,
      location,
      procType,
      log,
    });
  }
  error(email, location, procType, log) {
    this.#saveToDB({
      level: Enum.LOG_LEVELS.ERROR,
      email,
      location,
      procType,
      log,
    });
  }
  debug(email, location, procType, log) {
    this.#saveToDB({
      level: Enum.LOG_LEVELS.DEBUG,
      email,
      location,
      procType,
      log,
    });
  }
  verbose(email, location, procType, log) {
    this.#saveToDB({
      level: Enum.LOG_LEVELS.VERBOSE,
      email,
      location,
      procType,
      log,
    });
  }
  http(email, location, procType, log) {
    this.#saveToDB({
      level: Enum.LOG_LEVELS.HTTP,
      email,
      location,
      procType,
      log,
    });
  }

  #saveToDB({ level, email, location, procType, log }) {
    AuditLogsModel.create({
      level,
      email,
      location,
      procType,
      log,
    });
  }
}

module.exports = new AuditLogs();
