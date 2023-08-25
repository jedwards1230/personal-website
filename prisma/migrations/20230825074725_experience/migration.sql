-- CreateTable
CREATE TABLE "Experience" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "description" TEXT[],
    "tags" TEXT[],

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);
