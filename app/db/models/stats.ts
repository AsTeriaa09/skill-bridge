const mongoose = require('mongoose');
const { Schema } = mongoose;

const TrendSchema = new Schema({
  value:       { type: String, required: true },   // e.g. "150 points this month"
  positive:    { type: Boolean, default: true }     // trend direction
}, { _id: false });

const StatSchema = new Schema({
  title:       { type: String, required: true },    // e.g. "Problems Solved"
  value:       { type: String, required: true },    // e.g. "12/24"
  icon:        { type: String },                    // store icon name or path reference
  description: { type: String },                    // optional extra info
  trend:       { type: TrendSchema, required: false }// only for stats that have trend
}, { _id: false });
