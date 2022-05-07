include .env

# GENERAL
install:
	@echo "[install] Installing dependencies..."
	@npm install
	@npm i graphql
	@npm i class-validator
	@npm install dotenv
	@npm install pg --save

dev:
	@echo "[run-dev] Running docker compose..."
	@docker-compose up -d
	@echo "[run-dev] running service in debug mode..."
	@npm run dev

stop:
	@echo "[stop] Stopping docker compose..."
	@docker-compose down

typescript: clean
	@echo "[typescript] Transpiling code..."
	@npm run typescript

clean:
	@echo "[clean] Cleaning dist folder..."
	@rm -rf dist/

linter:
	@echo "[linter] Running linter..."
	@npm run linter

check:
	@echo "[check] Checking project..."
	@make typescript
	@make test
	@make linter

#
# TESTING
#	
test:
	@echo "[test] Running tests..."
	@cp src/infrastructure/test/jest.config.js src/infrastructure/test/babel.config.js .
	@NODE_ENV=test npm test || true
	@rm jest.config.js babel.config.js

test-dev: 
	@echo "[test] Running tests..."
	@cp src/infrastructure/test/jest.config.js src/infrastructure/test/babel.config.js .
	@NODE_ENV=test npm run-script test:dev || true
	@rm jest.config.js babel.config.js

#
# ARCH
#
graphql:
	@sudo apt install graphviz
	@echo "[generate-graph] Generating GraphQL diagram, please after to move to asset folder..."
	graphqlviz http://localhost:$(PORT)/graphql | dot -Tpng -o asset/graph.png

.PHONY: install typescript clean linter check run dev stop test test-dev graphql