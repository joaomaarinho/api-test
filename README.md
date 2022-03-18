## Movies API documentation

## Users Requests

```http
POST /register
```

| Parameter    | Type     | Description                                                          | from |
| :----------- | :------- | :------------------------------------------------------------------- | :--- |
| `first_name` | `string` | **Required**. User first name                                        | body |
| `last_name`  | `string` | **Required**. User last name                                         | body |
| `email`      | `string` | **Required**. User email                                             | body |
| `password`   | `string` | **Required**. User password                                          | body |
| `admin`      | `string` | **default: false**. Specified when creating an administrator account | body |

Responses

- _400_ - `"All inputs are required"`
- _409_ - `"User already exists"`
- _201_ - User information generated in object format :

```javascript
{
    "first_name": first name provided by user,
    "last_name": last name provided by user,
    "email": email provided by user,
    "password": hashed password provided by user,
    "admin": false by default,
    "_id": id generated in mongoDB,
    "__v": 0,
    "token": jwt access token generated and stored in bearer header
}
```

```http
POST /login
```

| Parameter  | Type     | Description                 | from |
| :--------- | :------- | :-------------------------- | :--- |
| `email`    | `string` | **Required**. User email    | body |
| `password` | `string` | **Required**. User password | body |

Responses

- _400_ - `"Invalid email or password"`
- _401_ - `"Invalid token"`
- _200_ - User information stored in database :

```javascript
{
   "_id": user mongoDB id,
   "first_name": first name,
   "last_name": last name,
   "email": user email,
   "password": user hashed password,
   "admin": false by default,
   "__v": 0,
   "token": access token
}
```

```http
GET /:id
```

| Parameter | Type     | Description                     | from          |
| :-------- | :------- | :------------------------------ | :------------ |
| `id`      | `string` | **Required**. User id           | req.params    |
| `token`   | `string` | **Required**. User access token | bearer Header |

Responses

- _400_ - `"Cannot find user"`
- _401_ - `"Invalid token"`
- _200_ - User information stored in database :

```javascript
{
   "_id": mongoDB id,
   "first_name": user first name,
   "last_name": user last name,
   "email": email,
   "password": hashed password,
   "admin": false by default,
   "__v": 0
}
```

```http
DELETE /:id
```

| Parameter | Type     | Description                     | from          |
| :-------- | :------- | :------------------------------ | :------------ |
| `id`      | `string` | **Required**. User id           | req.params    |
| `token`   | `string` | **Required**. User access token | bearer Header |

Responses

- _400_ - `"generic error"`
- _401_ - `"Invalid token"`
- _200_ - `"User successfully deleted"`

```http
PUT /:id
```

send the parameter that the user intent to change

| Parameter    | Type     | Description                                                   | from          |
| :----------- | :------- | :------------------------------------------------------------ | :------------ |
| `first_name` | `string` | **Optional** User first name                                  | body          |
| `last_name`  | `string` | **Optional** User last name                                   | body          |
| `email`      | `string` | **Optional** User email                                       | body          |
| `password`   | `string` | **Optional** User password                                    | body          |
| `admin`      | `string` | **Optional** Specified when creating an administrator account | body          |
| `token`      | `string` | **Optional** User access token                                | bearer Header |

Responses

- _400_ - `"generic error"`
- _401_ - `"Invalid token"`, `"You are not allowed to do this"`
- _200_ - It will return an object with the information of the user already updated :

```javascript
{
   "first_name": first name provided by user,
   "last_name": last name provided by user,
   "email": email provided by user,
   "password": hashed password provided by user,
   "admin": false by default,
   "_id": id generated in mongoDB,
   "__v": 0,
}
```

```http
GET /logout
```

Responses

- **400** - `"generic error"`
- **200** - `"Successfully loged out user"`, set the access token to empty string in header

```http
GET /all-users
```

Responses

- **400** - `"generic error"`
- **401** - `"Invalid token"`, `"You are not allowed to see this request"`
- **200** - It will return all users stored in database in object format

## Movies Requests

```http
POST /register-movie
```

| Parameter      | Type     | Description                  | from          |
| :------------- | :------- | :--------------------------- | :------------ |
| `movieName`    | `string` | **Optional** User first name | body          |
| `releasedYear` | `string` | **Optional** User last name  | body          |
| `description`  | `string` | **Optional** User email      | body          |
| `movieGenre`   | `string` | **Optional** User password   | body          |
| access token   | `string` | **Reequired** User password  | bearer header |

Responses

- **400** - `"generic error"`
- **401** - `"Invalid token"`, `"You are not allowed to see this request"`
- **200** - Created movie :

```javascript
{
    "name": Movie name provided by the user,
    "released_year": Movie released year provided by the user,
    "synopsis": Movie description provided by the user,
    "genre": Movie genre provided by the user,
    "_id": Movie id generated in MongoDB,
    "__v": 0,
    "uploadedBy": user id
}
```

```http
GET /catalog/:id
```

| Parameter | Type     | Description                   | from          |
| :-------- | :------- | :---------------------------- | :------------ |
| `id`      | `string` | **Required** Movie id         | req.params    |
| `token`   | `string` | **Required** User access name | bearer Header |

Responses

- **400** - `"Cannot find movie"`
- **401** - `"Invalid token"`, `"You are not allowed to see this request"`
- **200** - Movie content :

```javascript
{
    "_id": Movie id,
    "name": Movie name,
    "released_year": Movie release year,
    "synopsis": Movie description,
    "genre": Movie genre,
    "__v": 0,
    "uploadedBy": id from User that uploaded the Movie
}
```

```http
GET /catalogo
```

| Parameter | Type     | Description                   | from          |
| :-------- | :------- | :---------------------------- | :------------ |
| `token`   | `string` | **Required** User access name | bearer Header |

Responses

- Unable to finish this request
