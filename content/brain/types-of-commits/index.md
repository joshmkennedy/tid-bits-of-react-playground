---
title: A quick reference of git commit types
date: '2021-06-17T13:15:11.769Z'
tags: ['git']
---

Having a defined convention of git commit message structure is really helpful, when reading git history or understanding what a pull request encompasses. A popular convention is to label the message with a scope. Here is a list of popular types in commit messages with explanation.

## Types of Commits:

| Label         | description                                             |
| ------------- | ------------------------------------------------------- |
| **feat:**     | The new feature being added to a particular application |
| **fix:**      | A bug fix (this correlates with PATCH in SemVer)        |
| **style:**    | Feature and updates related to styling                  |
| **refactor:** | Refactoring a specific section of the codebase          |
| **test:**     | Everything related to testing                           |
| **docs:**     | Everything related to documentation                     |
| **chore:**    | Regular code maintenance                                |

_this list was taken from this [blog post](https://medium.com/swlh/writing-better-commit-messages-9b0b6ff60c67#49fc) by Apurva Jain_, which goes into more detail about structured commit messages.
