const db = require('../models');

const Property = db.propertys;
const PropertyMedia = db.property_medias;
const User = db.users;

const addProperty = async (req, res) => {
  try {
    let info = {
      property_type: req.body.property_type,
      property_location: req.body.property_location,
      property_locality: req.body.property_locality,
      property_area: req.body.property_area,
      property_front: req.body.property_front,
      property_deep: req.body.property_deep,
      plot_face: req.body.plot_face,
      corner_plot: req.body.corner_plot,
      no_of_open_sides: req.body.no_of_open_sides,
      plot_boundaries: req.body.plot_boundaries,
      facing_road_width: req.body.facing_road_width,
      plot_land_mark: req.body.plot_land_mark,
      near_by: req.body.near_by,
      expected_price: req.body.expected_price,
      price_per_sqft: req.body.price_per_sqft,
      google_map_link: req.body.google_map_link,
      user_id: req.userId,
      isActive: true,
    };
    if (
      info.property_type === null ||
      info.property_type === undefined ||
      info.user_id === null ||
      info.user_id === undefined
    ) {
      res.status(200).json({
        statuscode: 400,
        message: 'Invalid request!',
      });
    } else {
      const property = await Property.create(info);
      res.status(200).json({
        statuscode: 200,
        message: 'Property added successfully!',
        data: property.id,
      });
    }
  } catch (e) {
    console.log('Error', e);
    res.status(200).json({
      statuscode: 500,
      message: 'Something went wrong, please try again.',
    });
  }
};

const addMedia = async (req, res) => {
  try {
    if (req.files.length === 0) {
      res.status(200).json({
        statuscode: 400,
        message: 'Invalid request!',
      });
    } else {
      var media_type = req.body.mediaType;
      var property_id = req.body.property_id;
      await req.files.forEach(async (ele) => {
        await PropertyMedia.create({
          media_link: ele.filename,
          media_type: media_type,
          property_id,
        });
      });
      res.status(200).json({
        statuscode: 200,
        message: 'Files Uploaded!',
      });
    }
  } catch (e) {
    console.log(e, 'error');
    res.status(200).json({
      statuscode: 500,
      message: 'Something Went wrong!',
    });
  }
};

const getAllProperty = async (req, res) => {
  try {
    User.hasMany(Property, { foreignKey: 'user_id' });
    Property.belongsTo(User, { foreignKey: 'user_id' });

    Property.hasMany(PropertyMedia, { foreignKey: 'property_id' });
    PropertyMedia.belongsTo(Property, { foreignKey: 'property_id' });

    let property = await Property.findAll({
      include: [User, PropertyMedia],
      order: [['id', 'DESC']],
      where: { isActive: true },
    });
    res.status(200).json({
      statuscode: 200,
      message: 'Property Listed Successfully.',
      data: property,
    });
  } catch (e) {
    console.log('Error', e);
    res.status(200).json({
      statuscode: 500,
      message: 'Something went wrong, please try again.',
    });
  }
};

const getAllPropertyArchieved = async (req, res) => {
  try {
    let property = await Property.findAll({
      order: [['id', 'DESC']],
      where: { isActive: false },
    });
    res.status(200).json({
      statuscode: 200,
      message: 'Property Listed Successfully.',
      data: property,
    });
  } catch (e) {
    console.log('Error', e);
    res.status(200).json({
      statuscode: 500,
      message: 'Something went wrong, please try again.',
    });
  }
};

const getOneProperty = async (req, res) => {
  let id = req.body.id;
  try {
    if (id === null || id === undefined) {
      res.status(200).json({
        statuscode: 400,
        message: 'Invalid request!',
      });
    } else {
      User.hasMany(Property, { foreignKey: 'user_id' });
      Property.belongsTo(User, { foreignKey: 'user_id' });

      Property.hasMany(PropertyMedia, { foreignKey: 'property_id' });
      PropertyMedia.belongsTo(Property, { foreignKey: 'property_id' });
      let property = await Property.findOne({include: [User, PropertyMedia], where: { id: id } });
      if (property === null) {
        res.status(200).json({
          statuscode: 400,
          message: 'Property not found.',
        });
      } else {
        res.status(200).json({
          statuscode: 200,
          message: 'Property Listed Successfully.',
          data: property,
        });
      }
    }
  } catch (e) {
    console.log('Error', e);
    res.status(200).json({
      statuscode: 500,
      message: 'Something went wrong, please try again.',
    });
  }
};

const updateProperty = async (req, res) => {
  try {
    let info = {
      property_type: req.body.property_type,
      property_location: req.body.property_location,
      property_locality: req.body.property_locality,
      property_area: req.body.property_area,
      property_front: req.body.property_front,
      property_deep: req.body.property_deep,
      plot_face: req.body.plot_face,
      corner_plot: req.body.corner_plot,
      no_of_open_sides: req.body.no_of_open_sides,
      plot_boundaries: req.body.plot_boundaries,
      facing_road_width: req.body.facing_road_width,
      plot_land_mark: req.body.plot_land_mark,
      near_by: req.body.near_by,
      expected_price: req.body.expected_price,
      price_per_sqft: req.body.price_per_sqft,
      google_map_link: req.body.google_map_link,
      user_id: req.userId,
    };
    let id = req.body.id;
    if (id === null || id === undefined) {
      res.status(200).json({
        statuscode: 400,
        message: 'Invalid request!',
      });
    } else {
      let property = await Property.findOne({ where: { id: id } });
      if (property !== null) {
        if (
          info.property_type === null ||
          info.property_type === undefined ||
          info.user_id === null ||
          info.user_id === undefined
        ) {
          res.status(200).json({
            statuscode: 400,
            message: 'Invalid request!',
          });
        } else {
          await Property.update(info, { where: { id: id } });
          res.status(200).json({
            statuscode: 200,
            message: 'Property updated successfully!',
            data: id,
          });
        }
      } else {
        res.status(200).json({
          statuscode: 400,
          message: 'Invalid request!',
        });
      }
    }
  } catch (e) {
    console.log('Error', e);
    res.status(200).json({
      statuscode: 500,
      message: 'Something went wrong, please try again.',
    });
  }
};

const deleteProperty = async (req, res) => {
  let id = req.body.id;
  let isActive = req.body.isActive;
  try {
    if (id === null || id === undefined) {
      res.status(200).json({
        statuscode: 400,
        message: 'Invalid request!',
      });
    } else {
      let property = await Property.findOne({ where: { id: id } });
      if (property !== null) {
        let property = await Property.update(
          { isActive: isActive },
          { where: { id: id } }
        );
        res.status(200).json({
          statuscode: 200,
          message: 'Property Deleted Successfully.',
          data: property,
        });
      } else {
        res.status(200).json({
          statuscode: 400,
          message: 'Invalid request!',
        });
      }
    }
  } catch (e) {
    console.log('Error', e);
    res.status(200).json({
      statuscode: 500,
      message: 'Something went wrong, please try again.',
    });
  }
};

const deletePropertyFile = async (req, res) => {
  let id = req.body.id;
  let link = req.body.link;
  console.log(id, link);
  try {
    if (id === null || id === undefined) {
      res.status(200).json({
        statuscode: 400,
        message: 'Invalid request!',
      });
    } else {
      let property = await PropertyMedia.findOne({ where: { id: id } });
      if (property !== null) {
        let property = await PropertyMedia.destroy({ where: { id: id } });
        const fs = require('fs');
        fs.unlink('./public/uploads/' + link, (err) => {
          if (err) {
            throw err;
          }
          console.log('Delete File successfully.');
        });
        res.status(200).json({
          statuscode: 200,
          message: 'Media Deleted Successfully.',
          data: property,
        });
      } else {
        res.status(200).json({
          statuscode: 400,
          message: 'Invalid request!',
        });
      }
    }
  } catch (e) {
    console.log('Error', e);
    res.status(200).json({
      statuscode: 500,
      message: 'Something went wrong, please try again.',
    });
  }
};

module.exports = {
  addProperty,
  getAllProperty,
  getOneProperty,
  updateProperty,
  deleteProperty,
  getAllPropertyArchieved,
  addMedia,
  deletePropertyFile,
};
