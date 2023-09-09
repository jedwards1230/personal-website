-- CreateTable
CREATE TABLE "About" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "tags" TEXT[],
    "description" TEXT NOT NULL,

    CONSTRAINT "About_pkey" PRIMARY KEY ("id")
);
