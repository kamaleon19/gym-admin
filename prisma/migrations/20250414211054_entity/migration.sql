-- CreateTable
CREATE TABLE "Articles" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Articles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Articles_status_idx" ON "Articles"("status");
