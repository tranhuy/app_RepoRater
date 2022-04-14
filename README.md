# Repo Rater App

## About and Usage

A mobile-friendly application for rating Github repositories that offers the following features:
- The ability to register a new user
- Log in and out
- UI displaying a list of Github repositories with filtering options for searching and sorting
- Selecting a repository from the list displays information about the repository
- An authenicated user will have the ability to create a review for a repository from the list and can only leave one review per repository otherwise an error is thrown by the server
- Authenticated users will also have access to a view displaying all their reviews and have the ability to delete a review they created

### **Note about using this app on web**

1) Due to a bug with one of the React Native core components, infinite scrolling does not work properly on the web version.  So when creating a new review for a repository with a long list of reviews you have to refresh the page to see the review you created.  If the repository reviews list is short then your review will appear automatically in the list after creation.

2) On the web version you will not be able to delete a review since the delete button triggers a react native component which does not work on the web.

## Technical Overview

- Application was built using React Native and the Expo framework
- GraphQL was used for communication with the server
- Apollo platform was selected for GraphQL communication
- Data is stored in a SQLite database
- SQLite database is reset and populated with inital data each time the server is started
- The server uses the Github API to fetch repository information
- New data is lost upon server reboot

## Requirements

Make sure to use Node version 16.  If you haven't installed Node or npm, [nvm](https://github.com/nvm-sh/nvm) is an easy to use tool for installing both. Nvm is also handy if you want to quickly switch between different Node versions.

## Installation

1. Clone the repo by running 
```sh
git clone git@github.com:tranhuy/app_RepoRater.git
```
2. Launch code editor in the project folder

3. Install npm packages by running
```sh
npm install
```

4. 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Start the app in the web by running
```sh
npm run web
```

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Start the app in on an Android emulator by running
```sh
npm run anroid
```

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Start the app in on an iOS emulator by running
```sh
npm run ios
```

## Achknowledgements
[fullstack-hy](https://github.com/fullstack-hy2020) - for providing the GraphQL api