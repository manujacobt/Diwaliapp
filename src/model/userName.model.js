const mongoose = require('mongoose');
mongoose.connect(
  'mongodb+srv://userone:userone@fsd.qrnq0.mongodb.net/DiwaliWishes?retryWrites=true&w=majority'
);
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
   
});

const Username = mongoose.model('userName', UserSchema);

module.exports = Username;
