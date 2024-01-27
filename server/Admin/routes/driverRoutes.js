const express = require('express');
const router = express.Router();
const adminController = require('../controllers/driverController');

// CRUD routes
router.post('/login', adminController.login);
router.get('/logout', adminController.logout);
router.get('/getAllDrivers', adminController.getAllDrivers); 
router.get('/getDriverById/:id', adminController.getDriverById); 
router.post('/createDriver', adminController.createDriver); 
router.put('/updateDriver/:id', adminController.updateDriver); 
router.delete('/deleteDrivers/:id', adminController.deleteDrivers); 


module.exports = router;