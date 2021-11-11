---
title: using fzf to change directory
date: '2021-11-11T14:58:53.907Z'
tags: ['command line', 'linux', 'dev productivity']
---

To change a directory using fzf you can use the snippet below.

```bash
cd $(ls | fzf)
```

We have to use a subcommand and pass the value returned from piping ls into fzf as the directory to pipe to
