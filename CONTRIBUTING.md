# Contributing

You will need [Node.js](https://nodejs.org/) and [Yarn](https://yarnpkg.com/) to set up the development environment.
Execute `yarn` to install the required dependencies.

## Scripts

`yarn run lint` - Lint the source and test files  
`yarn run fix` - Format the code and fix some errors automatically  

`yarn run test` - Run the test suite  
`yarn run t` - Run the test suite whenever any of the files changes  

`yarn run e2e.update` - Prepare for end-to-end tests  
`yarn run e2e` - Run the end-to-end tests  
`yarn run e2e.wds` - Serve the end-to-end application on port 8080 for manual testing

`yarn run build` - Build the project from source and assemble the build output in the `dist` folder  

`yarn run clean` - In case anything breaks due to leftover files  

## Commits

We follow the [Angular commit message convention](https://github.com/angular/angular/blob/master/CONTRIBUTING.md).

## Releasing

1. Check that `yarn run all` and CI are successful
2. Update the `CHANGELOG.md` using [standard-version](https://github.com/conventional-changelog/standard-version)
3. `git push && git push --tags`
4. `yarn run build`
5. `cd dist`
6. Remove the `private: true` property from the `package.json` file
7. `npm publish`
