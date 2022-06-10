
## Description
Netguru take-home coding challenge

## Running the app

- Clone and run this repo [https://github.com/netguru/nodejs-recruitment-task](https://github.com/netguru/nodejs-recruitment-task)
- Retrieve the jwt token
- Run this application with the same jwt secret used previously
```bash
$ npm install
$ JWT_SECRET=foo docker-compose up netguru-api
```

## Test the app
```bash
$ docker-compose up netguru-test-db 
$ npm run test
```

## Api Documentation
[https://documenter.getpostman.com/view/18326339/Uz5MFtnb](https://documenter.getpostman.com/view/18326339/Uz5MFtnb)
## FYI
- I used NestJs framework and MikroORM
- I tried to follow the DDD approach
- I used Jest to tests the api (I tested only one api for this challenge)