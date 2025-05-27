-- -- CreateTable
-- CREATE TABLE "users" (
--     "id" SERIAL NOT NULL,
--     "username" TEXT NOT NULL,
--     "email" TEXT NOT NULL,
--     "password" TEXT NOT NULL,
--     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

--     CONSTRAINT "users_pkey" PRIMARY KEY ("id")
-- );

-- -- CreateIndex
-- CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- -- CreateIndex
-- CREATE UNIQUE INDEX "users_email_key" ON "users"("email");


CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "username" TEXT NOT NULL UNIQUE,
  "email" TEXT NOT NULL UNIQUE,
  "password" TEXT NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);