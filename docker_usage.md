docker build -t today-app .
or
docker run -d --name today-app today-app


# Docker Usage Guide for Today Notes App

## Build and Run

```powershell
# Build the Docker image
docker build -t today-app .

# Run the container (Next.js listens on port 3000 by default)
docker run -d -p 3000:3000 --name today-app today-app
```

## Docker Commands Reference

| Command                                                          | Usage/Description                                                                                  | When to Use                                                                                   |
|------------------------------------------------------------------|---------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------|
| `docker build -t today-app .`                                    | Build a Docker image named `today-app` from the Dockerfile in the current directory.              | Whenever you change the Dockerfile, package.json, or any code/config that affects the image.  |
| `docker run -d -p 3000:3000 --name today-app today-app`          | Run the container in detached mode, mapping port 3000.                                            | To start your app container after building the image.                                         |
| `docker ps`                                                      | List all running containers.                                                                      | To check if your app container is running.                                                    |
| `docker stop today-app`                                          | Stop the running app container.                                                                   | When you want to stop the app without removing it.                                            |
| `docker start today-app`                                         | Start a stopped app container.                                                                    | To restart the app after stopping it.                                                         |
| `docker rm today-app`                                            | Remove the app container.                                                                         | To delete the container (e.g., before re-running with different settings).                    |
| `docker logs today-app`                                          | View logs from the app container.                                                                 | To debug or monitor the app output.                                                           |
| `docker-compose up --build -d`                                   | Build and run all services defined in docker-compose.yml in detached mode.                        | If you use Docker Compose (e.g., for multi-container setups or DB), and want to rebuild/run.  |
| `docker-compose down`                                            | Stop and remove all containers and networks from docker-compose.yml.                              | To clean up after using Docker Compose.                                                       |
| `docker-compose logs -f`                                         | Follow logs from all services in docker-compose.yml.                                              | To monitor logs in real time when using Docker Compose.                                       |

---

## Typical Workflow

1. Edit your code, Dockerfile, or Prisma schema as needed.
2. Run `docker build -t today-app .` to rebuild the image if you made changes to the Dockerfile, dependencies, or code.
3. Run `docker run -d -p 3000:3000 --name today-app today-app` to start the app container.
4. Use `docker ps -a` to list running containers, `docker logs today-app` to view logs, and other commands in the table above to monitor and manage your container.
5. Use Docker Compose commands if you have a `docker-compose.yml` and want to manage multiple services (like a database and backend) together.

---

## Notes

- The Dockerfile is set up to generate the Prisma client for Linux, ensuring compatibility with most cloud and server environments.
- The app listens on port 3000 by default. Adjust the `-p` flag if you want to map to a different host port.
- Rebuild the image after any change to the Dockerfile, Prisma schema, or code that is copied into the image.
- If you use environment variables (e.g., for your database), set them with the `-e` flag or in your deployment environment.
- For more, see the [Docker docs](https://docs.docker.com/get-started/).

---


## Development Workflow (using `npm run dev`)
1. Edit your code, Dockerfile, or Prisma schema as needed.
2. Run `docker build -t today-app .` to rebuild the image if you made changes to the Dockerfile, dependencies, or code.
3. Run `docker run -d -p 3000:3000 --name today-app today-app` to start the app container in development mode (using `npm run dev`).
4. Use `docker ps -a` to list running containers, `docker logs today-app` to view logs, and other commands in the table above to monitor and manage your container.
5. Use Docker Compose commands if you have a `docker-compose.yml` and want to manage multiple services (like a database and backend) together.

## Notes
- The Dockerfile is set up to run the app in development mode using `npm run dev` (Next.js dev server).
- The app listens on port 3000 by default. Adjust the `-p` flag if you want to map to a different host port.
- Rebuild the image after any change to the Dockerfile, Prisma schema, or code that is copied into the image.
- If you use environment variables (e.g., for your database), set them with the `-e` flag or in your deployment environment.
- For more, see the [Docker docs](https://docs.docker.com/get-started/).
