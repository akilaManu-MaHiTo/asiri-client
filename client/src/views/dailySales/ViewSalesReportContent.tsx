import {
  Alert,
  AppBar,
  Box,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { DrawerContentItem } from "../../components/ViewDataDrawer";
import { format } from "date-fns";
import { useState } from "react";
import theme from "../../theme";
import useIsMobile from "../../customHooks/useIsMobile";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import { useSnackbar } from "notistack";
import useCurrentUser from "../../hooks/useCurrentUser";
import { Sales } from "../../api/salesApi";
import KeyboardReturnOutlinedIcon from '@mui/icons-material/KeyboardReturnOutlined';

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

function ViewSalesReportContent({
  dailySales,
  handleCloseDrawer,
}: {
  dailySales: Sales;
  handleCloseDrawer: () => void;
}) {
  const { isTablet, isMobile } = useIsMobile();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useCurrentUser();
  const [approveDialogOpen, setApproveDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };
  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: isTablet ? "column" : "row",
        padding: "1rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#fff",
          flex: { lg: 3, md: 1 },
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          padding: "0.5rem",
          borderRadius: "0.3rem",
        }}
      >
        <Stack
          sx={{
            p: "0.5rem",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          <DrawerContentItem
            label="Reference"
            value={dailySales._id}
            sx={{ flex: 1 }}
          />
          <DrawerContentItem
            label="Sales Date"
            value={
              dailySales.createdAt
                ? format(new Date(dailySales.createdAt), "yyyy-MM-dd")
                : "N/A"
            }
            sx={{ flex: 1 }}
          />
          <DrawerContentItem
            label="Group Number"
            value={dailySales.groupNo}
            sx={{ flex: 1 }}
          />
        </Stack>
        <AppBar
          position="static"
          sx={{ backgroundColor: "var(--app-headers)" }}
        >
          <Tabs
            value={activeTab}
            onChange={handleChange}
            indicatorColor="secondary"
            // TabIndicatorProps={{
            //   style: { backgroundColor: "var(--pallet-blue)", height: "3px" },
            // }}
            // sx={{
            //   backgroundColor: "var(--pallet-lighter-grey)",
            //   color: "var(--pallet-blue)",
            // }}
            textColor="inherit"
            variant="scrollable"
            scrollButtons={true}
          >
            <Tab
              label={
                <Box
                  sx={{
                    color: "var(--pallet-blue)",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <TextSnippetIcon
                    fontSize="small"
                    sx={{ color: "var(--text-color)" }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ ml: "0.3rem", color: "var(--text-color)" }}
                  >
                    Daily Sale Report
                  </Typography>
                </Box>
              }
              {...a11yProps(0)}
            />
            <Tab
              label={
                <Box
                  sx={{
                    color: "var(--pallet-blue)",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <KeyboardReturnOutlinedIcon
                    fontSize="small"
                    sx={{ color: "var(--text-color)" }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ ml: "0.3rem", color: "var(--text-color)" }}
                  >
                    Return Packets
                  </Typography>
                </Box>
              }
              {...a11yProps(1)}
            />
          </Tabs>
        </AppBar>
        <TabPanel value={activeTab} index={0} dir={theme.direction}>
          <Stack display={"flex"} flexDirection={isMobile ? "column" : "row"}>
            <Box flex={1}>
              <DrawerContentItem
                label="Sales Packets"
                value={dailySales.noOfPackets}
              />
              <DrawerContentItem
                label="Unit Price"
                value={dailySales.unitPrice}
              />
              <DrawerContentItem
                label="Total Price"
                value={dailySales.totalPrice.toFixed(2)}
              />
            </Box>
            <Box flex={1}>
              <DrawerContentItem
                label="Market Name"
                value={dailySales.marketName}
              />
              <DrawerContentItem
                label="Sales Price"
                value={dailySales.salesPrice}
              />
              <DrawerContentItem
                label="Sales Total Price"
                value={dailySales.salesTotalPrice.toFixed(2)}
              />
            </Box>
          </Stack>
        </TabPanel>
        <TabPanel value={activeTab} index={1} dir={theme.direction}>
          <DrawerContentItem
            label="Return Packets"
            value={dailySales.noOfReturnPackets}
          />
          <DrawerContentItem
            label="Return Packet Cost"
            value={dailySales.totalReturnPrice.toFixed(2)}
          />
        </TabPanel>
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: { lg: 1, md: 1 },
          flexDirection: "column",
          backgroundColor: "#fff",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          padding: "1rem",
          borderRadius: "0.3rem",
          marginY: isTablet ? "0.5rem" : 0,
          marginLeft: isTablet ? 0 : "0.5rem",
          height: "fit-content",
        }}
      >
        <DrawerContentItem
          label="Sub Total"
          value={(dailySales.totalPrice - dailySales.totalReturnPrice).toFixed(
            2
          )}
        />
      </Box>
    </Stack>
  );
}

export default ViewSalesReportContent;
