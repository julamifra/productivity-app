# PRODUCTIVITY-APP

The idea of Productivity App is to keep as simple as posible all your tasks listed and organised.

It is basically a simple task list app where the users are able to create, edit, delete and list all the tasks that must done to complete the day in a good way.

As it's shown bellow, this would be the final goal to achieve to complete the app development. For this project, only the basic functions have been developed.

As main goals of this project:
Understand the React architecture, the reuse of the components and the differents hooks that facilitate when developing. The use of the Router to navigate to diferents path within the app. And how to interact in an organised and secure way with the backend API.

![Responsice Mockup](./docs/wireframe.PNG)

# Table of Contents

- [User Stories](#user-stories)
- [Features](#features)
- [Future features](#future-features)
- [Technologies](#technologies)
- [Testing](#testing)
- [Deployment](#deployment)
- [Credits](#credits)


## User Stories
1) As an user I can see a navigation so that I can search, add task or go to settings from here. 
2) As an user I can sign up in the website so that I can have an user in the app and I am able to create new task. 
3) As an user I can sign in so that I can see the button add task in order to create new tasks on the list. 
4) As an user I can log out from the app so that I can't see the creation task button. 
5) As an user I can see a task list in the home page once I am logged in. 
6) As an user I can mark on unmark any task as done so that I can know which ones I have finished. 
7) As an user I can mark/unmark any task as important by clicking on a flag icon so that I can prioritize my tasks 
8) As an user I can delete a task by clicking on a bin icon so that I don't see the task any more on the list. 

These user stories are created on GitHub as issues and they have been assigned to a Product Backlog project (milestone in Github). A board has been created as well to see the progress of them. This includes three columns: Backlog, In progress and Done.

## Features

- __Navigation Bar__

    - On the left, a logo. On the right, the different tabs to navigate to the different pages of the app: Home, SignIn and SignUp
    - Once the user is signed in, a creation-task button will be displayed on the left.

- __Home__

    - This page can be accessed by clicking on the home button. All the tasks are listed in here.

- __Sign In__

    - In this page, a form is displayed, where users will be able to sign in if they have been registered previously.

- __Sign Up__

    - From here, users will be able to sign up on the application. Once they have they user created and after loging into the app, they will be able to create new tasks.

- __Creation task Form__

    - In order to access here, users must be logged in. Once in the app, a creation button will be displayed on the navigation bar and by clicking on it, a form will be shown. From here, users will be able to create new tasks for the lists.

## Future features

- A lot of functionalities can be done to improve the app: a search functionality, add categories to the tasks, add tags to the tasks, share tasks, ...


## Technologies

- [Moqups](https://app.moqups.com/) - Use to create wireframes of the site
- GitPod: this tool has been chosen as the IDE of this project. It is a cloud development environment accessible via a browser, that can be run directly from the github repository.
- [Github](https://github.com/) - Used to host the project.
- [Heroku](https://www.heroku.com/) - It is a cloud platform as a service supporting several programming languages
- [React Bootstrap](https://react-bootstrap.github.io/) - React Library, based on Boostrap. Easy to use, with good documentation.
- [React](https://reactjs.org/) - JavaScript framework, used for all the UI.


## Testing

- After the deployment there have been some issues in terms of some of the user stories discussed above. Some CORS issues and some problems with JWT library. In terms of the second one, this JWT was not being decrypted correctly and therefore the frontend could not deal with the user's session. It turned out to be something about the libraries in the Django Project (backend). I will comment more about this on that project.

- In terms of the CORS issue, it was resolved by modifying the Config Vars. 

## Deployment

[Link to deployed site in production](https://react-productivity-app.herokuapp.com/)


- First, create a new project on Heroku. Just for the frontend part.
- Within Heroku, on the dasboard, click New and then Create a new app.
- Here we have to give a name to the project and choose our region (Europe)
- Then we have to link this with the Github repository. We have to go to the settings tab and do it from there.
- Once this project is deployed, in this case, no Config Vars are needed.
- But we have to copy the production url that Heroku generates and paste it in the Config Vars ("CLIENT_ORIGIN") of the backend deployment (I will talk about this in the other project).

## Credits

I like to thank my tutor, Rohit, for all the recommendations he has given me. 
