import { db } from "@/lib/db";

const isDevelopment = process.env.NODE_ENV === "development";

// Get password reset token by token string
export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    if (isDevelopment) {
      console.log("Searching for password reset token");
    }
    const passwordResetToken = await db.passwordResetToken.findUnique({
      where: { token }
    });

    if (!passwordResetToken) {
      if (isDevelopment) {
        console.log("Password reset token not found");
      }
      return null;
    }

    if (isDevelopment) {
      console.log("Password reset token retrieved successfully");
    }
    return passwordResetToken;
  } catch (error) {
    if (isDevelopment) {
      console.error("Error retrieving password reset token");
    }
    return null;
  }
};

// Get password reset token by email
export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    if (isDevelopment) {
      console.log("Searching for password reset token by email");
    }
    const passwordResetToken = await db.passwordResetToken.findFirst({
      where: { email }
    });

    if (!passwordResetToken) {
      if (isDevelopment) {
        console.log("Password reset token not found for email");
      }
      return null;
    }

    if (isDevelopment) {
      console.log("Password reset token retrieved successfully");
    }
    return passwordResetToken;
  } catch (error) {
    if (isDevelopment) {
      console.error("Error retrieving password reset token by email");
    }
    return null;
  }
}; 