const { sources } = require('../models');
const db = require('../models');

const Source = db.sources;

const addSource = async (req, res) => {
  try {
    let info = {
      source: req.body.source,
    };
    if (info.source === null) {
      res.status(200).json({
        statuscode: 400,
        message: 'Invalid request!',
      });
    } else {
      const source = await Source.create(info);
      res.status(200).json({
        statuscode: 200,
        message: 'Source added successfully!',
        data: source.id,
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

const listSource = async (req, res) => {
  try {
    let user = await Source.findAll({
      attributes: ['id', 'source'],
      order: [['id', 'DESC']],
    });
    res.status(200).json({
      statuscode: 200,
      message: 'Source Listed Successfully.',
      data: user,
    });
  } catch (e) {
    console.log('Error', e);
    res.status(200).json({
      statuscode: 500,
      message: 'Something went wrong, please try again.',
    });
  }
};

module.exports = {
  addSource,
  listSource,
};
