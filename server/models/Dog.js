import mongoose from 'mongoose';

const dogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  breed: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true
  },
  size: {
    type: String,
    enum: ['small', 'medium', 'large'],
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'adopted', 'in_treatment', 'reserved'],
    default: 'available'
  },
  healthConditions: {
    type: [String],
    default: []
  },
  vaccinated: {
    type: Boolean,
    default: false
  },
  sterilized: {
    type: Boolean,
    default: false
  },
  specialCare: {
    type: String,
    default: ''
  },
  personality: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    required: true
  },
  images: {
    type: [String],
    default: []
  },
  arrivalDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const Dog = mongoose.model('Dog', dogSchema);

export default Dog;
