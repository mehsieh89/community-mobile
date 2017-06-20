# Community Mobile

What if I told you there's an app that scans your surrounding and lets you know all of the events happening around you?

![community-mobile](https://thumbs.gfycat.com/ChillyGrandAfricanparadiseflycatcher-size_restricted.gif)

## Team

- Ramsha A. Mushtaq
- Mel Hsieh
- Khoa Vo
- Yvonne Zhang

## Roadmap

View the project roadmap [here](https://trello.com/b/GaKJcbyi/community)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

# Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)

## Usage

> Some usage instructions

## Requirements

- Node 6.9.x
- Redis 3.2.x
- Postgresql 9.6.x
- etc

## Development

### Installing System Dependencies

```
brew install yarn
```

Yarn is a replacement for npm. It's faster and *guarantees* consistency -- as you deploy your code in various environments, you won't run the risk of slight variations in what gets installed.

### Install Project Dependencies

```
yarn install
node ios_setup.js 1043975815746787 community
```

- Note: if you are having issues with extracting the FBSDK file as a result of the above command, manually download the React-Native Facebook SDK from https://developers.facebook.com/docs/react-native, unzip it, then move the unzipped contents into community-mobile/ios/Frameworks directory (create Frameworks if it doesn’t already exist)

Inside iOS/ directory:

```
pod install
```

<!-- ## Database Initialization

IMPORTANT: ensure `postgres` is running before performing these steps.

### Database Creation:

Use grunt to create a new database for your development and test environments:

Development environment: `grunt pgcreatedb:default` (CURRENTLY NOT WORKING)

Other environments, specify like so: `NODE_ENV=test grunt pgcreatedb:default`

### Run Migrations & Data Seeds

In terminal, from the root directory:

`knex migrate:latest --env NODE_ENV`

`knex migrate:rollback --env NODE_ENV`

`knex seed:run --env NODE_ENV`

Note: `--env NODE_ENV` may be omitted for development. For example, `knex migrate:latest` will run all migrations in the development environment, while `knex migrate:latest --env test` will migrate in the test environment.

## Running the App

To run webpack build: `yarn run build`

To run server: `yarn run start`

To run tests: `yarn run test`

To run your redis server for the session store `redis-server`

## Deployment
- Provision heroku-postgres and heroku-redis add-ons for your app.
- Set all config variables and keys in Heroku app settings -->

## Running the App

- Navigate to ios/ directory, then open 'community.xcodeproj' in Xcode

- Inside Xcode, click on File -> New -> File, then select Property List
- In 'Targets', make sure 'Community' is checked, then name the plist 'Keys'
- Open the plist, add key 'GOOGLE_MAPS_API', then the API key in the value
- Build the app

Note: if you are getting 'SomeGoogleModule module not found' errors in Xcode while building the app, go to the Project Navigator in Xcode, expand the 'community' project, expand the 'Frameworks' folder, and delete any file that appears within that folder.
