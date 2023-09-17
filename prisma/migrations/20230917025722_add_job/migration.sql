-- CreateTable
CREATE TABLE "Job" (
    "id" SERIAL NOT NULL,
    "company" TEXT,
    "title" TEXT,
    "pay" TEXT,
    "ad" TEXT,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);
