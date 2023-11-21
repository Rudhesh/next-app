"use client";
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import Image from "next/image";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MultilineChartIcon from "@mui/icons-material/MultilineChart";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsPausedIcon from "@mui/icons-material/NotificationsPaused";
import StorageIcon from "@mui/icons-material/Storage";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Avatar, Button } from "@mui/material";
import ThemeButton from "./ThemeButton";
import { ThemeProvider } from "next-themes";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import TranslateIcon from "@mui/icons-material/Translate";
import { deepOrange } from "@mui/material/colors";
import { ModeToggle } from "@/components/ui/toggle-theme";
import FavDashboard from "./favDashboard";

const menuItems = [
  {
    heading: "HOME",
    items: [
      { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
      { text: "Panel", icon: <MultilineChartIcon />, path: "/panel" },
    ],
  },
  {
    heading: "VIEW",
    items: [
      { text: "Search", icon: <SearchIcon />, path: "/search" },
      {
        text: "Notification",
        icon: <NotificationsPausedIcon />,
        path: "/notification",
      },
    ],
  },
  {
    heading: "CONFIGURATION",
    items: [
      { text: "Data partition", icon: <StorageIcon />, path: "/datapartition" },
      { text: "Node graph", icon: <WorkspacesIcon />, path: "/nodegraph" },
      { text: "Import", icon: <ImportExportIcon />, path: "/import" },
    ],
  },
  {
    heading: "MANAGEMENT",
    items: [
      { text: "User", icon: <PersonIcon />, path: "/user" },
      // { text: 'Log out', icon: <LogoutIcon />, path: '/' },
    ],
  },
];

const drawerWidth = 240;
const appBarHeight = 45;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Layout({ children }: any) {
  const [open, setOpen] = React.useState(true);

  const router = useRouter();
  const pathname = usePathname();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const { data: session, status }: any = useSession();

  if (status === "loading") {
    return <p>Loading...</p>; // Or any loading indicator
  }

  if (!session) {
    // Redirect to the '/login' route if session is undefined
    router.push("/");
    return null; // Don't render anything in this case
  }

  return (
    <ThemeProvider>
      <Box sx={{ display: "flex" }}>
        {/* <CssBaseline /> */}
        <div className="fixed min-w-full bg-gray-50 dark:bg-zinc-950 shadow-md dark:shadow-none z-10">
          <div className="flex justify-between  ">
            <div>
              <IconButton
                className="flex items-center text-black dark:text-white"
                style={{ marginLeft: "240px" }} // Add this line
                onClick={toggleDrawer}
              >
                <MenuIcon />
              </IconButton>
            </div>

            <div className="flex space-x-6">
              {session?.user?.role === "admin" ? (
                <div
                  className=" cursor-pointer flex items-center justify-center rounded-lg p-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-900"
                  onClick={() => router.push("/admin")}
                >
                  Admin
                </div>
              ) : null}
              {session?.user?.role === "data-admin" ? (
                <div
                  className="cursor-pointer flex items-center justify-center rounded-lg p-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-900"
                  onClick={() => router.push("/dataAdmin")}
                >
                  Data-Admin
                </div>
              ) : null}
              <div className="cursor-pointer flex items-center justify-center rounded-lg p-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-900">
                <FavDashboard />
              </div>
              <div
                className="cursor-pointer flex items-center justify-center rounded-lg p-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-900"
                onClick={() => router.push("/test")}
              >
                Panel
              </div>
            </div>
            <div className="flex space-x-4">
              <div
                className=" cursor-pointerflex items-center justify-center rounded-lg p-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-700"
                onClick={() => router.push("/dashboard")}
              >
                <TranslateIcon />
              </div>
              <div
                className=" cursor-pointer flex items-center justify-center rounded-lg p-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-700"
                onClick={() => router.push("/panel")}
              >
                <NotificationsNoneIcon />
              </div>
              <div>
                <ThemeButton />
              </div>
            </div>
            {/* <ModeToggle /> */}
          </div>
        </div>

        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader className=" bg-gray-50 dark:bg-zinc-950 flex flex-col">
            <Image
              className=" bg-blend-lighten hover:bg-blend-darken mb-5"
              src="/logo-breitfuss.png"
              height={125}
              width={125}
              alt="Breitfuss Logo"
            />
          </DrawerHeader>

          <List className="bg-gray-50 dark:bg-zinc-950 text-black dark:text-white flex flex-col text-xs h-screen">
            <div className="mb-10 flex flex-col items-center">
              <AccountCircleIcon style={{ fontSize: "66px" }} />
              {!session ? (
                <div>no name</div>
              ) : (
                <>
                  {" "}
                  <div className="text-black dark:text-white"></div>
                  <Typography variant="subtitle1">
                    {session.user?.realname}
                  </Typography>
                  <Typography className="text-ls">
                    {session.user?.role}
                  </Typography>
                </>
              )}
            </div>
            {menuItems.map((menu, index) => (
              <div key={index}>
                {session?.user?.role === "user" ? (
                  menu.heading !== "CONFIGURATION" && (
                    <div
                      className={`ml-7 text-sm ${index === 0 ? "" : "mt-10"}`}
                    >
                      {menu.heading}
                    </div>
                  )
                ) : (
                  <div className={`ml-7 text-sm ${index === 0 ? "" : "mt-10"}`}>
                    {menu.heading}
                  </div>
                )}
                <div>
                  {menu.items
                    .filter((item) => {
                      // Filter out items based on user's role
                      if (session) {
                        if (session?.user?.role === "user") {
                          // Exclude items based on user's role
                          return (
                            item.path !== "/datapartition" &&
                            item.path !== "/nodegraph" &&
                            item.path !== "/import"
                          );
                        }
                      }
                      return true; // Include all other items
                    })
                    .map((item, itemIndex) => (
                      <ListItem
                        key={itemIndex}
                        className={`cursor-pointer mt-2 hover:bg-gray-200 hover:dark:bg-neutral-800 transition duration-300  rounded ${
                          pathname === item.path
                            ? "bg-gray-200 dark:bg-neutral-800 text-black dark:text-white  rounded"
                            : " dark:text-white text-black "
                        }`}
                        onClick={() => router.push(item.path)}
                      >
                        <div className="ml-10">
                          <span className="mr-2"> {item.icon}</span>
                          {item.text}
                        </div>
                      </ListItem>
                    ))}
                </div>
              </div>
            ))}

            <ListItem
              className={`cursor-pointer mt-2 hover:bg-gray-200 hover:dark:bg-gray-950 transition duration-300 rounded ${
                pathname === "/"
                  ? "bg-gray-50 dark:bg-black text-black dark:text-white rounded"
                  : "dark:text-white text-black"
              }`}
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              <div className="ml-10">
                <span className="mr-2">
                  <LogoutIcon />
                </span>
                Log out
              </div>
            </ListItem>
          </List>
        </Drawer>
        <Main open={open} className="bg-gray-50 dark:bg-zinc-950">
          <DrawerHeader />
          {children}
        </Main>
      </Box>
    </ThemeProvider>
  );
}
