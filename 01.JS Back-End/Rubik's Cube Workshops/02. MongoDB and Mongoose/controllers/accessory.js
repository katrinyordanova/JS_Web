const accessoryModel = require('../models/accessories');
const cubeModel = require('../models/cube');

function getCreate(request, response) {
  response.render('createAccessory.hbs');
}

function postCreate(request, response, next) {
    const { name = null , imageUrl = null , description = null } = request.body;
    accessoryModel.create({ name, imageUrl, description} ).then(createdAccessory => {
      response.redirect('/');
    }).catch(next);
}

function getAttach(request, response, next) {
    const { id: cubeId } = request.params;
  cubeModel.findById(cubeId).then(
    cube => Promise.all([cube, accessoryModel.find({ cubes: { $nin: cubeId } })])
  ).then(([cube, filterAccessories]) => {
    response.render('attachAccessory.hbs', {
      cube,
      accessories: filterAccessories.length > 0 ? filterAccessories : null
    });
  }).catch(next);
}

function postAttach(request, response, next) {
    const { id } = request.params;
    const { accessory: accessoryId } = request.body;
    Promise.all([
      cubeModel.update({ _id: id }, {$push: { accessories: accessoryId } }),
      accessoryModel.update({ _id: accessoryId }, {$push: { cube: id } })
    ]).then(() => {
      response.redirect('/');
    }).catch(next);
}

module.exports = {
  getCreate,
  postCreate,
  getAttach,
  postAttach
}

