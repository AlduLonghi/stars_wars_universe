
<h1 align="center">
  <br>
  Star Wars universe
  <br>
</h1>


<div align="center"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Star_Wars_Logo.svg/500px-Star_Wars_Logo.svg.png"></div>

<h4 align="center">An app simulating the Star Wars universe built with <a href="http://nestjs.com/" target="blank">NestJS</a></h4>

<p align="center">
    <img src="https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white"
         alt="Gitter">
</p>

<p align="center">
  <a href="#building-premise">Building premise</a> •
   <a href="#features">Features</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#api-endpoints">Api endpoints</a> •
  <a href="#credits">Credits</a> •
</p>

## Building premise

Backend system that simulates the vast and intriguing Star Wars universe. The crux of this challenge revolves around understanding and utilizing object-oriented programming, design patterns, and ensuring your code exudes clarity and elegance.

## Features

- Standard CRUD operations for Planet, Character, and Starship. :white_check_mark:

- Functionality to relocate a character from one planet to another. :white_check_mark:

- Boarding or disembarking a character from a starship. :white_check_mark:

- Traveling capability for a starship from its current location to a destination planet. :white_check_mark:

- Calculate the distance of a starship from a specified planet using a GPS-like algorithm. :white_check_mark:

- Recognize nearby enemy starships within a set range. :white_check_mark:

## How to use

### Prequisites

#### Installed locally:

- [Node.js](https://nodejs.org/en) version >= 16.

- [Docker](https://www.docker.com/).

- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable).

- [Nestjs cli]([Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable))

### Setting up

1. [Clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) this repository.

2. Go to the app's folder in your terminal.

3. Run 

```
$ yarn install
```

4. Run command for starting up the database in Docker.

```
$ docker compose up -d
```

### Running

1. Run 

```
$ yarn run start
```

2. Use [localhost:3000/star-wars](localhost:3000/star-wars) to accesing the features.

## API Endpoints

- Once you have the app up and running, go to [localhost:3000/swagger](localhost:3000/swagger) and check the different endpoints and schemas available.

