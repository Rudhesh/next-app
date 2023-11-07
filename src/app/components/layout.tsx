"use client"
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import Image from 'next/image';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MultilineChartIcon from '@mui/icons-material/MultilineChart';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsPausedIcon from '@mui/icons-material/NotificationsPaused';
import StorageIcon from '@mui/icons-material/Storage';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {useRouter} from "next/navigation"
import {usePathname} from "next/navigation"
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Avatar, Button } from '@mui/material';
import ThemeButton from './ThemeButton';
import { ThemeProvider } from 'next-themes'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import TranslateIcon from '@mui/icons-material/Translate';
import { deepOrange } from '@mui/material/colors';


const menuItems = [
  {
    heading: 'HOME',
    items: [
      { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
      { text: 'Panel', icon: <MultilineChartIcon />, path: '/panel' },
    ],
  },
  {
    heading: 'VIEW',
    items: [
      { text: 'Search', icon: <SearchIcon />, path: '/search' },
      { text: 'Notification', icon: <NotificationsPausedIcon />, path: '/notification' },
    ],
  },
  {
    heading: 'CONFIGURATION',
    items: [
      { text: 'Data partition', icon: <StorageIcon />, path: '/datapartition' },
      { text: 'Node graph', icon: <WorkspacesIcon />, path: '/nodegraph' },
      { text: 'Import', icon: <ImportExportIcon />, path: '/import' },
    ],
  },
  {
    heading: 'MANAGEMENT',
    items: [
      { text: 'User', icon: <PersonIcon />, path: '/user' },
      // { text: 'Log out', icon: <LogoutIcon />, path: '/' },
    ],
  },
];


const drawerWidth = 240;
const appBarHeight = 45;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  height: appBarHeight, // Set the height here
  display: 'flex', // Use flex display
  justifyContent: 'center', // Center the content horizontally
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));



const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));







export default function Layout({ children }: any) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const router = useRouter();
  const pathname = usePathname();



  const handleDrawerOpen = () => {
 
      setOpen(true);
    
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const { data: session }: any = useSession();
const handleSignOut = async () => {
  await signOut({ callbackUrl: '/' });
  
};

if (!session) {
  // Redirect to the '/login' route if session is undefined
  router.push('/');
  return null; // Don't render anything in this case
}

 

  return (
    <ThemeProvider>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ backgroundColor: "#384D6C" }}>
      <Toolbar className="flex justify-between items-center">
    <div className="flex items-center">
        <IconButton onClick={handleDrawerClose}>
       
          {open ?   <MenuOpenIcon  style={{ color: 'white' }} />:null}
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon/>
          </IconButton>
        
{!open ?   <Image
                src="/logo-breitfuss(1).png"
                height={125}
                width={125}
                alt="Breitfuss Logo"
                
              /> :null}

</div>
             
              
              <div className="flex space-x-6">

     {         (session?.user?.role === "admin") ?
      <div
        className="cursor-pointer p-1 hover:bg-[#303f57] transition duration-300  rounded "
        onClick={() => router.push("/admin")}
      >
        Admin
      </div>: null }
      {         (session?.user?.role === "data-admin") ?
      <div
        className="cursor-pointer p-1 hover:bg-[#303f57] transition duration-300  rounded "
        onClick={() => router.push("/dataAdmin")}
      >
        Data-Admin
      </div>:null}
      <div
        className="cursor-pointer p-1 hover:bg-[#303f57] transition duration-300  rounded "
        onClick={() => router.push("/dashboard")}
      >
        Dashboard
      </div>
      <div
        className="cursor-pointer p-1 hover-bg-[#303f57] transition duration-300 rounded"
        onClick={() => router.push("/panel")}
      >
        Panel
      </div>
      </div>
      <div className="flex space-x-4">
      <div
        className="cursor-pointer p-1 hover-bg-[#303f57] transition duration-300 rounded"
        onClick={() => router.push("/panel")}
      >
        <TranslateIcon/>
      </div>
      <div
        className="cursor-pointer p-1 hover-bg-[#303f57] transition duration-300 rounded"
        onClick={() => router.push("/panel")}
      >
        <NotificationsNoneIcon/>
      </div>

      <div
        className="cursor-pointer  hover-bg-[#303f57] transition duration-300 rounded"
        onClick={() => router.push("/panel")}
      >
        <Avatar sx={{ bgcolor: deepOrange[500], width: 34, height: 34 }}>R</Avatar>

      </div>
      

      
      
      
    </div>
    
        </Toolbar>
        
      </AppBar>
    
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader className="bg-[#384D6C] flex flex-col" >
        <Image
                src="/logo-breitfuss(1).png"
                height={125}
                width={125}
                alt="Breitfuss Logo"
                className="mb-7"
              />

         
        </DrawerHeader>
       
        

        <List className="bg-[#384D6C] text-white flex flex-col text-xs h-screen">
          <div className="mb-10 flex flex-col items-center">
            <AccountCircleIcon style={{ fontSize: '66px' }} />
            {!session ? <div>no name</div>: <> <Typography variant="subtitle1" className="text-white">
            {session.user?.realname} 
            
            </Typography>
            <Typography className="text-white text-ls">
            
            {session.user?.role}
            </Typography></>
            }
           
          
          
          </div>
          {menuItems.map((menu, index) => (
            <div  key={index} >
            {session?.user?.role === 'user' ? menu.heading !== 'CONFIGURATION' && (
        <div className={`ml-7 text-sm ${index === 0 ? '' : 'mt-10'}`}>
          {menu.heading}
        </div>
      ): <div className={`ml-7 text-sm ${index === 0 ? '' : 'mt-10'}`}>
          {menu.heading}
        </div>}
          <div>
          {menu.items
          .filter((item) => {
            // Filter out items based on user's role
            if (session) {
              if (session?.user?.role === 'user') {
                // Exclude items based on user's role
                return (
                  item.path !== '/datapartition' &&
                  item.path !== '/nodegraph' &&
                  item.path !== '/import'
                );
              }
            }
            return true; // Include all other items
          })
            .map((item, itemIndex) => (
             
              <ListItem
              key={itemIndex}
              className={`cursor-pointer mt-2 hover:bg-[#303f57] transition duration-300  rounded ${
                pathname === item.path ? 'bg-[#303f57] text-gray-100 rounded' : 'text-white'
              }`}
              onClick={() => router.push(item.path)}
            >
                <div className='ml-10'>
                 <span  className="mr-2"> {item.icon}</span>
                  {item.text}
                </div>
              </ListItem>
             
            ))}
            
            </div>
            
            </div> 
          ))}
          
                <ListItem
              
              className={`cursor-pointer mt-2 hover:bg-[#303f57] transition duration-300  rounded ${
                pathname === "/" ? 'bg-[#303f57] text-gray-100 rounded' : 'text-white'
              }`}
              onClick={handleSignOut}
            >
                <div className='ml-10'>
                 <span  className="mr-2"> <LogoutIcon /></span>
                 Log out
                </div>
              </ListItem>
        </List>
       
      </Drawer>
      <Main open={open}>
        
        <DrawerHeader />
     {children}
      </Main>
    
    </Box>
    </ThemeProvider>
  );
}
