# Anime Quote Microservice

An Node/Express microservice leveraging the Animechan API for serving anime quotes.

## Setup

### Installation
```bash
npm i
```

### Starting the microservice
```bash
npm start
```
By default, the server will run on port 3000 i.e. `http://localhost:3000`.

## Usage

### Endpoints

- GET `/anime` - Returns a random quote from the queried anime title 
- GET `/character` - Returns a random quote spoken by the queried anime character

### Queries

Queries are made as `GET` requests with a URL-encoded query string, `q` as the parameter, i.e. `?q=<string>`.

### Response

Successful responses will have an HTTP status code of 200 and will be in the form of a JSON object containing the following key-value pairs:
```bash
{
  "anime": <string>,
  "character": <string>,
  "quote": <string>
}
```

Failed requests will return an HTTP status code of 400 or 404 with a corresponding error message.

### Example Queries

#### Quote by Anime
```js
fetch('http://localhost:3000/anime?title=naruto')
      .then(response => response.json())
      .then(quotes => console.log(quotes))
```
will return 
```js
{
  "anime": "Naruto",
  "character":"Neji Hyuuga",
  "quote":"Fear. That is what we live with. And we live it everyday. Only in death are we free of it."
}
```

#### Quote by Character
```js
fetch('http://localhost:3000/character?q=edward%20elric')
      .then(response => response.json())
      .then(quotes => console.log(quotes))
```
will return
```js
{
  "anime": "Fullmetal Alchemist: Brotherhood",
  "character":"Edward Elric",
  "quote":"There's no such thing as a painless lesson, they just don't exist. Sacrifices are necessary, you can't gain something without losing something first... Although if you can endure that pain and walk away from it, you'll find that you now have a heart strong enough to overcome any obstacle... Yeah... A Fullmetal Heart."
}
```

## UML Sequence Diagram
```mermaid
sequenceDiagram
Client->>Middleware (Microservice): Client makes GET request to Microservice endpoint
Note over Client: /anime
Note over Client: /character
Note over Client: query parameter: q

Middleware (Microservice) ->> Animechan API: Microservice makes GET request to API endpoint
Note over Middleware (Microservice): /anime
Note over Middleware (Microservice): /character
Note over Middleware (Microservice): query parameter: title or name

alt  Success
Animechan API->>Middleware (Microservice): Successful Request
Note left of Animechan API: 200 OK
else Error
Animechan API->>Middleware (Microservice): Failed Request
Note left of Animechan API:  400 Bad request <br> 404 No related quotes found! <br> 500 Internal Server Error
end
alt  Success

Middleware (Microservice) ->> Client: Successful Request
Note left of Middleware (Microservice): 200 OK
else Error
Middleware (Microservice)->>Client: Failed Request
Note left of Middleware (Microservice):  400 GET request error <br> 404 No related quotes found!
end
```
