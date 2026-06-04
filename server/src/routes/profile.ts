import { Router, type Request, type Response } from "express";
import { validate } from "../middleware/validate";
import { profileSchema } from "../validations/user";

export const profileRouter = Router();

profileRouter.post(
  "/",
  validate(profileSchema),
  (req: Request, res: Response) => {
    try {
      const { userId, ...profileData } = req.body;
      console.log(userId, profileData);
    } catch (error) {
      console.error("Error saving profile:", error);
      res.status(500).json({ error: "Failed to save profile" });
    }
  },
);
