import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: async ({ req, token }) => {
      console.log("req", req.nextUrl.pathname)
     
      const userRole = token?.user?.role;

      if (req.nextUrl.pathname.startsWith("/panel")) {
        // Check for "admin" or "super admin" role
        return userRole === "admin";
      } else if (req.nextUrl.pathname.startsWith("/user")) {
        // Check for "super admin" role for the "/superAdmin" route
        return userRole === "user";
      }

      return !!token;
    },
  },
});
export const config = { matcher: ["/panel:path*", "/user:path*"] };
