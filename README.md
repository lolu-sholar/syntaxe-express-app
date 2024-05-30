# syntaxe-express-app

A Syntaxe-enabled Express.js application that returns queryable user, country and country states data.

### Entry Point

```js
const express = require('express')
const SyntaxeIO = require('syntaxe-express')
const router = require('./app/router')

const app = express()

// Add syntaxe middleware
SyntaxeIO.init({
    enabled: true,
    app
})

// Attach router to app
router.sync(app)

const port = 3000
app.listen(port, () => console.log(`Syntaxe enabled express app listening on ${port}`))

module.exports = app
```

### Demo

[Check out the demo on Vercel](https://syntaxe-express.vercel.app/)

### Endpoints

The following endpoints are available in the application on Vercel and can be queried using the conventions described in the [Syntaxe Documentation](https://github.com/SyntaxeQL/syntaxe).

- [App Users](https://syntaxe-express.vercel.app/api/app-users)

- [GitHub Users](https://syntaxe-express.vercel.app/api/github-users)

- [Countries](https://syntaxe-express.vercel.app/api/countries)

- [Countries & States](https://syntaxe-express.vercel.app/api/countries-states)

- [Countries, States & Cities](https://syntaxe-express.vercel.app/api/countries-states-cities)

### Examples

You can easily copy any of the code samples below into a JavaScript file e.g. `sample-app-test.js`, and run it using `node sample-app-test.js` from your command line.

##### Example 1

```js
/* NOTE: Always convert the schema to base64 string as header value for 'Syntaxe-Resolve-Schema' before making the request */

/*
- Return id and fullName for each object in the array
- Rename fullName as name
- package must not match 'free'
- omit package
- Return the first 5 entries of the resulting array
*/

const schema = `{
    id
    fullName [as:"name"]
    package? [ne:"free"]
} [first:5]`

fetch('https://syntaxe-express.vercel.app/api/app-users', {
    method: 'GET',
    headers: {
        'Syntaxe-Resolve-Schema':
        btoa(schema)
    }
})
.then(response => response.json())
.then(console.log)

/*
Response Headers:
Syntaxe-Enabled: true
Syntaxe-Schema-Resolved: true

Response Data:
[
  { id: 3, name: 'Person 3' },
  { id: 4, name: 'Person 4' },
  { id: 6, name: 'Person 6' },
  { id: 8, name: 'Person 8' },
  { id: 10, name: 'Person 10' }
]
*/
```

##### Example 2

```js
/* NOTE: Always convert the schema to base64 string as header value for 'Syntaxe-Resolve-Schema' before making the request */

/*
- Return id, login, avatar_url and type for each object in the array
- Rename login as username
- Rename avatar_url as photoUrl
- type must not match 'user' (case-insensitive) 
*/

const schema = `{
    id
    login [as:"username"]
    avatar_url [as:"photoUrl"]
    type [nei:"user"]
}`

fetch('https://syntaxe-express.vercel.app/api/github-users', {
    method: 'GET',
    headers: {
        'Syntaxe-Resolve-Schema':
        btoa(schema)
    }
})
.then(response => response.json())
.then(console.log)

/*
Response Headers:
Syntaxe-Enabled: true
Syntaxe-Schema-Resolved: true

Response Data:
[
  {
    id: 44,
    username: 'errfree',
    photoUrl: 'https://avatars.githubusercontent.com/u/44?v=4',
    type: 'Organization'
  }
]
*/
```

##### Example 3

```js
/* NOTE: Always convert the schema to base64 string as header value for 'Syntaxe-Resolve-Schema' before making the request */

/*
- Return id, name, phone_code, capital, currency and region for each object in the array
- name must match any name that begins with 'a' or 'n' (case-insensitive)
- Rename phone_code as code
- region must match at least one entry of the provided array (case-insensitive)
- Rename region as continent
*/

const schema = `{
    id
    name [regex:/^(a|n)/i]
    phone_code [as:"code"]
    capital
    currency
    region [ini:["asia", "africa"]] [as:"continent"]
}`

fetch('https://syntaxe-express.vercel.app/api/countries', {
    method: 'GET',
    headers: {
        'Syntaxe-Resolve-Schema':
        btoa(schema)
    }
})
.then(response => response.json())
.then(console.log)

/*
Response Headers:
Syntaxe-Enabled: true
Syntaxe-Schema-Resolved: true

Response Data:
[
  {
    id: 1,
    name: 'Afghanistan',
    code: '93',
    capital: 'Kabul',
    currency: 'AFN',
    continent: 'Asia'
  },
  {
    id: 4,
    name: 'Algeria',
    code: '213',
    capital: 'Algiers',
    currency: 'DZD',
    continent: 'Africa'
  },
  {
    id: 7,
    name: 'Angola',
    code: '244',
    capital: 'Luanda',
    currency: 'AOA',
    continent: 'Africa'
  },
  {
    id: 12,
    name: 'Armenia',
    code: '374',
    capital: 'Yerevan',
    currency: 'AMD',
    continent: 'Asia'
  },
  {
    id: 16,
    name: 'Azerbaijan',
    code: '994',
    capital: 'Baku',
    currency: 'AZN',
    continent: 'Asia'
  },
  {
    id: 152,
    name: 'Namibia',
    code: '264',
    capital: 'Windhoek',
    currency: 'NAD',
    continent: 'Africa'
  },
  {
    id: 154,
    name: 'Nepal',
    code: '977',
    capital: 'Kathmandu',
    currency: 'NPR',
    continent: 'Asia'
  },
  {
    id: 160,
    name: 'Niger',
    code: '227',
    capital: 'Niamey',
    currency: 'XOF',
    continent: 'Africa'
  },
  {
    id: 161,
    name: 'Nigeria',
    code: '234',
    capital: 'Abuja',
    currency: 'NGN',
    continent: 'Africa'
  },
  {
    id: 115,
    name: 'North Korea',
    code: '850',
    capital: 'Pyongyang',
    currency: 'KPW',
    continent: 'Asia'
  }
]
*/
```

##### Example 4

```js
/* NOTE: Always convert the schema to base64 string as header value for 'Syntaxe-Resolve-Schema' before making the request */

/*
- Return name and states for each object in the array
- region must match 'europe' (case-insensitive)
- omit region
- For states
    - Return id and name
    - Return the first 2 entries of the array
    - states is only valid if it has a size greater than 0 (which determines if its surrounding object is returned or not unless you apply [cond:"or"])
- Return the first 5 entries of the resulting array
*/

const schema = `{
    name
    region? [eqi:"europe"]
    states {
        id
        name
    } [first:2] [sgt:0]
} [first:5]`

fetch('https://syntaxe-express.vercel.app/api/countries-states', {
    method: 'GET',
    headers: {
        'Syntaxe-Resolve-Schema':
        btoa(schema)
    }
})
.then(response => response.json())
.then(console.log)

/*
Response Headers:
Syntaxe-Enabled: true
Syntaxe-Schema-Resolved: true

Response Data:
[
  {
    "name": "Albania",
    "states": [
      {"id": 603, "name": "Berat County"},
      {"id": 629, "name": "Berat District"}
    ]
  },
  {
    "name": "Andorra",
    "states": [
      {"id": 488, "name": "Andorra la Vella"},
      {"id": 489, "name": "Canillo"}
    ]
  },
  {
    "name": "Austria",
    "states": [
      {"id": 2062, "name": "Burgenland"},
      {"id": 2057, "name": "Carinthia" }
    ]
  },
  {
    "name": "Belarus",
    "states": [
      {"id": 2959, "name": "Brest Region"},
      {"id": 2955, "name": "Gomel Region"}
    ]
  },
  {
    "name": "Belgium",
    "states": [
      {"id": 1381, "name": "Antwerp"},
      {"id": 1376, "name": "Brussels-Capital Region"}
    ]
  }
]
*/
```

##### Example 5

```js
/* NOTE: Always convert the schema to base64 string as header value for 'Syntaxe-Resolve-Schema' before making the request */

/*
- Return id, status and lastLogin for each object in the array
- package must not match 'free'
- omit package
- status must match 'inactive'
- For lastLogin
    - Day of week must match 'Monday'
    - Month must be in provided range
    - Year must match 2024
    - [cond:"or"] means at least one of the operations for lastLogin must evaluate to true 
*/

const schema = `{
    id
    package? [ne:"free"]
    status [eq:"inactive"]
    lastLogin [dweq:"Monday"] [meq:"June"] [yeq:2024] [cond:"or"]
}`

fetch('https://syntaxe-express.vercel.app/api/app-users', {
    method: 'GET',
    headers: {
        'Syntaxe-Resolve-Schema':
        btoa(schema)
    }
})
.then(response => response.json())
.then(console.log)

/*
Response Headers:
Syntaxe-Enabled: true
Syntaxe-Schema-Resolved: true

Response Data:
[
  { id: 36, status: 'inactive', lastLogin: '2022-02-14T06:18:52.965Z' },
  { id: 73, status: 'inactive', lastLogin: '2022-05-09T06:26:50.498Z' },
  { id: 85, status: 'inactive', lastLogin: '2023-09-25T17:05:28.857Z' },
  { id: 90, status: 'inactive', lastLogin: '2022-04-25T20:33:01.655Z' },
  { id: 99, status: 'inactive', lastLogin: '2022-01-31T06:02:58.543Z' }
]
*/
```