// settingsRoute.js
const express = require('express');
const router = express.Router();
const Settings = require('../models/SettingsModel');

router.get('/getsettings', async (req, res) => {
  try {
    const settings = await Settings.findOne();
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving settings' });
  }
});

router.put('/settings', async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings();
    }
    settings.newArrival = req.body.newArrival;
    settings.popular = req.body.popular;
    settings.topSale = req.body.topSale;

    await settings.save();

    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Error updating settings' });
  }
});

module.exports = router;
