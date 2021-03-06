module.exports = app => {
    const mongoose = app.mongoose;
    const UserSchema = new mongoose.Schema({
      name: { 
          type: String 
         },
      age: { 
          type: Number 
         },
      phoneNumber: {
             type:Number
         }
    });
  
    return mongoose.model('User', UserSchema);
  }