import express from 'express'
import {createPropertie, detelePropertie, getThreeProperties, updatePropertie, setFeatured ,getProperties, getPropertieAndUser, getPropertiesSerch} from '../controllers/PropertiesController.js'
import { verifyToken } from '../utils/verifyUser.js'

const router = express.Router()

router.post('/create', createPropertie)
router.delete('/delete/:id', verifyToken, detelePropertie)
router.put('/update/:id', verifyToken, updatePropertie)
router.get('/get/:id', getProperties)
router.get('/getPropertyAndUser/:id', getPropertieAndUser)
router.get('/serch', getPropertiesSerch)
router.put('/featured/:id', setFeatured)
router.get('/getthree', getThreeProperties)
export default router