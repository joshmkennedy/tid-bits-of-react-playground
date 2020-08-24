---
title: Execute Binaries In a Aflred Workflow Script
date: '2020-08-24T15:33:41.173Z'
tags: ['productivity', 'alfred', 'automation', 'scripts']
---

When you want to write a Alfred workflow, and use the command line commands `node` or the vscode command `code`, you have to tell the alfred script exactly where these binaries are. You could just add the full path to the binary in your script like so:

```bash
/usr/local/bin/node somefile.js
```

or could create an environment variable for the workflow.

there is a place to add env variables that will be available to your scripts. _example `$variable_name`_. You would add the path as the value of the environment variable. Then you could use it like so.

```bash
$node somefile.js
```
