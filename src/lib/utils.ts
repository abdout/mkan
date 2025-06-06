import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { toast } from "sonner"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const cleanParams = (params: Record<string, any>) => {
  const cleaned: Record<string, any> = {};
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      cleaned[key] = value;
    }
  });
  return cleaned;
};

export const withToast = async (
  promise: Promise<any>,
  messages: { success?: string; error?: string }
) => {
  try {
    const result = await promise;
    if (messages.success) {
      toast.success(messages.success);
    }
    return result;
  } catch (error: any) {
    if (messages.error) {
      toast.error(messages.error);
    }
    throw error;
  }
};

// This function will be used to create user records in the database
// It will be called from the API when a user doesn't exist
export const createNewUserInDatabase = async (
  user: any,
  userRole: string,
  fetchWithBQ: any
) => {
  const createEndpoint = userRole?.toLowerCase() === "manager" 
    ? "/managers" 
    : "/tenants";

  const createUserResponse = await fetchWithBQ({
    url: createEndpoint,
    method: "POST",
    body: {
      // For NextAuth.js, we'll use the user ID as the key
      // Note: The backend may need to be updated to accept 'userId' instead of 'cognitoId'
      cognitoId: user.id,
      name: user.name || user.email?.split('@')[0] || '',
      email: user.email || "",
      phoneNumber: "",
    },
  });
  
  return createUserResponse;
};
