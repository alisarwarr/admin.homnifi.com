//REACT
import { useEffect, useRef, useState } from 'react';
//MATERIAL-UI
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import useMediaQuery from '@mui/material/useMediaQuery';
//REDUX-TOOLKIT
import { useSelector, useDispatch } from 'react-redux';
import { selectDrawerWidth, selectDrawerOpen, setDrawerWidth, setDrawerOpen } from '../../store/drawer/drawerSlice';
import { selectUser, selectUserSlice } from '../../store/user/userSlice';
import { handleTabChange } from '../../store';
//ROUTER-DOM
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
//COMPONENTS
import Header from '../Header';
//UTILS
import { DrawerOption, allDrawerOptions } from '../../utils/drawerOptions';
import Menu from '../Menu';
import { useNotificationsActions } from '../../store/notifications/notificationsAction';
import { homnifiLogo } from '../../images';


export default function Layout(): JSX.Element {
  const drawerWidth = useSelector(selectDrawerWidth);
  const drawerOpen = useSelector(selectDrawerOpen);
  const { accessToken } = useSelector(selectUserSlice);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleWidthChange = (newWidth: number) => dispatch(setDrawerWidth(newWidth));
  const handleOpenChange = (newOpen: boolean) => {
    dispatch(setDrawerOpen(newOpen));
  };

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })<{
    open?: boolean;
  }>(({ theme, open }) => ({
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
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    // background: '#000',
  }));

  const screen640 = useMediaQuery('(min-width:640px)');
  const screen900 = useMediaQuery('(min-width:900px)');
  const screen1024 = useMediaQuery('(min-width:1024px)');
  const screen1280 = useMediaQuery('(min-width:1280px)');
  const screen1536 = useMediaQuery('(min-width:1536px)');
  useEffect(() => {
    let width = 187;
    if (screen1536) width = 235;
    else if (screen1280) width = 215;
    else if (screen1024) width = 200;
    else if (screen900) width = 230;

    handleWidthChange(width);
  }, [screen900, screen1024, screen1280, screen1536]);

  const location = useLocation();
  const navigate = useNavigate();

  // detect click outside drawer
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const [isClickedLinesButton, setIsClickedLinesButton] = useState<boolean>(false);

  useEffect(() => {
    const handleClickOutsideDrawer = (event: any) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        if (isClickedLinesButton) {
          handleOpenChange(true);
        } else {
          handleOpenChange(false);
        }
        setIsClickedLinesButton(false);
      }
    };

    window.addEventListener('click', handleClickOutsideDrawer);

    return () => {
      window.removeEventListener('click', handleClickOutsideDrawer);
    };
  }, [drawerOpen, isClickedLinesButton]);

  // useEffect(() => {
  //   if (!accessToken) {
  //     navigate('/auth/signin');
  //   }
  // }, [accessToken]);

  useEffect(() => {
    handleTabChange(location.pathname);
  }, [location]);

  const { getNotifications } = useNotificationsActions();

  const appBarMargin = drawerWidth + 10;

  const darkTheme = createTheme({
    typography: {
      fontFamily: 'Poppins, sans-serif !important',
      fontWeightBold: '400 !important',
    },
    palette: {
      primary: {
        main: '#1B9FDA',
      },
      secondary: {
        main: '#1B9FDA',
      },
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="flex ">
        <Drawer
          disableScrollLock={true}
          anchor="left"
          variant={!screen640 ? 'temporary' : 'persistent'}
          open={!screen640 ? drawerOpen : true}
          sx={{
            padding: '0px !important',
            width: drawerWidth,
            '& .MuiPaper-root': { padding: '0px !important' },
            '& .MuiDrawer-paper': {
              padding: '0px !important',
              width: drawerWidth,
              boxSizing: 'border-box',
              // color: "white",
              background: '#FFF',
              overflowX: 'hidden',
              scrollbarColor: 'transparent transparent',
              '&::-webkit-scrollbar': { width: '0' },
              borderRight: '1px solid #f0f0f0',
            },
          }}
        >
          <DrawerHeader className="flex items-center justify-center z-[1] mt-2 h-10">
            <img
              onClick={() => navigate('/')}
              src={homnifiLogo}
              alt="Homnifi Logo"
              className="z-[1] w-32 cursor-pointer"
            />
          </DrawerHeader>
          <div ref={drawerRef}>
            <div className="pr-6 h-full">
              {allDrawerOptions

                .map((item: any, index: number) => (
                  <div key={index}>
                    {index < allDrawerOptions.length && (
                      <>
                        {item.options.map((menu: DrawerOption) => {
                          return <Menu key={menu.key} menu={menu} />;
                        })}
                      </>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </Drawer>
        <div className="w-full overflow-hidden flex flex-col">
          <div className="bg-white py-2 border-b border-graySecondary">
            <div className="">
              <Header
                handleDrawer={() => {
                  handleOpenChange(true);
                  setIsClickedLinesButton(true);
                }}
              />
            </div>
          </div>
          <div className="flex-grow py-4 px-2 bg-pageBackground">
            <Outlet />

          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
