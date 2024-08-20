# How to Run

1. Copy file `.env.example` to `.env`
2. Install all dependencies 
   ```sh
   npm install
   ```
3. Run project using makefile
   ```sh 
   make infra
   ```
4. After service is running you can import postman collection and environment in postman folder. Inside postman there 3 main API
   - User: To SingUp and SignIn
   - Account: To create/read account based on User
   - Transaction: To send/withdraw based on Account and read all transaction based on Account

This Project build using
- Fastify
- Supertokens
- Prisma
- Docker