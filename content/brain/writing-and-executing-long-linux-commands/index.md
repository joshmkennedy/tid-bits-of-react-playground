---
title: writing and executing long linux commands
date: '2021-03-15T14:17:54.751Z'
tags: ['linux', 'bash']
---

Some times you need to write a long and complicated linux command or script. It may not be worth writing a whole executable script for it, but its too long to just write in your terminal. Linux gives a way to write a command in an text editor, and then on save execute the script in the terminal.

## The Command is `Ctrl + x + e`

Hitting the above shortcut will open up vim or your default text editor, and will allow you to type your command save and then it will execute your command.

## Editing long commands after execution.

If you wrote a command but it had a typo, you can run the `fc` command and it will open the last executed command in a text editor and allow you to edit the command. After saving it will run the command again.
