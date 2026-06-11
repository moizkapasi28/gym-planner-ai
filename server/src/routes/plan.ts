import { Router, type Request, type Response } from "express";
import { validate } from "../middleware/validate";
import { currentPlanSchema, planSchema } from "../validations/plan";
import { prisma } from "../lib/prisma";
import { generatePlan } from "../lib/ai";

export const planRouter = Router();

planRouter.post(
  "/generate",
  validate(planSchema),
  async (req: Request, res: Response) => {
    try {
      const { userId } = req.body;

      const profile = await prisma.user_profile.findUnique({
        where: { userId },
      });

      if (!profile) {
        return res
          .status(400)
          .json({ error: "User profile not found. Complete onboarding first" });
      }

      //NEED PLAN TABLE
      const latestPlan = await prisma.training_plans.findFirst({
        where: {
          userId,
        },
        orderBy: {
          created_at: "desc",
        },
        select: {
          version: true,
        },
      });

      const nextVersion = latestPlan ? latestPlan.version + 1 : 1;
      // TODO: replace with real plan generation logic
      let planJson = {};

      try {
        planJson = await generatePlan(profile);
      } catch (error) {
        console.error("Error generating plan:", error);
        return res.status(500).json({
          error: "Failed to generate plan. please try again later",
          details:
            error instanceof Error
              ? error.message
              : "Unknown error generating plan",
        });
      }

      const planText = JSON.stringify(planJson, null, 2);

      const newPlan = await prisma.training_plans.create({
        data: {
          userId,
          plan_json: planJson,
          plan_text: planText,
          version: nextVersion,
          created_at: new Date(),
          updated_at: new Date(),
        } as any,
      });

      return res.status(201).json(newPlan);
    } catch (error) {
      console.error("Error saving profile:", error);
      res.status(500).json({ error: "Failed to generate plan" });
    }
  },
);

planRouter.get(
  "/current",
  validate(currentPlanSchema),
  async (req: Request, res: Response) => {
    try {
      const { userId } = req.query;

      const plan = await prisma.training_plans.findFirst({
        where: {
          userId: userId as string,
        },
        orderBy: {
          created_at: "desc",
        },
      });

      if (!plan) {
        return res.status(404).json({ error: "Plan not found" });
      }

      return res.status(200).json(plan);
    } catch (error) {
      console.error("Error saving profile:", error);
      res.status(500).json({ error: "Failed to retrieve current plan" });
    }
  },
);
