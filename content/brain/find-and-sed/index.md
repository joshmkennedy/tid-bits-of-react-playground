---
title: Using find and sed to perform global search and replace
date: '2022-03-01T14:58:53.907Z'
tags: ['command line', 'linux', 'dev productivity']
---

Perform global search and replace from the command line you can use find (list files and directories based arguments) and sed ( a streams editor)

```bash
find . -name "*.php" -exec sed -i '' "s/<? /<?php /g" {} +
```

The find command has a flag `-exec` to execute a command when it finds a match.
