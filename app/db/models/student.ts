const StudentSchema = new Schema({
     studentType: { 
       type: String, 
       enum: ['university','individual'], 
       required: true 
     },
     stats:    { type: [StatSchema], required: true },
     rewards:  { type: RewardSchema, required: true }
     // you could also embed leaderboard entries here if desired:
     // leaderboard: { type: [LeaderboardEntrySchema] }
   }, {
     timestamps: true
   });
   
   module.exports = {
     Stat: mongoose.model('Stat', StatSchema),
     LeaderboardEntry: mongoose.model('LeaderboardEntry', LeaderboardEntrySchema),
     Reward: mongoose.model('Reward', RewardSchema),
     Student: mongoose.model('Student', StudentSchema)
   };
   