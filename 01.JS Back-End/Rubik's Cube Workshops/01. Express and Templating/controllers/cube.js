const cubeModel = require('../modules/cube');

function index(request, response, next) {
    const { from, to, search } = request.query;
    const findFunction = item => {
    let result = true;
    if (search) {
      result = item.name.toLowerCase().includes(search);
    }
    if (result && from) {
      result = +item.difficultyLevel >= +from;
    }
    if (result && to) {
      result = +item.difficultyLevel <= +to;
    }
    return result;
  }
  cubeModel.find(findFunction).then(cubes => {
    response.render('index.hbs', { cubes, search, from, to });
  }).catch(next);
}

function about(request, response) {
  response.render('about.hbs');
}

function getCreate(request,response) {
  response.render('create.hbs');
}

function postCreate(request, response) {
  const {name = null, description = null, imageUrl = null, difficultyLevel = null} = request.body;
  const newCube = cubeModel.create(name, description, imageUrl, difficultyLevel);
  cubeModel.insert(newCube).then(cube => {
    response.redirect('/');
  });
}

function details(request,response,next) {
  const cubeId = +request.params.id;
  cubeModel.getOne(cubeId).then(cube => {
    if (!cube) { response.render('404.hbs'); return; }
    response.render('details.hbs', { cube });
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