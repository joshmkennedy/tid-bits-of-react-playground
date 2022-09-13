---
title: Connect an app like DBVis to a localbyflywheel db
date: '2022-09-13T15:22:22.100Z'
tags: [php, db, localbyflywheel, wp]
---


Local by flywheel moved from using ports to Unix Sockets. To enable the ability to connect via Ports you will need to
run two commands in the localbyflywheel site shell.

Once you are in the site's shell. Create root user in myql, this allows us to connect via a jdbc string
`jdbc:mysql://127.0.0.1:<PORT>/<dbname>`

```bash
mysql -e "CREATE USER 'root'@'127.0.0.1' IDENTIFIED BY 'root'; GRANT ALL ON *.* TO 'root'@'127.0.0.1';"
```

We still need the port number. We can run this command to get the port.

```bash
mysql -e "SHOW VARIABLES WHERE Variable_name = 'port';"
```

Now that we have the port we can connect to DBVis by entering our jdbc sting in to the url input
`jdbc:mysql://127.0.0.1:<INSERT_PORT>/local`



