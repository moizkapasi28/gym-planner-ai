import { Router, type Request, type Response } from "express";
import { validate } from "../middleware/validate";
import { profileSchema } from "../validations/user";
import { prisma } from "../lib/prisma";

export const profileRouter = Router();

profileRouter.post(
  "/",
  validate(profileSchema),
  async (req: Request, res: Response) => {
    try {
      const { userId, ...profileData } = req.body;

      await prisma.user_profile.upsert({
        where: { userId: userId },
        update: {
          goal: profileData.goal,
          experience: profileData.experience,
          days: profileData.days,
          session: profileData.session,
          equipment: profileData.equipment,
          split: profileData.split,
          injuries: profileData.injuries,
          updated_at: profileData.updated_at,
        },
        create: {
          userId,
          goal: profileData.goal,
          experience: profileData.experience,
          days: profileData.days,
          session: profileData.session,
          equipment: profileData.equipment,
          split: profileData.split,
          injuries: profileData.injuries,
          created_at: profileData.created_at,
          updated_at: profileData.updated_at,
        },
      });

      res.json({ success: true });
    } catch (error) {
      console.error("Error saving profile:", error);
      res.status(500).json({ error: "Failed to save profile" });
    }
  },
);
