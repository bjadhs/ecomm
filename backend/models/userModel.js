import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    unique: true
  },
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
  },
  imageUrl: {
    type: String,
    default: ""
  },
  addresses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Address' }],
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
}, {
  timestamps: true
});


export const User = mongoose.model('User', userSchema);
