
## Interactive Whiteboard - Socket.IO - Docker - NodeJS - EJS - 

An Interactive whiteboard using socketIO with drawing tools which enables multiple users to draw at the same time. Creator of a class can disable/enable all other users from writing on the board.

## Pre requisit
Your Laptop Computer must have installed NodeJS, docker and docker-compose. Before running this your system must be connected to a good internet.

## How to use

This is built using Nodejs Server and EJS as front end framework. To run this run the following commands:

```
$ npm install
```

```
$ docker-compose up
```

And open `http://localhost:3000` in browser. Optionally, specify a port by supplying the `PORT` env variable.



## Features

- User can create a class or can join existing class whiteboard
- Draw on the whiteboard and all other users will see you drawings live.
- Ability for each user to use their seperate drawing tool.
- Choose Colours, fonts, fontsizes and thinkness.
- Text can also be written on the board
- Creator can enable/disable other users from drawing on the board.
- logout functionality is implemented so user can change class or ceate own class for using whiteboard

## Architecture
This Application is build using docker. Two docker images are used to run this, node and mongo db. Application is running in NodeJS environment and using mongoDB for sessions and classroom data. Both docker container communicate with each other and the host computer as well.
HTML5 Canvas is used for drawing and jquery is also integrated for managing click and other events


