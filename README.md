# Ipv4manager

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.4.

This is for use in conjunction with the project located at [DEA Code Challenge](https://github.com/githubsheema/dea-codechallenge).

To install, use [NPM](https://nodejs.org/en/download).

Run `npm install` at /dea-challenge/ipv4manager/.

It will also require an update to the provided project(https://github.com/githubsheema/dea-codechallenge), in file 'IPv4AMController.java'.
Need to insert:
1) 'import org.springframework.web.bind.annotation.CrossOrigin;' in the imports 
2) '@CrossOrigin(origins = "http://localhost:4200")' as an annotation above 'public class IPv4AMController {...'

This is to enable Cross Origin Resource Sharing (CORS) with the location where the Angular application will be running.

I have submitted a pull request to relevant project(https://github.com/githubsheema/dea-codechallenge) with the necessary changes.

## Development server

Run `ng serve --open` for a dev server. It will navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.