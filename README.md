# Car REST API

## Endpoints

### GET /cars
### GET /cars/:id
### GET /cars/make/:make
### GET /cars/filter/greater/:year
### GET /cars/filter/less/:year
### GET /cars/filter/between/:year1/:year2
### POST /cars
### PUT /cars/:id
### DELETE /cars/:id

## Car Schema

```json
{
  "make": "string",
  "model": "string",
  "year": "number",
  "description": "string",
  "image": "string",
}
```

# 🛠 Built with:
* [Node.js](https://github.com/nodejs/node)
* [Express.js](https://github.com/expressjs/express)
* [MongoDB](https://github.com/mongodb/mongo)
* [Mongoose](https://github.com/Automattic/mongoose)
