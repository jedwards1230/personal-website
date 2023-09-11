ALTER TABLE "About" 
ADD COLUMN "email" TEXT NOT NULL DEFAULT 'default_email@example.com',
ADD COLUMN "github" TEXT NOT NULL DEFAULT 'default_github',
ADD COLUMN "linkedin" TEXT NOT NULL DEFAULT 'default_linkedin',
ADD COLUMN "location" TEXT NOT NULL DEFAULT 'default_location',
ADD COLUMN "phone" TEXT NOT NULL DEFAULT 'default_phone';
