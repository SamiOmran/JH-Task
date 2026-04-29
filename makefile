# Makefile

install:
cd server && npm install
cd client && npm install

server:
cd server && npm run dev

client:
cd client && npm run dev

env:
cd server && cp .env.example .env
