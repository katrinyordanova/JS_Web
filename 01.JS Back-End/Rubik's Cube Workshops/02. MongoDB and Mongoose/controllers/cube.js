const cubeModel = require('../models/cube');

function index(request, response, next) {
  const { from, to, search } = request.query;
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
  cubeModel.find(query).then(cubes => {
    response.render('index.hbs', { cubes, search, from, to });
  }).catch(next);
}

function about(request, response) {
  response.render('aboutSite.hbs');
}

function getCreate(request,response) {
  response.render('createCube.hbs');
}

function postCreate(request, response) {
  const {name = null, description = null, imageUrl = null, difficultyLevel = null} = request.body;
  cubeModel.create({name, description, imageUrl, difficultyLevel}).then(cube => {
    response.redirect('/');
  });
}

function details(request,response,next) {
  const cubeId = request.params.id;
  cubeModel.findById(cubeId).populate('accessories').then(cube => {
    if (!cube) { response.render('404.hbs'); return; }
    response.render('detailsCube.hbs', { cube });
  });
}

function notFound(request,response) {
  response.render('404.hbs');
}
 
module.exports = {
  index,
  about,
  getCreate,
  postCreate,
  details,
  notFound
}