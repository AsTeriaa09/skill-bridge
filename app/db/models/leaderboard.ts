const LeaderboardEntrySchema = new Schema({
     id:         { type: Number, required: true, unique: true },
     name:       { type: String, required: true },
     avatar:     { type: String },                     // could be URL, initials, etc.
     points:     { type: Number, required: true },
     rank:       { type: Number, required: true },
     department: { type: String },
     semester:   { type: String },
     badges:     [{ type: String }]                    // array of badge names
   }, { timestamps: true });
   