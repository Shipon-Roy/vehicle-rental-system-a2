import { Request, Response } from "express";
import { userServices } from "./users.services";

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUser();

    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const userUpdate = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { name, email, phone, role } = req.body;
    const result = await userServices.userUpdate(
      name,
      email,
      phone,
      role,
      userId as string
    );
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User Not Found",
        data: result.rows[0],
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const userDelete = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await userServices.userDelete(userId as string);

    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
        data: result.rows,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const usersControllers = {
  getAllUser,
  userUpdate,
  userDelete,
};
