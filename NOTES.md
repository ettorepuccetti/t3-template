## Git repo

### add remote to existing project

```shell
git remote add origin repo_url
git push -u -f origin main
```

## DB

### Docker

```shell
docker run --name mysql-t3 -e MYSQL_ROOT_PASSWORD=secret -p 3307:3307 -d mysql
```
