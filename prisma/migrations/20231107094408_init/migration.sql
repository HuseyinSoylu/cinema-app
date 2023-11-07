/*
  Warnings:

  - You are about to drop the column `description` on the `Film` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Film` table. All the data in the column will be lost.
  - Added the required column `Actors` to the `Film` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Awards` to the `Film` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Country` to the `Film` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Director` to the `Film` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Genre` to the `Film` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Language` to the `Film` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Metascore` to the `Film` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Plot` to the `Film` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Poster` to the `Film` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Rated` to the `Film` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Released` to the `Film` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Response` to the `Film` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Runtime` to the `Film` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Title` to the `Film` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Type` to the `Film` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Writer` to the `Film` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Year` to the `Film` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imdbID` to the `Film` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imdbRating` to the `Film` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imdbVotes` to the `Film` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Film" DROP COLUMN "description",
DROP COLUMN "title",
ADD COLUMN     "Actors" TEXT NOT NULL,
ADD COLUMN     "Awards" TEXT NOT NULL,
ADD COLUMN     "Country" TEXT NOT NULL,
ADD COLUMN     "Director" TEXT NOT NULL,
ADD COLUMN     "Genre" TEXT NOT NULL,
ADD COLUMN     "Images" TEXT[],
ADD COLUMN     "Language" TEXT NOT NULL,
ADD COLUMN     "Metascore" TEXT NOT NULL,
ADD COLUMN     "Plot" TEXT NOT NULL,
ADD COLUMN     "Poster" TEXT NOT NULL,
ADD COLUMN     "Rated" TEXT NOT NULL,
ADD COLUMN     "Released" TEXT NOT NULL,
ADD COLUMN     "Response" TEXT NOT NULL,
ADD COLUMN     "Runtime" TEXT NOT NULL,
ADD COLUMN     "Title" TEXT NOT NULL,
ADD COLUMN     "Type" TEXT NOT NULL,
ADD COLUMN     "Writer" TEXT NOT NULL,
ADD COLUMN     "Year" TEXT NOT NULL,
ADD COLUMN     "imdbID" TEXT NOT NULL,
ADD COLUMN     "imdbRating" TEXT NOT NULL,
ADD COLUMN     "imdbVotes" TEXT NOT NULL;
