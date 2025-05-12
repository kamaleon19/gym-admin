-- CreateTable
CREATE TABLE "Partners" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "dni" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "renewalDate" DATE,
    "expirationDate" DATE,

    CONSTRAINT "Partners_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Partners_code_key" ON "Partners"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Partners_dni_key" ON "Partners"("dni");

-- CreateIndex
CREATE INDEX "Partners_status_idx" ON "Partners"("status");
