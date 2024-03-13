const express = require('express')
const Register = require('../controllers/Register.controller')
const Login = require('../controllers/Login.controller')
const auth = require('../middleware/auth.middleware')
const {createAd, getAllAds, deleteAdById, searchAds, getAllOtherAds} = require('../controllers/Advertisement.controller')
const { getAllChat, fetchOneChat } = require('../controllers/Chat.controller')
const Router = express.Router()

Router.post('/register', Register)
Router.post('/login', Login)
Router.post('/ads/create', auth, createAd)
Router.get('/ads/:companyId', auth, getAllAds)
Router.delete('/ads/:adId', auth, deleteAdById)
Router.post('/ads/search', auth, searchAds)
Router.post('/ads', auth, getAllOtherAds)
Router.get('/chats', auth, getAllChat)
Router.post('/fetchOneChat', auth, fetchOneChat)

module.exports = Router