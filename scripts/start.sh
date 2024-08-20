#!/bin/sh

sleep 2
./wait-for-it.sh $MONGO_HOST:$MONGO_PORT -- echo "Database is ready"

echo "Starting service..."
node main
