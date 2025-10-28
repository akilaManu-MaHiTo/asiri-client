import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import LayersIcon from "@mui/icons-material/Layers";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import SpaIcon from "@mui/icons-material/Spa";
import ForestIcon from "@mui/icons-material/Forest";
import ScienceIcon from "@mui/icons-material/Science";
import EmergencyIcon from "@mui/icons-material/Emergency";
import ChangeHistoryIcon from "@mui/icons-material/ChangeHistory";
import FolderIcon from "@mui/icons-material/Folder";
import ConstructionIcon from "@mui/icons-material/Construction";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PollOutlinedIcon from "@mui/icons-material/PollOutlined";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import DatasetLinkedOutlinedIcon from "@mui/icons-material/DatasetLinkedOutlined";
import SentimentSatisfiedAltOutlinedIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import KeyIcon from "@mui/icons-material/Key";
// import { PermissionKeys } from "../../views/Administration/SectionList";
import { ReactNode } from "react";
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import PointOfSaleOutlinedIcon from '@mui/icons-material/PointOfSaleOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import FormatListNumberedOutlinedIcon from '@mui/icons-material/FormatListNumberedOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import MiscellaneousServicesOutlinedIcon from '@mui/icons-material/MiscellaneousServicesOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import KeyboardReturnOutlinedIcon from '@mui/icons-material/KeyboardReturnOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
export interface SidebarItem {
  title?: string;
  headline?: string;
  icon?: ReactNode;
  open?: boolean;
  href?: string;
  disabled?: boolean;
  accessKey?: string;
  nestedItems?: {
    title: string;
    href: string;
    icon: ReactNode;
    accessKey?: string;
    open?: boolean;
    disabled?: boolean;
    nestedItems?: {
      accessKey?: string;
      title: string;
      href: string;
      icon: ReactNode;
      disabled?: boolean;
    }[];
  }[];
}

export const sidebarItems: Array<SidebarItem> = [
  {
    headline: "Main",
  },
  {
    title: "Dashboard",
    href: "/home",
    icon: <DashboardCustomizeOutlinedIcon fontSize="small" />,
    // accessKey: //  PermissionKeys.INSIGHT_VIEW,
  },
  {
    headline: "Daily Sales",
  },
  {
    title: "Daily Report",
    icon: <LightModeOutlinedIcon fontSize="small" />,
    href: "/sales/daily-report",
    // accessKey: //  PermissionKeys.ADMIN_USERS_VIEW, // need to add permission key
  },
  {
    title: "Monthly Report",
    icon: <CalendarTodayOutlinedIcon fontSize="small" />,
    href: "/sales/monthly-report",
    // accessKey: //  PermissionKeys.ADMIN_USERS_VIEW, // need to add permission key
  },
  {
    title: "Report History",
    icon: <AccessTimeOutlinedIcon fontSize="small" />,
    href: "/sales/report-history",
    // accessKey: //  PermissionKeys.ADMIN_USERS_VIEW, // need to add permission key
  },

  {
    headline: "Material Summary",
  },
  {
    title: "Material Request",
    icon: <AccessTimeOutlinedIcon fontSize="small" />,
    href: "/material/material-request",
  },
  
];
