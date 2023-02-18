const userModel = require('../models/user.model');

exports.list = (req, res) => {
    userModel.find({}, (err, users) => {
        if(err){
            res.send({status: 500, message: 'Unable to Find Users'});
          } else {
            const userCount = users.length;
            res.send({status: 200, userCount: userCount, data: users});
        }
    });
};

exports.view = (req, res) => {
    const userId = req.query.userId
    userModel.findById(userId, (err, user) => {
      if (err) return res.send({status: 500, message: 'API Error'});
      if (!user) return res.status(404).send('User Not found');
      res.send({status: 200, data: user});
    });
};

exports.create = (req, res) => {
    let firstName = req.body.firstName
    let lastName = req.body.lastName
    let emailAddress = req.body.emailAddress
    let phoneNumber = req.body.phoneNumber
    let dob = req.body.dob
    let role =  req.body.role

    // Validate request
    if (!firstName) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Tutorial
    let userObj = new userModel({
        firstName: firstName,
        lastName: lastName,
        emailAddress: emailAddress,
        phoneNumber: phoneNumber,
        dob: dob,
        role: role
    });

    // Save Tutorial in the database
    userObj.save((err, userObj) => {
        if(err){
            res.send({status: 500, message: 'Unable to Add User'});
        } else {
            res.send({status: 200, message: 'User Added Successfully', userData: userObj});
        }
    });
};

exports.update = (req, res) => {
    const userId = req.body.userId
    let firstName = req.body.firstName
    let lastName = req.body.lastName
    let emailAddress = req.body.emailAddress
    let phoneNumber = req.body.phoneNumber
    let dob = req.body.dob
    let role =  req.body.role
  
    let userObj = ({
      firstName: firstName,
      lastName: lastName,
      emailAddress: emailAddress,
      phoneNumber: phoneNumber,
      dob: dob,
      role: role
    });

    userModel.findByIdAndUpdate(userId, userObj, (err, user) => {
      if (err) return res.send({status: 500, message: 'Unable to Update User'});
      if (!user) return res.status(404).send('User not found');
      res.send({status: 200, data: userObj, message: 'User Updated Success'});
    });
};

exports.delete = (req, res) => {
    const userId = req.query.userId
    userModel.findByIdAndRemove(userId, (err) => {
      if (err) return res.send({status: 500, message: 'Unable to Delete User'});
      res.send({status: 200, message: 'User Delete Success'});
    });
};

//params check