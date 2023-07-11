<a name="readme-top"></a>

<div align="center">

<h3 align="center">Daily Task Record Backend</h3>

  <p align="center">
    This is a simple backend for daily task record. It is built with Node.js, Express.js, and MongoDB also uses Redis for caching.
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

This project is a part of 2 seperated projects. The frontend is built with React.js and the backend is built with Node.js, Express.js, and MongoDB. The frontend is a simple task record application that allows users to add, edit tasks. The backend is a simple REST API that allows users to perform CRUD operations on tasks. The backend also uses Redis for caching.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [Mongo DB](https://www.mongodb.com/)
- [Redis](https://redis.io/)
- [Mongoose](https://mongoosejs.com/)
- [Zod]()

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

To start this project, you need to install Node.js and npm on your system.

### Installation

1. Clone the repo

```sh
git clone
```

2. Install NPM packages

```sh
npm install
```

3. Create a .env file and add the following environment variables and use `.env.example` as a reference.

4. Run `docker-compose up -d` to start the MongoDB and Redis server. It will be created with the default configuration, MongoDB also uses `.env` file for configuration.

5. Run `npm run start` to start the server. The server will announce the port it is running on. It will be `3001` by default, you can change it from the config folder. The server will also announce the MongoDB and Redis connection status.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
