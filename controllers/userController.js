const db = require('../models');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 's0//P4$$w0rD';
const bcrypt = require('bcrypt');

const User = db.users;

const loginApi = async (req, res) => {
  try {
    let { body } = req;
    if (Object.keys(body).length > 0) {
      if (body.hasOwnProperty('emailid') && body.hasOwnProperty('password')) {
        let emailid = body.emailid;
        let password = body.password;
        let user = await User.findOne({ where: { emailid: emailid } });
        // console.log(await bcrypt.hash('Bodhgaya@123', 10))
        if (user !== null) {
          if (user.isActive) {
            const matchPass = await bcrypt.compare(password, user.password);
            if (matchPass) {
              let token = jwt.sign(
                { email: user.emailid, id: user.id },
                SECRET_KEY
              );
              res.status(200).json({
                statuscode: 200,
                message: 'Login Successfull',
                token: token,
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.emailid,
                id: user.id,
                user_type: user.user_type,
                phone_number: user.phone_number,
              });
            } else {
              res.status(200).json({
                statuscode: 400,
                message: 'Invalid email or password',
              });
            }
          } else {
            res.status(200).json({
              statuscode: 400,
              message: 'User inactive please contact administrator',
            });
          }
        } else {
          res.status(200).json({
            statuscode: 400,
            message: 'Invalid email or password',
          });
        }
      } else {
        res.status(200).json({
          statuscode: 400,
          message: 'Invalid email or password',
        });
      }
    } else {
      res.status(200).json({
        statuscode: 400,
        message: 'Invalid email or password',
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

const addUser = async (req, res) => {
  try {
    let info = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: req.body.password,
      emailid: req.body.emailid,
      phone_number: req.body.phone_number,
      isActive: true,
      user_type: req.body.user_type,
      isSuper: false,
    };
    if (
      info.first_name === null ||
      info.first_name === undefined ||
      info.last_name === null ||
      info.last_name === undefined ||
      info.password === null ||
      info.password === undefined ||
      info.emailid === null ||
      info.emailid === undefined ||
      info.user_type === null ||
      info.user_type === undefined
    ) {
      console.log(info);
      res.status(200).json({
        statuscode: 400,
        message: 'Invalid request!',
      });
    } else {
      let user = await User.findOne({ where: { emailid: info.emailid } });
      if (user !== null) {
        res.status(200).json({
          statuscode: 400,
          message: 'Email Already Registered!',
        });
      } else {
        info.password = await bcrypt.hash(info.password, 10);
        const property = await User.create(info);
        res.status(200).json({
          statuscode: 200,
          message: 'User Added Successfully!',
          data: property.id,
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

const editUser = async (req, res) => {
  try {
    let info = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      phone_number: req.body.phone_number,
      user_type: req.body.user_type,
      emailid: req.body.emailid,
    };
    let id = req.body.id;
    if (
      info.first_name === null ||
      info.first_name === undefined ||
      info.last_name === null ||
      info.last_name === undefined ||
      info.user_type === null ||
      info.emailid === undefined ||
      info.emailid === null ||
      info.user_type === undefined ||
      id === null ||
      id === undefined
    ) {
      res.status(200).json({
        statuscode: 400,
        message: 'Invalid request!',
      });
    } else {
      let user = await User.findOne({ where: { id: id } });
      if (user === null) {
        res.status(200).json({
          statuscode: 400,
          message: 'Invalid request!',
        });
      } else {
        let user1 = await User.findOne({ where: { emailid: info.emailid } });
        if (user1 === null) {
          await User.update(info, { where: { id: id } });
          res.status(200).json({
            statuscode: 200,
            message: 'User updated Successfully!',
            data: id,
          });
        } else {
          if (user.id !== user1.id) {
            res.status(200).json({
              statuscode: 400,
              message: 'Email Already Registered!',
            });
          } else {
            await User.update(info, { where: { id: id } });
            res.status(200).json({
              statuscode: 200,
              message: 'User updated Successfully!',
              data: id,
            });
          }
        }
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

const getAllUsers = async (req, res) => {
  try {
    let user = await User.findAll({
      attributes: [
        'id',
        'first_name',
        'last_name',
        'emailid',
        'user_type',
        'phone_number',
        'isActive',
      ],
      order: [['id', 'DESC']],
      where: { isSuper: false },
    });
    res.status(200).json({
      statuscode: 200,
      message: 'Users Listed Successfully.',
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

const getOneUser = async (req, res) => {
  let id = req.body.id;
  try {
    if (id === null || id === undefined) {
      res.status(200).json({
        statuscode: 400,
        message: 'Invalid request!',
      });
    } else {
      let user = await User.findOne({
        attributes: [
          'id',
          'first_name',
          'last_name',
          'emailid',
          'user_type',
          'isActive',
          'phone_number',
        ],
        where: { id: id },
      });
      if (user === null) {
        res.status(200).json({
          statuscode: 400,
          message: 'User not found.',
        });
      } else {
        res.status(200).json({
          statuscode: 200,
          message: 'User Listed Successfully.',
          data: user,
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

const updatePassword = async (req, res) => {
  try {
    let info = {
      password: req.body.password,
    };
    let id = req.body.id;
    let old_password = req.body.old_password;

    if (
      info.password === null ||
      info.password === undefined ||
      old_password === null ||
      old_password === undefined ||
      id === null ||
      id === undefined
    ) {
      res.status(200).json({
        statuscode: 400,
        message: 'Invalid request!',
      });
    } else {
      let user = await User.findOne({ where: { id: id } });
      if (user === null) {
        res.status(200).json({
          statuscode: 400,
          message: 'Invalid request!',
        });
      } else {
        const matchPass = await bcrypt.compare(old_password, user.password);
        if (matchPass) {
          info.password = await bcrypt.hash(info.password, 10);
          await User.update(info, { where: { id: id } });
          res.status(200).json({
            statuscode: 200,
            message: 'Password Updated Successfully!',
            data: id,
          });
        } else {
          res.status(200).json({
            statuscode: 400,
            message: 'Invalid old password!',
          });
        }
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

const emailPassword = async (req, res) => {
  try {
    let emailid = req.body.emailid;
    if (emailid === null || emailid === undefined) {
      res.status(200).json({
        statuscode: 400,
        message: 'Invalid request!',
      });
    } else {
      let user = await User.findOne({ where: { emailid: emailid } });
      if (user === null) {
        res.status(200).json({
          statuscode: 400,
          message: 'Invalid request!',
        });
      } else {
        var nodemailer = require('nodemailer');
        var pass = Math.floor(Math.random() * 1000000000);
        var transporter = nodemailer.createTransport({
          port: 465, // true for 465, false for other ports
          host: 'smtp.gmail.com',
          auth: {
            user: 'sayyedasif2016@gmail.com',
            pass: 'yrxtjsrymleuabtx',
          },
          secure: true,
        });
        var mailOptions = {
          from: 'sayyedasif444@gmail.com',
          to: emailid,
          subject: 'Password Update',
          text: 'Your new password is ' + pass,
        };
        await transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
            res.status(200).json({
              statuscode: 400,
              message: 'Something went wrong, Please try again later.',
            });
          }
        });
        var info = { password: pass };
        info.password = await bcrypt.hash(String(pass), 10);
        await User.update(info, { where: { id: user.id } });
        res.status(200).json({
          statuscode: 200,
          message: 'New Password is been sent to your email address',
          data: user.id,
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

const updatePasswordAdmin = async (req, res) => {
  try {
    let info = {
      password: req.body.password,
    };
    let id = req.body.id;
    let old_password = req.body.old_password;

    if (
      info.password === null ||
      info.password === undefined ||
      id === null ||
      id === undefined
    ) {
      res.status(200).json({
        statuscode: 400,
        message: 'Invalid request!',
      });
    } else {
      let user = await User.findOne({ where: { id: id } });
      if (user === null) {
        res.status(200).json({
          statuscode: 400,
          message: 'Invalid request!',
        });
      } else {
        info.password = await bcrypt.hash(info.password, 10);
        await User.update(info, { where: { id: id } });
        res.status(200).json({
          statuscode: 200,
          message: 'Password Updated Successfully!',
          data: id,
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

const deleteUser = async (req, res) => {
  let id = req.body.id;
  let isActive = req.body.isActive;
  try {
    if (id === null || id === undefined) {
      res.status(200).json({
        statuscode: 400,
        message: 'Invalid request!',
      });
    } else {
      let user = await User.findOne({ where: { id: id } });
      if (user !== null) {
        await User.update({ isActive: isActive }, { where: { id: id } });
        res.status(200).json({
          statuscode: 200,
          message: !isActive
            ? 'User Deactivated Successfully.'
            : 'User Activated Successfully.',
          data: user.id,
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
  loginApi,
  addUser,
  editUser,
  getAllUsers,
  getOneUser,
  updatePassword,
  deleteUser,
  updatePasswordAdmin,
  emailPassword,
};
