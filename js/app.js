/*jshint esversion: 6*/

//PersonName: Darth Vader ("I don't like sand. It's coarse and rough and irritating and it gets everywhere.") / Homeworld: Tatooine
function personNameOne() {
  let personObject = JSON.parse(this.responseText);
  document.getElementById("person4Name").innerHTML = personObject.name;

  function homeRequest() {
  let homeWorldObject = JSON.parse(this.responseText);
  document.getElementById("person4HomeWorld").innerHTML = homeWorldObject.name;
  }
  requestHelper(personObject.homeworld, homeRequest);
}

//PersonName: Han Solo ("I know") /Species: Human (I prefer Corellian)
function personNameTwo() {
  let personObject = JSON.parse(this.responseText);
  document.getElementById("person14Name").innerHTML = personObject.name;

  function speciesRequest() {
    let speciesObject = JSON.parse(this.responseText);
    document.getElementById("person14Species").innerHTML = speciesObject.name;
  }
  requestHelper(personObject.species, speciesRequest);
}

//filmPlanets: all planets in the films / filmList | filmTitle: the order is really weird
function filmsRequest() {

  let filmsArray = JSON.parse(this.responseText).results;

  for(let i = 0; i < filmsArray.length; i++){
    let planetsUl = document.createElement('ul');
    createList(filmsArray, i, planetsUl);
    for(let j = 0; j < filmsArray[i].planets.length; j++){
        createPlanets(planetsUl, filmsArray[i].planets[j]);
    }
  }
}

function createPlanets(planetList, list) {

    requestHelper(list, planetRequest);

    function planetRequest() {
      let planetObject = JSON.parse(this.responseText);
      let planetNameList = document.createElement('li');
      let planetNameHeader = document.createElement('h4');
      planetNameHeader.innerHTML = planetObject.name;
      planetNameList.appendChild(planetNameHeader);
      planetList.appendChild(planetNameList);
    }
  }

function createList(array, index, list) {
  let filmlist = document.createElement('li');
  let filmheader = document.createElement('h2');
  let planetHeader = document.createElement('h3');
  planetHeader.innerHTML = "Planets";
  filmheader.innerHTML = array[index].title;
  filmlist.appendChild(filmheader);
  filmlist.appendChild(planetHeader);
  filmlist.appendChild(list);
  document.getElementById('filmList').appendChild(filmlist);

}

function requestHelper(link, listener) {
  let newReq = new XMLHttpRequest();
  newReq.addEventListener("load", listener);
  newReq.open("GET", link);
  newReq.send();

}

requestHelper("http://swapi.co/api/people/4/", personNameOne);
requestHelper("http://swapi.co/api/people/14/", personNameTwo);
requestHelper("http://swapi.co/api/films/", filmsRequest);