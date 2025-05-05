-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "rol" TEXT[] DEFAULT ARRAY['user']::TEXT[],
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATE,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- CreateIndex
CREATE INDEX "Users_status_idx" ON "Users"("status");
