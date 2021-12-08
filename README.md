# Incident Idenfication Tool

## Dependencies

You will need:

- [x] [Docker](https://www.docker.com/products/docker-desktop)
- [x] [Docker-compose](https://docs.docker.com/compose/install/)

### Run

```
docker-compose up
```

### Reset all data

```
docker-compose down --volumes
```

## Directories structure

- src/
    --- assets (images)
    --- components (headers, modals and their styles)
    --- hooks (functions that could be used in any project file (see examples first))
    --- pages (components redered in routes described in App.js)
    --- styles (global styles)
    --- App.js (routes)
    --- index.js (project main file)