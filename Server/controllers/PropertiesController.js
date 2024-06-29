import propertiesModel from '../models/propertiesModel.js';
import userModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import { errorHandler } from '../utils/error.js';

export const createPropertie = async (req, res, next) => {
    const {name, description, address, regularPrice, discountPrice, 
    bathrooms, bedrooms, parkings, furnished, type, offer, imageUrls, propertyType, userRef, lat, lng, user} = req.body

    const propertie = new propertiesModel({name, description, address, regularPrice, discountPrice,
        bathrooms, bedrooms, parkings, furnished, propertyType, type, offer, imageUrls, userRef, lat, lng, user})
    
    try{
        await propertie.save()
        res.status(200).json(propertie)
    }
    catch(err){
        next(err)
    }
}

export const detelePropertie = async (req, res, next) => {
    const {id} = req.params
    const {password} = req.body
    const propertie = await propertiesModel.findById(id)

    if(!propertie) return next(errorHandler(404, 'Propertie not found'))

    if (propertie.userRef !== req.user.id) return next(errorHandler(403, 'Forbidden'))
    const user = await userModel.findById(propertie.userRef)    

    try{
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return next(errorHandler(400, 'Invalid password'))
        await propertiesModel.findByIdAndDelete(id)
        res.status(200).json({message: 'Propertie deleted'})
    }
    catch(err){
        next(err)
    }
}

export const updatePropertie = async (req, res, next) => {
    const propertie = await propertiesModel.findById(req.params.id)
    if(!propertie) return next(errorHandler(404, 'Propertie not found'))
    if(propertie.userRef !== req.user.id) return next(errorHandler(403, 'Forbidden'))
    try{
        const updatePropertie = await propertiesModel.findByIdAndUpdate(
        req.params.id,
        req.body, 
        {new: true})

        res.status(200).json(updatePropertie)
    }catch(err){
        next(err)
    }
}

export const getProperties = async (req, res, next) => {
    try{
        const properties = await propertiesModel.findById(req.params.id)
        if(!properties) return next(errorHandler(404, 'Properties not found'))
        res.status(200).json(properties)
    }
    catch(err){
        next(err)
    }
}

export const getPropertieAndUser = async (req, res, next) => {
    try {
        const property = await propertiesModel.findById(req.params.id).populate('user');

        if (!property) {
            return next(errorHandler(404, 'Property not found'));
        }

        res.status(200).json({
            property: {
                _id: property._id,
                name: property.name,
                description: property.description,
                address: property.address,
                regularPrice: property.regularPrice,
                discountPrice: property.discountPrice,
                bathrooms: property.bathrooms,
                bedrooms: property.bedrooms,
                parkings: property.parkings,
                furnished: property.furnished,
                type: property.type,
                offer: property.offer,
                imageUrls: property.imageUrls,
                lat: property.lat,
                lng: property.lng,
                propertyType: property.propertyType,
                user: {
                    _id: property.user._id,
                    username: property.user.username,
                    email: property.user.email,
                    photo: property.user.photo
                }
            }
        });
    } catch (err) {
        next(err);
    }
}

export const getPropertiesSerch = async (req, res, next) => {
    try{
        const limit = parseInt(req.query.limit) || 9
        const startIndex = parseInt(req.query.startIndex) || 0
        let offer = req.query.offer

        if (offer === undefined || offer === 'false') {
            offer = {$in: [true, false]}
        }

        let furnished = req.query.furnished

        if (furnished === undefined || furnished === 'false') {
            furnished = {$in: [true, false]}
        }

        let type = req.query.type

        if (type === undefined || type === 'anyone') {
            type = {$in: ['sell', 'rent']} 
        }
        
        let propertyType = req.query.propertyType

        if (propertyType === undefined || propertyType === 'anyone') {
            propertyType = {$in: [
                'Casa',
                'Apartamento',
                'Terreno',
                'Local Comercial',
                'Oficina',
                'Edificio',
                'Finca',
                'Villa',
                'Chalet',
                'Dúplex',
                'Penthouse',
                'Estudio',
                'Otro'
              ]}
        }

        
        const bedrooms = parseInt(req.query.bedrooms) || 0;
        const bathrooms = parseInt(req.query.bathrooms) || 0;
        const parkings = parseInt(req.query.parkings) || 0;

        const searchTerm = req.query.searchTerm || '';

        const serchDirections = req.query.serchDirections || '';



        const properties = await propertiesModel.find({
            name: { $regex: searchTerm, $options: 'i' },
            address: { $regex: serchDirections, $options: 'i' },
            offer,
            furnished,
            type,
            bedrooms: bedrooms !== 0 ? bedrooms : { $exists: true },
            bathrooms: bathrooms !== 0 ? bathrooms : { $exists: true },
            parkings: parkings !== 0 ? parkings : { $exists: true },

        })
        .limit(limit)
        .skip(startIndex)

        return res.status(200).json(properties)
    }
    catch(err){
        next(err)
    }
}

export const setFeatured = async (req, res, next) => {
    const {id} = req.params
    const featured = true

    try{
        const propertie = await propertiesModel.findById(id)
        if(!propertie) return next(errorHandler(404, 'Propertie not found'))
        const updatePropertie = await propertiesModel.findByIdAndUpdate(id, {featured}, {new: true})
        res.status(200).json(updatePropertie)
    }
    catch(err){
        next(err)
    }
}

export const getThreeProperties= async (req, res, next) => {
    try{
        const properties = await propertiesModel.find({}).limit(3)
        res.status(200).json(properties)
    }
    catch(err){
        next(err)
    }
}