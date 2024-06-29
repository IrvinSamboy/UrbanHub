import mongoose from "mongoose";

const propertieSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      regularPrice: {
        type: Number,
        required: true,
      },
      discountPrice: {
        type: Number,
        required: true,
      },
      bathrooms: {
        type: Number,
        required: true,
      },
      bedrooms: {
        type: Number,
        required: true,
      },
      parkings: {
        type: Number,
        required: true,
      },
      furnished: {
        type: Boolean,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      propertyType: {
        type: String,
        required: true,
      },
      offer: {
        type: Boolean,
        required: true,
      },
      imageUrls: {
        type: Array,
        required: true,
      },
      userRef: {
        type: String,
        required: true,
      },
      user: {
        type: mongoose.Schema.Types.ObjectId, // Tipo de referencia ObjectId
        ref: 'users', // Nombre del modelo referenciado (userModel)
        required: true,
    },
      lat: {
        type: Number,
        required: true,
      },
      lng: {
        type: Number,
        required: true,
      },
      featured: {
        type: Boolean,
        default: false,
      }
    },
    { timestamps: true }  
)

const propertiesModel = mongoose.model('properties', propertieSchema);

export default propertiesModel;