import { Request, Response } from "express";
import { userServices } from "./users.services";

const userSignup = async (req: Request, res: Response) => {
  try {
    const result = await userServices.userSignup(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const usersControllers = {
  userSignup,
};
