---
title: Using wp cli to export remote databases.
date: '2021-02-04T17:02:44.425Z'
tags: ['wp', 'mysql', 'databases', 'linux']
---

ssh in
cd to wp dir
run  `wp db export --add-drop-table`
should create a .sql file
copy paste file name and location in remote server
run `scp username@serverlocation:/path/to/file.sql ~/location/on/local/`
and thats it.