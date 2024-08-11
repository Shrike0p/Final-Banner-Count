-- CreateTable
CREATE TABLE "Banner" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "timer" INTEGER NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "Banner_pkey" PRIMARY KEY ("id")
);
