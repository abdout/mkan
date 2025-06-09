import { db } from "@/lib/db";

// Get password reset token by token string
export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    console.log("Searching for password reset token by token:", token);
    const passwordResetToken = await db.passwordResetToken.findUnique({
      where: { token }
    });

    if (!passwordResetToken) {
      console.error("Password reset token not found in the database:", token);
      return null;
    }

    console.log("Password reset token retrieved successfully:", passwordResetToken);
    return passwordResetToken;
  } catch (error) {
    console.error("Error retrieving password reset token from the database:", error);
    return null;
  }
};

// Get password reset token by email
export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    console.log("Searching for password reset token by email:", email);
    const passwordResetToken = await db.passwordResetToken.findFirst({
      where: { email }
    });

    if (!passwordResetToken) {
      console.error("Password reset token not found for the email in the database:", email);
      return null;
    }

    console.log("Password reset token retrieved successfully for email:", passwordResetToken);
    return passwordResetToken;
  } catch (error) {
    console.error("Error retrieving password reset token by email from the database:", error);
    return null;
  }
}; 