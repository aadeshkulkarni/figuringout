[![Stargazers][stars-shield]][stars-url]
[![Contributors][contributors-shield]][contributors-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
<!-- [![Forks][forks-shield]][forks-url] -->

## Figuringout.life

Welcome to **Figuringout.life** – an open-source full-stack application built with Next.js, where users can share their thoughts in one-liners on a variety of topics. This platform encourages engagement through likes, comments, shares, and reposts, creating a vibrant community of thinkers.

### Features

- Text-Only Posts: Users can create simple text posts to express their thoughts. (No multimedia support at this time.)
- Engagement: Interact with posts through likes, comments, and shares to foster discussions.
- Explore Ideas: Discover a range of topics and insights from users around the world.

### Technologies

[![Next][Next.js]][Next-url]
[![Typescript][Typescript.js]][typescript-url]
[![MongoDB][MongoDB]][Mongodb-url]

### Getting Started

#### Prerequisites

- Node.js
- npm or yarn
- MongoDB
- Google OAuth

#### Installation

1. Clone the repository:

```
git clone https://github.com/yourusername/figuringout.life.git
cd figuringout.life
```

2. Create Environment variables. 
```
cp .env.example .env
# Edit values as needed
```
2. Install dependencies:

```
npm install
```

3. Generate keys for PWA and store them in .env file

```
node generate-vapid-keys.js
```

4. Start the development server

```
npm run dev
```

4. Open your browser and visit https://localhost:3000.


### Database Setup (MongoDB):

There are 2 options to setup MongoDB. 
1. Using Cloud DB (using [Mongo Atlas](https://www.mongodb.com/)) 
2. Using Docker locally. (Recommended)

#### Using Docker:

> Ensure that Docker-Desktop app is installed on your system and is running. [Docker Desktop](https://www.docker.com/products/docker-desktop/)

To create a MongoDB Docker Container, run the following:
```
    docker run --name mongo -p 27017:27017 -v ./data/db:/data/db -d mongo mongod
```

Add connection string in .env file 
```
MONGODB_URI=mongodb://localhost:27017
```

### Contributing

We welcome contributions! If you'd like to contribute to Figuringout.life, please follow these steps:

1. Fork the repository.
2. Create your feature branch (git checkout -b feature/YourFeature).
3. Commit your changes (git commit -m 'Add some feature').
4. Push to the branch (git push origin feature/YourFeature).
5. Open a Pull Request.

Read our [contribution guidelines](./CONTRIBUTING.md) for more details.

## 🤝 Contributors

<a href="https://github.com/aadeshkulkarni/medium-app/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=aadeshkulkarni/medium-app" />
</a>

### License
This project is licensed under the MIT License. See the LICENSE file for details.

### Visit Us
Explore and share your thoughts at https://figuringout.life!

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/aadeshkulkarni/medium-app.svg?style=for-the-badge&color=blue
[contributors-url]: https://github.com/aadeshkulkarni/medium-app/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/aadeshkulkarni/medium-app.svg?style=for-the-badge&color=blue
[forks-url]: https://github.com/aadeshkulkarni/medium-app/network/members
[stars-shield]: https://img.shields.io/github/stars/aadeshkulkarni/medium-app.svg?style=for-the-badge&color=blue
[stars-url]: https://github.com/aadeshkulkarni/medium-app/stargazers
[issues-shield]: https://img.shields.io/github/issues/aadeshkulkarni/medium-app.svg?style=for-the-badge&color=blue
[issues-url]: https://github.com/aadeshkulkarni/medium-app/issues
[license-shield]: https://img.shields.io/github/license/aadeshkulkarni/medium-app.svg?style=for-the-badge&color=blue
[license-url]: https://github.com/aadeshkulkarni/medium-app/blob/master/LICENSE.txt

[Next.js]: https://img.shields.io/badge/Next-20232A?style=for-the-badge&logo=nextdotjs&logoColor=red
[next-url]: https://nextjs.org/
[Typescript.js]: https://shields.io/badge/TypeScript-20232A?logo=TypeScript&logoColor=blue&style=for-the-badge
[typescript-url]: https://www.typescriptlang.org/
[MongoDB]: https://img.shields.io/badge/mongodb-20232A?style=for-the-badge&logo=mongodb&logoColor=green
[Mongodb-url]: https://www.mongodb.com/
