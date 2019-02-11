#!/bin/bash
echo "start building..."
docker-compose down
docker image prune -f
if [ "$1" = "develop" ] || [ "$1" = "dev" ] || [ "$1" = "test" ] ; then
  export NODE_ENV=development 
  echo "Deploying develop"
  docker stop supplement-db   
  docker rm supplement-db  
  docker rmi supplement-db
  docker run -d -p 27017:27017 --name supplement-db -v /data/supplement-db:/data/db mongo --bind_ip_all

  sleep 10
  npm run start:dev
else
  echo "Deploying production"
  export NODE_ENV=production 
  export PORT=3032
  export MONGODB_URI=mongo
  export MONGODB_DATABASE_NAME=supplement
  export MONGODB_PORT=27017
  export ADMIN_CODE=secretadmincode123
  export JWT_SECRET=secret123
  docker-compose up --build
fi