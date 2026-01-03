/**
 * Log model for storing system logs
 * Each log document contains information about HTTP requests
 */
import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now,
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
  method: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  statusCode: {
    type: Number,
    required: true,
  },
  durationMs: {
    type:  Number,
  },
  message: {
    type: String,
  },
  userId: {
    type: Number,
  },
  error: {
    type: String,
  },
}, {
  collection: 'logs',
  timestamps: true,
});

export const Log = mongoose.model('Log', logSchema);