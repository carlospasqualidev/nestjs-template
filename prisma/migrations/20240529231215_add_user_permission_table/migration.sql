-- CreateEnum
CREATE TYPE "Permissions" AS ENUM ('admin', 'user');

-- CreateTable
CREATE TABLE "userPermissions" (
    "id" TEXT NOT NULL,
    "permission" "Permissions" NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userPermissions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "userPermissions_id_key" ON "userPermissions"("id");

-- AddForeignKey
ALTER TABLE "userPermissions" ADD CONSTRAINT "userPermissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
