const db = require('../models');
const { jsPDF } = require('jspdf');
const path = require('path');

const Property = db.propertys;
const PropertyMedia = db.property_medias;
const User = db.users;

async function addImageProcess(src) {
  return new Promise(async (resolve, reject) => {
    let img = new Image();
    img.src = src;
    img.alt = '';
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
}

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
      source_name: req.body.source_name,
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
      let property = await Property.findOne({
        include: [User, PropertyMedia],
        where: { id: id },
      });
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
      source_name: req.body.source_name,
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
        if (info.property_type === null || info.property_type === undefined) {
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

const download = async (req, res) => {
  try {
    User.hasMany(Property, { foreignKey: 'user_id' });
    Property.belongsTo(User, { foreignKey: 'user_id' });

    Property.hasMany(PropertyMedia, { foreignKey: 'property_id' });
    PropertyMedia.belongsTo(Property, { foreignKey: 'property_id' });
    let property = await Property.findOne({
      include: [User, PropertyMedia],
      where: { id: req.body.id },
    });
    const doc = new jsPDF({
      format: 'a4',
      unit: 'px',
      externals: {
        // only define the dependencies you are NOT using as externals!
        canvg: 'canvg',
        html2canvas: 'html2canvas',
        dompurify: 'dompurify',
        pagebreak: { mode: 'avoid-all', after: '.avoidThisRow' },
      },
    });
    // Adding the fonts.
    console.log(path.join(__dirname, '../public/img/logo-white.png'));
    doc.setFont('helvetica', 'normal');
    const image = path.join(__dirname, '../public/img/logo-white.png');
    var fs = require('fs');
    var imgData = fs.readFileSync(image).toString('base64');
    doc.addImage(imgData, 'png', 30, 20, 130, 0);
    doc.setTextColor('blue');
    property.google_map_link !== null &&
      doc.textWithLink('View on map', 350, 100, {
        url: property.google_map_link,
        style: { color: 'blue' },
      });
    doc.setTextColor('black');
    doc.setFontSize(22);
    doc.text('Property Details:', 30, 100);
    doc.setFontSize(11);
    doc.setLineWidth(0.05);
    doc.rect(30, 110, 390, 490);
    let lineHeight = 125;

    doc.setFont('helvetica', 'bold');
    doc.text('Property Type:', 40, 125);
    doc.setFont('helvetica', 'normal');
    doc.text(property.property_type, 140, 125);
    lineHeight += 9;
    doc.line(30, lineHeight, 420, lineHeight);

    lineHeight += doc.getLineHeight(
      property.property_location !== null ? property.property_location : 'tt'
    );
    doc.setFont('helvetica', 'bold');
    doc.text('Property Location:', 40, lineHeight);
    doc.setFont('helvetica', 'normal');
    doc.setFOnt;
    doc.text(property.property_location, 140, lineHeight);
    doc.line(30, lineHeight + 7.5, 420, lineHeight + 7.5);

    lineHeight += doc.getLineHeight(property.property_type) + 6.5;
    doc.setFont('helvetica', 'bold');
    doc.text('Property Locality:', 40, lineHeight);
    doc.setFont('helvetica', 'normal');
    doc.text(property.property_locality, 140, lineHeight);
    doc.line(30, lineHeight + 7.5, 420, lineHeight + 7.5);

    lineHeight += doc.getLineHeight(property.property_type) + 6.5;
    doc.setFont('helvetica', 'bold');
    doc.text('Property Area:', 40, lineHeight);
    doc.setFont('helvetica', 'normal');
    doc.text(property.property_area, 140, lineHeight);
    doc.line(30, lineHeight + 7.5, 420, lineHeight + 7.5);

    lineHeight += doc.getLineHeight(property.property_type) + 6.5;
    doc.setFont('helvetica', 'bold');
    doc.text('Property Front:', 40, lineHeight);
    doc.setFont('helvetica', 'normal');
    doc.text(property.property_front, 140, lineHeight);
    doc.line(30, lineHeight + 7.5, 420, lineHeight + 7.5);

    lineHeight += doc.getLineHeight(property.property_type) + 6.5;
    doc.setFont('helvetica', 'bold');
    doc.text('Property Deep:', 40, lineHeight);
    doc.setFont('helvetica', 'normal');
    doc.text(property.property_deep, 140, lineHeight);
    doc.line(30, lineHeight + 7.5, 420, lineHeight + 7.5);

    lineHeight += doc.getLineHeight(property.property_type) + 6.5;
    doc.setFont('helvetica', 'bold');
    doc.text('Plot Face:', 40, lineHeight);
    doc.setFont('helvetica', 'normal');
    doc.text(property.plot_face, 140, lineHeight);
    doc.line(30, lineHeight + 7.5, 420, lineHeight + 7.5);

    lineHeight += doc.getLineHeight(property.property_type) + 6.5;
    doc.setFont('helvetica', 'bold');
    doc.text('Corner Plot:', 40, lineHeight);
    doc.setFont('helvetica', 'normal');
    doc.text(property.corner_plot, 140, lineHeight);
    doc.line(30, lineHeight + 7.5, 420, lineHeight + 7.5);

    lineHeight += doc.getLineHeight(property.property_type) + 6.5;
    doc.setFont('helvetica', 'bold');
    doc.text('No Of Open Sides:', 40, lineHeight);
    doc.setFont('helvetica', 'normal');
    doc.text(property.no_of_open_sides, 140, lineHeight);
    doc.line(30, lineHeight + 7.5, 420, lineHeight + 7.5);

    lineHeight += doc.getLineHeight(property.property_type) + 6.5;
    doc.setFont('helvetica', 'bold');
    doc.text('Plot Boundaries:', 40, lineHeight);
    doc.setFont('helvetica', 'normal');
    doc.text(property.plot_boundaries, 140, lineHeight);
    doc.line(30, lineHeight + 7.5, 420, lineHeight + 7.5);

    lineHeight += doc.getLineHeight(property.property_type) + 6.5;
    doc.setFont('helvetica', 'bold');
    doc.text('Facing Road Width:', 40, lineHeight);
    doc.setFont('helvetica', 'normal');
    doc.text(property.facing_road_width, 140, lineHeight);
    doc.line(30, lineHeight + 7.5, 420, lineHeight + 7.5);

    lineHeight += doc.getLineHeight(property.property_type) + 6.5;
    doc.setFont('helvetica', 'bold');
    doc.text('Plot Land Mark:', 40, lineHeight);
    doc.setFont('helvetica', 'normal');
    doc.text(property.plot_land_mark, 140, lineHeight);
    doc.line(30, lineHeight + 7.5, 420, lineHeight + 7.5);

    lineHeight += doc.getLineHeight(property.property_type) + 6.5;
    doc.setFont('helvetica', 'bold');
    doc.text('Near By:', 40, lineHeight);
    doc.setFont('helvetica', 'normal');
    doc.text(property.near_by, 140, lineHeight);
    doc.line(30, lineHeight + 7.5, 420, lineHeight + 7.5);

    lineHeight += doc.getLineHeight(property.property_type) + 6.5;
    doc.setFont('helvetica', 'bold');
    doc.text('ExpectedPrice:', 40, lineHeight);
    doc.setFont('helvetica', 'normal');
    doc.text(property.expected_price, 140, lineHeight);
    doc.line(30, lineHeight + 7.5, 420, lineHeight + 7.5);

    property.property_media
      .filter((ele) => ele.media_type === 'image')
      .forEach((ele) => {
        doc.addPage();
        var imgData = fs
          .readFileSync(
            path.join(__dirname, '../public/uploads/' + ele.media_link)
          )
          .toString('base64');
        doc.addImage(imgData, 'png', 30, 30, 340, 0);
      });

    await doc.save(
      path.join(__dirname, '../public/property/PROPERTY' + property.id + '.pdf')
    );
    res.status(200).json({
      statuscode: 200,
      message: 'Media URL added.',
      data: 'PROPERTY' + property.id + '.pdf',
      name: 'PROPERTY' + property.id + '.pdf',
    });
  } catch (e) {
    console.log('Error', e);
    res.status(200).json({
      statuscode: 500,
      message: 'Something went wrong, please try again.',
      error: e,
      path: path.join(__dirname, '../public/img/logo-white.png'),
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
  download,
};
