-- CreateTable
CREATE TABLE "Thought" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "publishedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Thought_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Thought" ADD CONSTRAINT "Thought_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
