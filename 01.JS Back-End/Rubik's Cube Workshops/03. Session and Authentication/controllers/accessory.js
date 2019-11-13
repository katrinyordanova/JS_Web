const models = require('../models');

function getCreate(request, response) {
  response.render('./accessory/createAccessory.hbs');
}

function postCreate(request, response, next) {
  const { name = null , imageUrl = null , description = null } = request.body;
  models.accessoryModel.create({ name, imageUrl, description} ).then(() => {
    response.redirect('/');
  }).catch(next);
}

function getAttach(request, response, next) {
  const { id: cubeId } = request.params;
  models.cubeModel.findById(cubeId).then(cube =>
    Promise.all([cube, models.accessoriesModel.find({ cubes: { $nin: cubeId } })]))
    .then(([cube, filterAccessories]) => {
    response.render('./accessory/attachAccessory.hbs', {
      cube,
      accessories: filterAccessories.length > 0 ? filterAccessories : null
    });
  }).catch(next);
}

function postAttach(request, response, next) {
  const { id } = request.params;
  const { accessory: accessoryId } = request.body;
  Promise.all([
    models.cubeModel.update({ _id: id }, {$push: { accessories: accessoryId } }),
    models.accessoryModel.update({ _id: accessoryId }, {$push: { cube: id } })
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

