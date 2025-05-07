const BadgeSchema = new Schema({
     name:        { type: String, required: true },    // e.g. "Problem Solver"
     description: { type: String },                    // e.g. "Solved 10+ problems"
     earned:      { type: Boolean, default: false },
     icon:        { type: String }                     // e.g. "trophy"
   }, { _id: false });
   
   const RewardSchema = new Schema({
     points:        { type: Number, required: true },  // current points
     nextMilestone: { type: Number, required: true },  // e.g. 1500
     badges:        [BadgeSchema]
   }, { timestamps: true });kdfjd
   