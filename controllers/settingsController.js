const Setting = require('../models/Setting');

const getSettings = async (req, res) => {
    try {
        const settings = await Setting.find();
        // Convert array of {key, value} to a single object {key: value} for easier frontend consumption
        const settingsObject = settings.reduce((acc, curr) => {
            acc[curr.key] = curr.value;
            return acc;
        }, {});

        res.status(200).json(settingsObject);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateSetting = async (req, res) => {
    try {
        const { key, value } = req.body;

        // Upsert (update if exists, insert if new)
        const setting = await Setting.findOneAndUpdate(
            { key },
            { key, value },
            { new: true, upsert: true }
        );

        res.status(200).json(setting);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getSettings, updateSetting };
