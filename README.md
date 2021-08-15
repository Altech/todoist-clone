# Todoist clone

A clone of [Todoist](https://todoist.com/), a popular task management app built using React, TypeScript, and Firebase.

![](./public/screenshot)

https://altech-todoist.web.app/

## Technologies

- Language: TypeScript
- UI Library: React 17
- Backend: Firebase (Cloud Firestore, Authentication, Hosting)
- Firebase SDK: [v9 - modular version](https://firebase.google.com/docs/web/learn-more#modular-version)
- Module Bundler: Snowpack
- CSS: styled-components

## Spec

### Features

- Sign Up
- Sign In
- Sign Out
- List tasks
- Add a task to inbox
- Edit a task
- Delete a task
- Mark task as done
- Schedule a task
- List projects
- Add a project
- Add a task to a project
- List tasks of a project
- Filter all tasks by schedule

## Setup

Since Firebase credentials are already included in the repository, the minimal setup procedure to run it locally is as follows.

```
$ yarn
$ yarn start
```

To replace firebase backend as well, create an account and change `src/firebaase.ts`.
