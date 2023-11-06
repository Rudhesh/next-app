import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: async ({ req, token }) => {
      console.log("req", req.nextUrl.pathname)
      console.log( "token",token.user?.role )
      if (req.nextUrl.pathname.startsWith("/panel")) return token.user?.role === "user";
      return !!token;
    },
  },
});
export const config = { matcher: ["/panel:path*", "/panel"] };
