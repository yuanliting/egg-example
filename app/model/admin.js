module.exports = app => {
    const mongoose = app.mongoose;
    const AdminSchema = new mongoose.Schema({
      name: { 
          type: String 
         },
      pwd: { 
          type: Number 
         }
         
    });
  
    return mongoose.model('Admin', AdminSchema);
  }