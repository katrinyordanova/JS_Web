const models = require('../models');

function index(request, response, next) {
  const { from, to, search } = request.query;
  const user = request;
  let query = {};

  if (search) {
    query = {...query, name: { $regex: search } };
  }
  if (to) {
    query = {...query, difficultyLevel: {$lte: +to }};
  }
  if (from) {
    query = {
      ...query, difficultyLevel: {...query.difficultyLevel, $gte: +from }
    };
  }
  models.cubeModel.find(query).then(cubes => {
    response.render('./site/index.hbs', { cubes, search, from, to, user });
  }).catch(next);
}

function about(request, response) {
  response.render('./site/aboutSite.hbs');
}

function getCreate(request,response) {
  response.render('./cube/createCube.hbs');
}

function postCreate(request, response) {
  const {name = null, description = null, imageUrl = null, difficultyLevel = null} = request.body;
  models.cubeModel.create({name, description, imageUrl, difficultyLevel}).then(cube => {
    response.redirect('/');
  });
}

function getEdit(request, response,next) {
  const id = request.params.id;
  const user = request;
  models.cubeModel.findOne({ _id: id, creatorId: user._id })
  .then(cube => {
    const options = [
      { title: '1 - Very Easy', selected: 1 === cube.difficultyLevel },
      { title: '2 - Easy', selected: 2 === cube.difficultyLevel },
      { title: '3 - Medium (Standard 3x3)', selected: 3 === cube.difficultyLevel },
      { title: '4 - Intermediate', selected: 4 === cube.difficultyLevel },
      { title: '5 - Expert', selected: 5 === cube.difficultyLevel },
      { title: '6 - Hardcore', selected: 6 === cube.difficultyLevel }
    ];
    response.render('./cube/editCube.hbs', { cube, options });
  }).catch(next);
}

function postEdit(request, response, next) {
  const id = request.params.id;
  const { name = null, description = null, imageUrl = null, difficultyLevel = null } = request.body;
  models.cubeModel.updateOne({ _id: id}, { name, description, imageUrl, difficultyLevel })
  .then(() => {
    response.redirect('/');
  }).catch(next);
}

function getDelete(request, response, next) {
  const id = request.params.id;
  const user = request;
  models.cubeModel.findOne({ _id: id, creatorId: user._id })
  .then(cube => {
    const options = [
      { title: '1 - Very Easy', selected: 1 === cube.difficultyLevel },
      { title: '2 - Easy', selected: 2 === cube.difficultyLevel },
      { title: '3 - Medium (Standard 3x3)', selected: 3 === cube.difficultyLevel },
      { title: '4 - Intermediate', selected: 4 === cube.difficultyLevel },
      { title: '5 - Expert', selected: 5 === cube.difficultyLevel },
      { title: '6 - Hardcore', selected: 6 === cube.difficultyLevel }
    ];
    response.render('./cube/deleteCube.hbs', { cube, options });
  }).catch(next);
}

function postDelete(request, response, next) {
  const id = request.params.id;
  const user = request;
  models.cubeModel.deleteOne({ _id: id, creatorId: user._id })
  .then(() => {
    response.redirect('/');
  });
}

function details(request,response) {
  const cubeId = request.params.id;
  const user = request;
  models.cubeModel.findById(cubeId).populate('accessories').then(cube => {
    if (!cube) { response.render('./error/404.hbs'); return; }
    response.render('./cube/detailsCube.hbs', { cube, user });
  });
}

function notFound(request,response) {
  response.render('./error/404.hbs');
}
 
module.exports = {
  index,
  about,
  getCreate,
  postCreate,
  getEdit,
  postEdit,
  getDelete,
  postDelete,
  details,
  notFound
}