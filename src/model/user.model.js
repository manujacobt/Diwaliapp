const mongoose = require('mongoose');
mongoose.connect(
  'mongodb+srv://userone:userone@fsd.qrnq0.mongodb.net/DiwaliWishes?retryWrites=true&w=majority'
);
const Schema = mongoose.Schema;

const UserSchema = new Schema({  
 
  user1name: String,
  email: String,
     
});   

const Userdata = mongoose.model('userData', UserSchema);

module.exports = Userdata;
