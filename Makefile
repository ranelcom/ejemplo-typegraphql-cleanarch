include .env

# GENERAL
install:
	@npm install
	@npm i graphql
	@npm i class-validator
	@npm install dotenv
	@npm install pg --save
	@docker-compose up -d
	@npm run dev

dev:
	@npm run dev

#
# TESTING
#	
test:
	@echo "[test] Running tests..."
	@cp src/infrastructure/test/jest.config.js src/infrastructure/test/babel.config.js .
	@NODE_ENV=test npm test || true
	@rm jest.config.js babel.config.js