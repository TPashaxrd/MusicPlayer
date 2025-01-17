const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    level: String,
    email: String,
    location: String,
    procType: String,
    log: mongoose.SchemaTypes.Mixed,
  },
  {
    versionKey: false,
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated",
    },
  }
);

class AuditLogs extends mongoose.Model {}

schema.loadClass(AuditLogs);
module.exports = mongoose.model("audit_logs", schema);
