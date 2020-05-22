# back-end [![Build Status](https://travis-ci.com/BW-Anywhere-Fitness-1/back-end.svg?branch=dev)](https://travis-ci.com/BW-Anywhere-Fitness-1/back-end)

### API URL

[https://any-fitness.herokuapp.com/](https://any-fitness.herokuapp.com/)

### API Endpoints

| Method | URL                           | Description                                                                                                                                           |
| ------ | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| POST   | /api/v1/auth/auth-code        | Generate a one-time authentication code for instructor and send the generated code to the provided email address in the `request body`.               |
| GET    | /api/v1/auth/auth-code?email= | Get generate One-Time code if not received by email `(to be change)`                                                                                  |
| POST   | /api/v1/auth/signup           | Create a user as instructor or client using information sent inside the `request body`. Return the new created user.                                  |
| POST   | /api/v1/auth/login/           | Authenticate user by `email` and `password`. Return `access_token` and `displayName`                                                                  |
| DELETE | /api/v1/auth/logout           | Revoke the JSON WEB token sent in the `request header`.                                                                                               |
| POST   | /api/v1/classes               | Create class using the information sent in the `request body` and return the created class. **Only accessible for `Instructor` user**.                |
| PUT    | /api/v1/classes/:id           | Update class where the `id` match with the `id` passing in `request` and return the updated class. **Only accessible for `Instructor` user**.         |
| DELETE | /api/v1/classes/:id           | Delete class where the `id` match with the `id` passing in `request` and return the `id` of deleted class. **Only accessible for `Instructor` user**. |
| GET    | /api/v1/classes               | return list of classes. User must be authenticated.                                                                                                   |
| GET    | /api/v1/classes:id            | return class where the `id` match with the `id` passing in `request`. User must be authenticated.                                                     |
| GET    | /api/v1/search/classes?q=     | return list of classes matched with the `query`. User must be authenticated.                                                                          |

#### User Instructor and Client Schema

```javascript
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

#### Send Authentication code to the Instructor

To send the one-time authentication to an instructor, you must send a `post request` to `/api/v1/auth/auth-code` with the instructor `email` address in the `request body`. The person will receive a One-Time Authentication from `noreply@any-fitness.com` that he/she will use when register. He/she must register with the same email where the authentication code was sent.

**Note:** it may take up to 24 hours to receive the invitation due to SMTP provider restriction (200/day). For development use the url `/api/v1/auth/auth-code?email=` to get the authentication code.

#### Class schema

```javascript
{
  name: "Boxing", // string  | required
  type: 2, // integer, should corresponding with the class type id | required
  start_time: "15:00:00", // time | format 00:00:00 | required
  duration: "00:45:00", // time | format 00:00:00 | required
  level: 1, // integer, should corresponding with the class level id | required
  location: "600 Deer Field Trace, Mebane, NC 27302", // string | required
  attendees: 5, // integer | required
  max_size: 1, // integer | required
  schedule: ["Monday", "Wednesday", "Thursday"], // array of string | format: day with first character in capital
  description: "Martial art for beginner", // string
}
```

#### Search endpoint

`/api/v1/search/classes?q=`

You do not need to specified the column where to search. The search is made on the following columns:

- `name`
- `start_time`
- `duration`
- `schedule`
- `type`
- `level`
- `max_size`

and return array with the result.
