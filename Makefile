# Load environment variables from .env
include .env

TAG := v1.0.0
IMAGE := agungsptr/concreteai
COMPOSE := docker-compose -f docker-compose.yml

# Infrastructure
build:
	@npm run build
	docker build -t $(IMAGE)-be:$(TAG) .

compose-up:
	@echo "🚢 Starting services..."
	@TAG=$(TAG) $(COMPOSE) down -v || true
	@TAG=$(TAG) $(COMPOSE) up -d --force-recreate

compose-down:
	@TAG=$(TAG) $(COMPOSE) down -v || true

purge:
	@make -s compose-down
	@docker image rm $(IMAGE)-be:$(TAG) || true

infra:
	@echo "🚢 Starting DB service..."
	@TAG=$(TAG) $(COMPOSE) down -v || true
	@TAG=$(TAG) $(COMPOSE) up -d --force-recreate db supertokens
	@sleep 1
	@make -s wait-db
	@echo "\n🚀 Migrating database..."
	@npx prisma migrate dev
	@npm run start:dev

wait-db:
	@echo "\n🤌  Checking database is ready..."
	@scripts/wait-for-it.sh 0.0.0.0:$(PG_PORT)
	@echo "👌 Database is ready!"

wait-app:
	@echo "\n🤌  Checking app  ready..."
	@scripts/wait-for-it.sh 0.0.0.0:$(APP_PORT) 
	@echo "👌 App is ready!"

.PHONY: build test
