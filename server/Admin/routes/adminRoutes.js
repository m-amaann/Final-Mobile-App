const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// CRUD routes
router.post('/login', adminController.login);
router.get('/logout', adminController.logout);
router.get('/getAllAdmins', adminController.getAllAdmins); 
router.get('/getAdminById/:id', adminController.getAdminById); 
router.post('/createAdmin', adminController.createAdmin); 
router.put('/updateAdmin/:id', adminController.updateAdmin); 
router.delete('/deleteAdmin/:id', adminController.deleteAdmin); 


module.exports = router;