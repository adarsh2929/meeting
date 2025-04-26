/*
  Warnings:

  - Added the required column `date` to the `Meeting` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Meeting" ADD COLUMN     "date" DATE NOT NULL,
ALTER COLUMN "start" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "end" SET DATA TYPE TIMESTAMP(3);
