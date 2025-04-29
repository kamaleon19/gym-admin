-- CreateTable
CREATE TABLE "Expenses" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "import" BIGINT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "paidAt" TIMESTAMP(3),

    CONSTRAINT "Expenses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Expenses_status_idx" ON "Expenses"("status");
