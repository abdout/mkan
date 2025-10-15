import { db } from "@/lib/db";

const isDevelopment = process.env.NODE_ENV === "development";

// Get verification token by token string
export const getVerificationTokenByToken = async (token: string) => {
  try {
    if (isDevelopment) {
      console.log("Searching for verification token"); // Don't log the actual token
    }
    const verificationToken = await db.verificationToken.findUnique({
      where: { token }
    });

    if (!verificationToken) {
      if (isDevelopment) {
        console.log("Verification token not found");
      }
      return null;
    }

    if (isDevelopment) {
      console.log("Verification token retrieved successfully");
    }
    return verificationToken;
  } catch (error) {
    if (isDevelopment) {
      console.error("Error retrieving verification token");
    }
    return null;
  }
};

// Get verification token by email
export const getVerificationTokenByEmail = async (email: string) => {
  try {
    if (isDevelopment) {
      console.log("Searching for verification token by email");
    }
    const verificationToken = await db.verificationToken.findFirst({
      where: { email }
    });

    if (!verificationToken) {
      if (isDevelopment) {
        console.log("Verification token not found for email");
      }
      return null;
    }

    if (isDevelopment) {
      console.log("Verification token retrieved successfully");
    }
    return verificationToken;
  } catch (error) {
    if (isDevelopment) {
      console.error("Error retrieving token by email");
    }
    return null;
  }
}
