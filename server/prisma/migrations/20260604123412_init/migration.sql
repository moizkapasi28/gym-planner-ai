-- CreateTable
CREATE TABLE "user_profile" (
    "userId" UUID NOT NULL,
    "goal" VARCHAR(20) NOT NULL,
    "experience" VARCHAR(20) NOT NULL,
    "days" INTEGER NOT NULL,
    "session" INTEGER NOT NULL,
    "equipment" VARCHAR(20) NOT NULL,
    "split" VARCHAR(20) NOT NULL,
    "injuries" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_profile_pkey" PRIMARY KEY ("userId")
);
