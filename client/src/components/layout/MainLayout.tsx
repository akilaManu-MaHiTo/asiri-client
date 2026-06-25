import * as React from "react";
import { ReactNode } from "react";

import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Alert,
  Badge,
  Button,
  Collapse,
  Drawer as MobileDrawer,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router";
import { SidebarItem, sidebarItems } from "./SideBarItems";
import theme from "../../theme";
import useIsMobile from "../../customHooks/useIsMobile";
import LogoutIcon from "@mui/icons-material/Logout";
import DeleteConfirmationModal from "../DeleteConfirmationModal";
import { useMemo, useState } from "react";
import { useSnackbar } from "notistack";
// import { PermissionKeysObject } from "../../views/Administration/SectionList";
import useCurrentUser from "../../hooks/useCurrentUser";
import "./MainLayout.css";
// import ViewUserContent from "../../views/Administration/ViewUserProfileContent";
// import ViewProfileDataDrawer, {
//   DrawerProfileHeader,
// } from "../ViewProfileDataDrawer";
// import ProfileImage from "../ProfileImageComponent";
import { useQuery } from "@tanstack/react-query";

// import { getOrganization } from "../../api/OrganizationSettings/organizationSettingsApi";

import groupLogo from "../../assets/asiri-logo.png";
const drawerWidth = 265;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: 0,
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
  [theme.breakpoints.down("md")]: {
    width: "100%", // Ensure full width on mobile
    marginLeft: 0, // Reset margin on mobile
  },
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

interface Props {
  children: ReactNode | ReactNode[];
}

export default function MainLayout({ children }: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = React.useState(isMobile ? false : true);
  const { user } = useCurrentUser();
  const [openViewProfileDrawer, setOpenViewProfileDrawer] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [openEditUserRoleDialog, setOpenEditUserRoleDialog] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const toggleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        open={open}
        sx={{
          backgroundColor: "#fff",
        }}
      >
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                aria-label="open drawer"
                onClick={toggleDrawerOpen}
                edge="start"
                sx={[
                  {
                    color: "var(--text-color)",
                    marginRight: 3,
                  },
                  open && !isMobile && { display: "none" },
                ]}
              >
                <MenuIcon />
              </IconButton>
              <Box>
                <img
                  src={groupLogo}
                  alt="logo"
                  height={"35em"}
                  style={{ marginTop: "5px" }}
                />
              </Box>
            </Box>
            {!isMobile && (
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <Typography
                  variant="subtitle1"
                  noWrap
                  component="div"
                  sx={{
                    color: "var(--text-color)",
                    display: "flex",
                    marginRight: "0.5rem",
                  }}
                >
                  Monitor and Manage
                </Typography>
                <Typography
                  variant="subtitle1"
                  noWrap
                  component="div"
                  sx={{ color: "#000", display: "flex" }}
                >
                  <span
                    className="slider-text"
                    style={{ fontWeight: 600, color: "var(--primary-light)" }}
                  >
                    Economy
                  </span>
                  <span
                    className="slider-text"
                    style={{ fontWeight: 600, color: "var(--primary-light)" }}
                  >
                    Inventory
                  </span>
                  <span
                    className="slider-text"
                    style={{ fontWeight: 600, color: "var(--primary-light)" }}
                  >
                    Employee
                  </span>
                </Typography>
              </Box>
            )}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {/* {!isMobile && (
                <>
                  <IconButton
                    size="small"
                    sx={[
                      {
                        color: "#024271",
                        marginRight: "12px",
                      },
                    ]}
                  >
                    <GridViewIcon sx={{ fontSize: "1.6rem" }} />
                  </IconButton>

                  <IconButton
                    size="small"
                    sx={[
                      {
                        color: "#024271",
                        marginRight: "14px",
                      },
                    ]}
                  >
                    <Badge variant="dot" color="success">
                      <MailOutlineIcon sx={{ fontSize: "1.6rem" }} />
                    </Badge>
                  </IconButton>
                </>
              )} */}
              {/* <Avatar
                sx={{
                  bgcolor: "var(--pallet-orange)",
                  height: "2rem",
                  width: "2rem",
                  cursor: "pointer",
                }}
                onClick={() => setOpenViewProfileDrawer(true)}
              >
                {user?.name?.charAt(0).toUpperCase()}
              </Avatar> */}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {isMobile ? (
        <MobileDrawer
          variant="temporary"
          open={open}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          PaperProps={{
            sx: {
              backgroundColor: "var(--primary-color)",
              color: "#fff",
              elevation: 2,
            },
          }}
        >
          <DrawerContent handleDrawerClose={handleDrawerClose} />
        </MobileDrawer>
      ) : (
        <Drawer
          variant="permanent"
          open={open}
          PaperProps={{
            sx: {
              backgroundColor: "var(--primary-color)",
              color: "#fff",
              elevation: 2,
            },
          }}
        >
          <DrawerContent handleDrawerClose={handleDrawerClose} />
        </Drawer>
      )}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}

const DrawerContent = ({
  handleDrawerClose,
}: {
  handleDrawerClose: () => void;
}) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const { user } = useCurrentUser();

  //   console.log(userPermissionObject);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Box>
          <DrawerHeader sx={{ justifyContent: "flex-start" }}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronLeftIcon
                  sx={{
                    color: "var(--primary-light)",
                  }}
                />
              ) : (
                <ChevronLeftIcon
                  sx={{
                    color: "var(--primary-light)",
                  }}
                />
              )}
            </IconButton>

            <Typography
              variant="subtitle1"
              noWrap
              component="div"
              sx={{ color: "var(--primary-light)" }}
            >
              Asiri Mushrooms
            </Typography>
          </DrawerHeader>
          <Divider
            sx={{
              marginBottom: "1rem",
              backgroundColor: "var(--secondary-color)",
            }}
          />
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            paddingLeft: 0,
            overflowX: "hidden",
          }}
        >
          {sidebarItems.map((item, i) => {
            if (false) return null;

            if (item?.headline) {
              return (
                <Typography
                  key={`headline-${item.headline}-${i}`}
                  variant="body2"
                  sx={{
                    color: "var(--text-light)",
                    padding: "0.5rem 1rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    marginTop: "0.5rem",
                  }}
                >
                  {item.headline}
                </Typography>
              );
            }

            if (item.nestedItems) {
              return (
                <Box
                  sx={{ marginLeft: "1rem" }}
                  key={`nested-${item.href ?? item.title}-${i}`}
                >
                  <NestedItem
                    item={item}
                    handleDrawerClose={handleDrawerClose}
                    //   userPermissionObject={true}
                  />
                </Box>
              );
            }
            return (
              <ListItem
                key={`item-${item.href ?? item.title ?? i}-${i}`}
                disableGutters
                sx={{ paddingY: "3px", marginLeft: "1rem" }}
              >
                <LinkButton
                  to={item.href}
                  icon={item.icon}
                  title={item.title}
                  disabled={item.disabled}
                  handleDrawerClose={handleDrawerClose}
                />
              </ListItem>
            );
          })}

          <Divider
            sx={{ backgroundColor: "var(--pallet-grey)", marginTop: "1rem" }}
          />
          <Button
            sx={{
              textTransform: "capitalize",
              marginLeft: "1rem",
              marginY: "1rem",
              color: "var(--primary-light)",
              width: "90%",
              justifyContent: "flex-start",
              paddingLeft: "1rem",
              borderRadius: "0.5rem",
            }}
            startIcon={<LogoutIcon />}
            onClick={() => setLogoutDialogOpen(true)}
          >
            Log Out
          </Button>
        </Box>
        <Box
          sx={{
            borderTop: "1px solid rgba(255, 255, 255, 0.12)",
            px: 2,
            py: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            backgroundColor: "rgba(255, 255, 255, 0.04)",
          }}
        >
          <Typography
            variant="overline"
            sx={{
              color: "#796e6e",
              fontWeight: 600,
              letterSpacing: "0.08em",
            }}
          >
           App Version 1.0.1
          </Typography>
        </Box>
      </Box>
      {logoutDialogOpen && (
        <DeleteConfirmationModal
          open={logoutDialogOpen}
          title="Log Out Confirmation"
          customDeleteButtonText="Log Out Now"
          customDeleteButtonIon={<LogoutIcon />}
          content={
            <>
              Are you sure you want to log out of the application?
              <Alert severity="warning" style={{ marginTop: "1rem" }}>
                You will be logged out of the application and will need to log
                in with credentials again to access your account.
              </Alert>
            </>
          }
          handleClose={() => setLogoutDialogOpen(false)}
          deleteFunc={async () => {
            localStorage.removeItem("token");
            navigate("/");
            window.location.reload();
          }}
          onSuccess={() => {
            setLogoutDialogOpen(false);
            enqueueSnackbar("Logged Out Successfully!", {
              variant: "success",
            });
          }}
          handleReject={() => {
            setLogoutDialogOpen(false);
          }}
        />
      )}
    </>
  );
};

const NestedItem = React.memo(
  ({
    item,
    handleDrawerClose,
  }: // userPermissionObject,
  {
    item: SidebarItem;
    handleDrawerClose: () => void;
    // userPermissionObject: PermissionKeysObject;
  }) => {
    const [open, setOpen] = React.useState(item.open);
    const isAllItemsHidden = useMemo(() => {
      const checkNestedItems = (nestedItems: SidebarItem[]) => {
        return nestedItems.every((nestedItem) => {
          if (nestedItem.nestedItems) {
            return checkNestedItems(nestedItem.nestedItems);
          }
          return false;
        });
      };

      return checkNestedItems(item.nestedItems);
    }, [item.nestedItems]);

    if (isAllItemsHidden) return null;

    return (
      <React.Fragment key={`nested-fragment-${item.href ?? item.title}`}>
        <Button
          onClick={() => setOpen((o) => !o)}
          endIcon={open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          sx={{
            fontSize: "0.8rem",
            paddingY: "0.2rem",
            alignItems: "center",
            marginY: "0.1rem",
          }}
          disabled={item.disabled}
        >
          <div
            style={{
              marginRight: "0.5rem",
              marginBottom: -4,
              color: "#000",
            }}
          >
            {item.icon}
          </div>
          <Typography
            variant="body2"
            sx={{
              textTransform: "capitalize",
              color: "#000",
            }}
          >
            {item.title}
          </Typography>
        </Button>
        <Collapse in={open} unmountOnExit>
          <List>
            {item.nestedItems.map((item, nestedIndex) => {
              if (item?.accessKey && false) return null;

              if (item.nestedItems) {
                return (
                  <Box
                    key={`nested-box-${item.href ?? item.title ?? nestedIndex}`}
                    sx={{ marginLeft: "0.5rem" }}
                  >
                    <NestedItem
                      item={item}
                      handleDrawerClose={handleDrawerClose}
                      //   userPermissionObject={userPermissionObject}
                    />
                  </Box>
                );
              }

              return (
                <ListItem
                  disableGutters
                  key={`nested-item-${item.href ?? item.title ?? nestedIndex}`}
                  sx={{ paddingY: "3px", marginLeft: "0.5rem" }}
                >
                  <LinkButton
                    to={item.href}
                    icon={item.icon}
                    title={item.title}
                    disabled={item.disabled}
                    handleDrawerClose={handleDrawerClose}
                  />
                </ListItem>
              );
            })}
          </List>
        </Collapse>
      </React.Fragment>
    );
  }
);

interface LinkButtonProps {
  to: string;
  icon: any;
  title: string;
  disabled?: boolean;
  handleDrawerClose: () => void;
}

export const LinkButton = React.memo(
  ({ to, icon, title, disabled, handleDrawerClose }: LinkButtonProps) => {
    const { pathname } = useLocation();
    const { isTablet } = useIsMobile();

    const isMatch = to === "/" ? pathname === to : pathname.startsWith(to);

    return (
      <Link
        to={to}
        style={{ width: 220 }}
        onClick={() => {
          if (isTablet) handleDrawerClose();
        }}
      >
        <Button
          sx={{
            fontSize: "0.8rem",
            paddingY: "0.2rem",
            alignItems: "center",
            borderLeft: isMatch ? "4px solid var(--secondary-color)" : "none",
          }}
          disabled={disabled}
        >
          <div
            style={{
              marginRight: "0.4rem",
              marginBottom: -5,
              color: disabled
                ? "grey"
                : isMatch
                ? "var(--secondary-color)"
                : "#000000b9",
            }}
          >
            {icon}
          </div>
          <Typography
            variant="body2"
            sx={{
              textTransform: "capitalize",
              color: disabled
                ? "grey"
                : isMatch
                ? "var(--primary-light)"
                : "#000000b9",
            }}
          >
            {title}
          </Typography>
        </Button>
      </Link>
    );
  }
);
