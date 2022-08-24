---
title: Tmux Snippets
date: '2022-08-22'
tags: ['command line', 'tmux', 'linux', 'dev productivity']
---

new temporary window named "Code" with command then navigates to it

```bash
tmux neww -n Code "nvim ."\;
```

new temporary window named "Code" with command then navigates to it sets cwd to `path/to/dir`

```bash
tmux neww -c path/to/dir -n Code "nvim ."\;
```

split the window named "tests"

```bash
tmux split-window -h -t tests \;
```

executes those commands on the window named "tests"

```bash
tmux send-keys -t tests "wpl-shell.sh UcqGJceVL" C-m\;
tmux send-keys -t tests " cd wp-content/plugins/puzzler-hunt" C-m\;
tmux send-keys -t tests "yarn opentest" C-m\;
```
