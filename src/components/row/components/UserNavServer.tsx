// Client-side mock data function
export async function getUserData() {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    user: {
      id: "demo-user-id",
      picture: "/placeholder.jpg",
    },
  };
} 