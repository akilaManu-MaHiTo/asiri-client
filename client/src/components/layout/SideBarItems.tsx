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
    icon: <PointOfSaleOutlinedIcon fontSize="small" />,
    href: "/sales/daily-report",
    // accessKey: //  PermissionKeys.ADMIN_USERS_VIEW, // need to add permission key
  },
  {
    title: "Returned Items",
    icon: <KeyboardReturnOutlinedIcon fontSize="small" />,
    href: "/sales/returned-items",
    // accessKey: //  PermissionKeys.ADMIN_USERS_VIEW, // need to add permission key
  },
  // {
  //   title: "Report Page",
  //   icon: <AssessmentOutlinedIcon fontSize="small" />,
  //   href: "/admin/users",
  //   // accessKey: //  PermissionKeys.ADMIN_USERS_VIEW,
  // },
  {
    headline: "Material Summary",
  },
  {
    title: "Material Report",
    icon: <CategoryOutlinedIcon fontSize="small" />,
    href: "/material/material-report",
    open: false,
    disabled: false,
  },
  // {
  //   title: "Inventory List",
  //   href: "/sustainability",
  //   icon: <FormatListNumberedOutlinedIcon fontSize="small" />,
  //   disabled: false,
  // },
  // {
  //   headline: "Admin Section",
  // },
  // {
  //   title: "Users Management",
  //   href: "/hazard-risk",
  //   icon: <PersonOutlineOutlinedIcon fontSize="small" />,
  // },
  // {
  //   title: "Role Management",
  //   href: "/hazard-risk",
  //   icon: <PersonOutlineOutlinedIcon fontSize="small" />,
  // },
  // {
  //   title: "App Settings",
  //   href: "/accident-incident",
  //   icon: <MiscellaneousServicesOutlinedIcon fontSize="small" />,
  // },
  // {
  //   title: "Document",
  //   href: "/document",
  //   icon: <FolderIcon fontSize="small" />,
  //   // accessKey: //  PermissionKeys.DOCUMENT_REGISTER_VIEW,
  // },
  // {
  //   title: "Equipment MNG",
  //   href: "/equipment-mng",
  //   icon: <ConstructionIcon fontSize="small" />,
  //   disabled: true,
  //   nestedItems: [
  //     {
  //       title: "Equipment",
  //       href: "/equipment-mng/equipment",
  //       icon: <SubdirectoryArrowRightIcon fontSize="small" />,
  //       nestedItems: [
  //         {
  //           title: "Register",
  //           href: "/equipment-mng/equipment/register",
  //           icon: <SubdirectoryArrowRightIcon fontSize="small" />,
  //         },
  //         {
  //           title: "Create",
  //           href: "/equipment-mng/equipment/create",
  //           icon: <SubdirectoryArrowRightIcon fontSize="small" />,
  //         },
  //       ],
  //     },
  //     {
  //       title: "Client",
  //       href: "/equipment-mng/client",
  //       icon: <SubdirectoryArrowRightIcon fontSize="small" />,
  //     },
  //     {
  //       title: "GEO Tag",
  //       href: "/equipment-mng/geo-tag",
  //       icon: <SubdirectoryArrowRightIcon fontSize="small" />,
  //     },
  //     {
  //       title: "Inspection Template",
  //       href: "/equipment-mng/inspection-template",
  //       icon: <SubdirectoryArrowRightIcon fontSize="small" />,
  //     },
  //   ],
  // },
  // {
  //   title: "Occupational Health",
  //   href: "/occupational-health",
  //   icon: <FavoriteBorderIcon fontSize="small" />,
  //   disabled: false,
  //   nestedItems: [
  //     {
  //       title: "Dashboard",
  //       href: "/occupational-health/dashboard",
  //       icon: <SubdirectoryArrowRightIcon fontSize="small" />,
  //       // accessKey: //  PermissionKeys.OCCUPATIONAL_HEALTH_DASHBOARD_VIEW,
  //     },
  //     {
  //       title: "Clinical Suite",
  //       href: "/occupational-health/clinical-suite",
  //       icon: <SubdirectoryArrowRightIcon fontSize="small" />,
  //       nestedItems: [
  //         {
  //           title: "Patient Register",
  //           href: "/occupational-health/clinical-suite/patient-register",
  //           icon: <SubdirectoryArrowRightIcon fontSize="small" />,
  //           // accessKey:
  //             //  PermissionKeys.OCCUPATIONAL_HEALTH_CLINICAL_SUITE_PATIENT_REGISTER_VIEW,
  //         },
  //         {
  //           title: "Consultation",
  //           href: "/occupational-health/clinical-suite/consultation",
  //           icon: <SubdirectoryArrowRightIcon fontSize="small" />,
  //           // accessKey:
  //             //  PermissionKeys.OCCUPATIONAL_HEALTH_CLINICAL_SUITE_CONSULTATION_VIEW,
  //         },
  //         {
  //           title: "Medicine Stock",
  //           href: "/occupational-health/clinical-suite/medicine-stock",
  //           icon: <SubdirectoryArrowRightIcon fontSize="small" />,
  //           // accessKey:
  //             //  PermissionKeys.OCCUPATIONAL_HEALTH_CLINICAL_SUITE_MEDICINE_STOCK_VIEW,
  //         },
  //         {
  //           title: "Pharmacy Queue",
  //           href: "/occupational-health/clinical-suite/pharmacy-queue",
  //           icon: <SubdirectoryArrowRightIcon fontSize="small" />,
  //           // accessKey:
  //             //  PermissionKeys.OCCUPATIONAL_HEALTH_CLINICAL_SUITE_PHARMACY_QUEUE_VIEW,
  //         },
  //       ],
  //     },
  //     {
  //       title: "Medicine Inventory",
  //       href: "/medicines-inventory",
  //       icon: <SubdirectoryArrowRightIcon fontSize="small" />,
  //       nestedItems: [
  //         {
  //           title: "Medicine Request",
  //           href: "/occupational-health/medicines-inventory/medicine-request",
  //           icon: <SubdirectoryArrowRightIcon fontSize="small" />,
  //           // accessKey:
  //             //  PermissionKeys.OCCUPATIONAL_HEALTH_MEDICINE_INVENTORY_MEDICINE_REQUEST_VIEW,
  //         },
  //         {
  //           title: "Purchase & Inventory",
  //           href: "/occupational-health/medicines-inventory/purchase-inventory",
  //           icon: <SubdirectoryArrowRightIcon fontSize="small" />,
  //           // accessKey:
  //             //  PermissionKeys.OCCUPATIONAL_HEALTH_MEDICINE_INVENTORY_PURCHASE_INVENTORY_VIEW,
  //         },
  //         {
  //           title: "Transaction",
  //           href: "/occupational-health/medicines-inventory/transaction",
  //           icon: <SubdirectoryArrowRightIcon fontSize="small" />,
  //           // accessKey:
  //             //  PermissionKeys.OCCUPATIONAL_HEALTH_MEDICINE_INVENTORY_TRANSACTION_VIEW,
  //         },
  //         {
  //           title: "Assigned Tasks",
  //           href: "/occupational-health/medicines-inventory/assigned-tasks",
  //           icon: <SubdirectoryArrowRightIcon fontSize="small" />,
  //           // accessKey:
  //             //  PermissionKeys.OCCUPATIONAL_HEALTH_MEDICINE_INVENTORY_ASSIGNED_TASKS_VIEW,
  //         },
  //       ],
  //     },
  //     {
  //       title: "Medical Records",
  //       href: "/occupational-health/medical-records",
  //       icon: <SubdirectoryArrowRightIcon fontSize="small" />,
  //       nestedItems: [
  //         {
  //           title: "Maternity Register",
  //           href: "/occupational-health/medical-records/maternity-register",
  //           icon: <SubdirectoryArrowRightIcon fontSize="small" />,
  //           // accessKey:
  //             //  PermissionKeys.OCCUPATIONAL_HEALTH_MEDICAL_RECORDS_MATERNITY_REGISTER_VIEW,
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   headline: "Social Apps",
  // },
  // {
  //   title: "Grievance",
  //   href: "/grievance",
  //   icon: <ErrorOutlineOutlinedIcon fontSize="small" />,
  //   nestedItems: [
  //     {
  //       title: "Dashboard",
  //       href: "/grievance/dashboard",
  //       icon: <SubdirectoryArrowRightIcon fontSize="small" />,
  //       // accessKey: //  PermissionKeys.GRIEVANCE_DASHBOARD_VIEW,
  //     },
  //     {
  //       title: "Register",
  //       href: "/grievance/register",
  //       icon: <SubdirectoryArrowRightIcon fontSize="small" />,
  //       // accessKey: //  PermissionKeys.GRIEVANCE_REGISTER_VIEW,
  //     },
  //     {
  //       title: "Assigned Tasks",
  //       href: "/grievance/assigned-tasks",
  //       icon: <SubdirectoryArrowRightIcon fontSize="small" />,
  //       // accessKey: //  PermissionKeys.GRIEVANCE_ASSIGNED_TASKS_VIEW,
  //     },
  //     {
  //       title: "Completed Tasks",
  //       href: "/grievance/completed-tasks",
  //       icon: <SubdirectoryArrowRightIcon fontSize="small" />,
  //       // accessKey: //  PermissionKeys.GRIEVANCE_COMPLETED_TASKS_VIEW,
  //     },
  //   ],
  // },
  // {
  //   title: "RAG",
  //   href: "/rag",
  //   icon: <SentimentSatisfiedAltOutlinedIcon fontSize="small" />,
  //   disabled: false,
  //   nestedItems: [
  //     {
  //       title: "Dashboard",
  //       href: "/rag/dashboard",
  //       icon: <SubdirectoryArrowRightIcon fontSize="small" />,
  //       // accessKey: //  PermissionKeys.RAG_DASHBOARD_VIEW,
  //     },
  //     {
  //       title: "Register",
  //       href: "/rag/register",
  //       icon: <SubdirectoryArrowRightIcon fontSize="small" />,
  //       // accessKey: //  PermissionKeys.RAG_REGISTER_VIEW,
  //     },
  //   ],
  // },
  // {
  //   title: "Engagement",
  //   href: "/engagement",
  //   icon: <DatasetLinkedOutlinedIcon fontSize="small" />,
  //   disabled: true,
  //   nestedItems: [
  //     {
  //       title: "History",
  //       href: "/engagement/history",
  //       icon: <SubdirectoryArrowRightIcon fontSize="small" />,
  //       // accessKey: //  PermissionKeys.ENGAGEMENT_REGISTER_VIEW,
  //     },
  //   ],
  // },
  // {
  //   title: "Attrition",
  //   href: "/attrition",
  //   icon: <PersonRemoveOutlinedIcon fontSize="small" />,
  //   disabled: false,
  //   nestedItems: [
  //     {
  //       title: "History",
  //       href: "/attrition/history",
  //       icon: <SubdirectoryArrowRightIcon fontSize="small" />,
  //       // accessKey: //  PermissionKeys.ATTRITION_REGISTER_VIEW,
  //     },
  //   ],
  // },
  // {
  //   title: "Satisfaction Survey",
  //   href: "/satisfaction-survey",
  //   icon: <PollOutlinedIcon fontSize="small" />,
  //   disabled: true,
  //   // accessKey: //  PermissionKeys.SATISFACTION_SURVEY_VIEW,
  // },
];
