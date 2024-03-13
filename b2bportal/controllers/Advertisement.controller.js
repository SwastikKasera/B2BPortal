  const Advertisement = require('../models/Advertisement.model');

  const createAd = async (req, res) => {
    const { title, description, category, companyId, companyName } = req.body;

    try {
      
      if (!title || !description || !category || !companyId) {
        return res.status(400).json({ message: 'Incomplete data provided' });
      }
      
      const newAdvertisement = new Advertisement({
        title,
        description,
        category,
        companyId,
        companyName
      });

      await newAdvertisement.save();

      res.status(201).json({ message: 'Advertisement created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  const getAllAds = async (req, res) => {
      const companyId = req.params.companyId;
    
      try {
        // Retrieve advertisements based on companyId
        const adsByCompany = await Advertisement.find({ companyId });
    
        res.status(200).json(adsByCompany);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
  };

  const deleteAdById = async (req, res) => {
      const adId = req.params.adId;
    
      try {

        const deletedAd = await Advertisement.deleteOne({_id: adId});

        if (!deletedAd) {
          return res.status(404).json({ message: 'Advertisement not found' });
        }
    
        res.status(200).json({ message: 'Advertisement deleted successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
    };
    
    const searchAds = async (req, res) => {
      const { keyword } = req.body;
    
      try {
          const matchedAds = await Advertisement.find({
          $or: [
              { title: { $regex: keyword, $options: 'i' } },
              { description: { $regex: keyword, $options: 'i' } } 
          ],
          })
          .sort({
              createdAt: -1,
              priority: 1,
          });
    
        res.status(200).json(matchedAds);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
    };

    const getAllOtherAds = async (req, res) => {
      try {
        const { companyId } = req.body;
    
        // Retrieve advertisements from other companies
        const otherAds = await Advertisement.find({ companyId: { $ne: companyId } });
    
        res.status(200).json(otherAds);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
    };
  module.exports = {createAd, getAllAds, deleteAdById, searchAds, getAllOtherAds};
