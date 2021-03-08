# Photos Service

> This service provides the photo url and meta data.

## Related Projects

 - https://github.com/space-work/review-service
 - https://github.com/space-work/amenities-service
 - https://github.com/space-work/contact-widget-service
 - https://github.com/space-work/workspace-service
 - https://github.com/space-work/location-service
 - https://github.com/space-work/workspace-description-service
 - https://github.com/space-work/photos-service
 - https://github.com/space-work/nearby-workspaces

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- Mongo 4.4.1

## Development

First time set up:

Run seeding scripts (mongo must be installed and running)
```
npm run seed
```

Start server
```
npm run server:dev
```

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```


# Spacework REST API

## Endpoint
    /api/photos

#### GET

    Photo data by photo id - /api/photos/:id

    Photos data by workspace id - /api/photos/workspace/:workspaceId

#### POST

    New photo data - /api/photos/

##### Request body example
```
  {
      "url": "http://www.imageurl.com/",
      "description": "Description goes here"
  }
```
_________________


#### PUT

    Update photo url and/or photo description - /api/photos/:id

##### Request body example (can have url and/or description)
```
  {
      "url": "http://www.imageurl.com/",
      "description": "Description goes here"
  }
```
_________________


#### DELETE

    Photo data by photo id - /api/photos/:id

    All workspace photo data - /api/photos/workspace/:workspaceId

_________________



