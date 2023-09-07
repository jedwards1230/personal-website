-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "company" TEXT NOT NULL,
    "client" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "info" TEXT NOT NULL,
    "href" TEXT,
    "tags" TEXT[],
    "showcase" BOOLEAN,
    "favorite" BOOLEAN,
    "images" TEXT[],

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);
