# back-end [![Build Status](https://travis-ci.com/BW-Anywhere-Fitness-1/back-end.svg?branch=dev)](https://travis-ci.com/BW-Anywhere-Fitness-1/back-end)

### API URL

[https://api.any-fitness.com](https://api.any-fitness.com)

### API Endpoints

| Method | URL                 | Description                                                     |
| ------ | ------------------- | --------------------------------------------------------------- |
| POST   | /api/auth/auth-code | get authentication code to register as instructor               |
| POST   | /api/auth/signup    | register as instructor or client by specifying the user role ID |
| POST   | /api/auth/login/    | login as instructor or client by email and password             |
| DELETE | /api/auth/logout    | revoke json web token                                           |
