# back-end [![Build Status](https://travis-ci.com/BW-Anywhere-Fitness-1/back-end.svg?branch=dev)](https://travis-ci.com/BW-Anywhere-Fitness-1/back-end)

### API URL

[https://api.any-fitness.com](https://api.any-fitness.com)

### API Endpoints

| Method | URL                    | Description                                                                                                                             |
| ------ | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| POST   | /api/v1/auth/auth-code | Generate a one-time authentication code for instructor and send the generated code to the provided email address in the `request body`. |
| POST   | /api/v1/auth/signup    | Create a user as instructor or client using information sent inside the `request body`. Return the new created user.                    |
| POST   | /api/v1/auth/login/    | Authenticate user by `email` and `password`. Return `access_token` and `displayName`                                                    |
| DELETE | /api/v1/auth/logout    | Revoke the JSON WEB token sent in the `request header`.                                                                                 |

##### User Instructor and Client Schema

```json
{
  role_id: 3, // integer references id in user_roles table | required
  first_name: "Dan", // string, minLent=2 | required
  last_name: "Joe", // string, minLent=2 | required
  email: "dan.joe@fakeGmail.com", // string, minLent=2 | required
  // Password must have
  // at least one uppercase character,
  // at least one lower case character,
  // at least one digit
  // and at least one of the following special characters [! @ # $ % ^ & *]
  // required
  password: "@dmin859N",
  gender: "male", // must be male or female or non-binary | required for instructor not for client
  phone: "(888)873-0768", // must be a string formatted as follow: (000)000-0000 | required for instructor not for client
  authCode: 123456 // one-time authentication code received by email only for instructor users.
};
```

##### Send Authentication code to the Instructor

To send the one-time authentication to an instructor, you must send a `post request` to `/api/v1/auth/auth-code` with the instructor `email` address in the `request body`. The person will receive a One-Time Authentication from `noreply@any-fitness.com` that he/she will use when register. He/she must register with the same email where the authentication code was sent.
