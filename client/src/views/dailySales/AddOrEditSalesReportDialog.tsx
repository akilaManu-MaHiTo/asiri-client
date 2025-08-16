import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import theme from "../../theme";
import {
  AppBar,
  Autocomplete,
  Box,
  CircularProgress,
  Divider,
  IconButton,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import useIsMobile from "../../customHooks/useIsMobile";
import { Controller, useForm } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import { grey } from "@mui/material/colors";
import DatePickerComponent from "../../components/DatePickerComponent";
import CustomButton from "../../components/CustomButton";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { format } from "date-fns";
import { enqueueSnackbar } from "notistack";
import queryClient from "../../state/queryClient";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import { Sales } from "../../api/salesApi";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createMarket, getMarketlist, Market } from "../../api/marketApi";
import { createGroup, getGrouplist, Group } from "../../api/groupApi";
import KeyboardReturnOutlinedIcon from '@mui/icons-material/KeyboardReturnOutlined';

type DialogProps = {
  open: boolean;
  handleClose: () => void;
  defaultValues?: Sales;
  onSubmit?: (data: Sales) => void;
  isLoading: boolean;
};

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

export default function AddOrEditSalesReportDialog({
  open,
  handleClose,
  defaultValues,
  onSubmit,
  isLoading,
}: DialogProps) {
  const { isMobile, isTablet } = useIsMobile();
  const [addNewContactDialogOpen, setAddNewContactDialogOpen] = useState(false);
  const [addNewContactGroupDialogOpen, setAddNewContactGroupDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    reset,
  } = useForm<Sales>({
    defaultValues: {
      ...defaultValues,
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const marketName = watch("marketName");
  const { data: marketData } = useQuery({
    queryKey: ["market"],
    queryFn: getMarketlist,
  });
  const { data: groupData } = useQuery({
    queryKey: ["group"],
    queryFn: getGrouplist,
  });
  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    } else {
      reset();
    }
  }, [defaultValues, reset]);

  const resetForm = () => {
    reset();
  };

  const handleSubmitSalesReport = (data: Sales) => {
    const submitData: Partial<Sales> = data;
    onSubmit(submitData as Sales);
  };

  const AddNewObservationButton = (props) => (
    <li
      {...props}
      variant="contained"
      style={{
        backgroundColor: "var(--app-headers)",
        textTransform: "none",
        margin: "0.5rem",
        borderRadius: "0.3rem",
        display: "flex",
        flexDirection: "row",
      }}
      size="small"
      onMouseDown={() => {
        setAddNewContactDialogOpen(true);
      }}
    >
      <AddIcon sx={{ color: "var(--text-color)" }} />
      <Typography
        variant="body2"
        component="div"
        sx={{ color: "var(--text-color)" }}
      >
        Add New Market Name
      </Typography>
    </li>
  );

  const AddNewGroupNoButton = (props) => (
    <li
      {...props}
      variant="contained"
      style={{
        backgroundColor: "var(--app-headers)",
        textTransform: "none",
        margin: "0.5rem",
        borderRadius: "0.3rem",
        display: "flex",
        flexDirection: "row",
      }}
      size="small"
      onMouseDown={() => {
        setAddNewContactGroupDialogOpen(true);
      }}
    >
      <AddIcon sx={{ color: "var(--text-color)" }} />
      <Typography
        variant="body2"
        component="div"
        sx={{ color: "var(--text-color)" }}
      >
        Add New Group Number
      </Typography>
    </li>
  );

  const AddNewObservationTypeDialog = () => {
    const { register, handleSubmit } = useForm<Market>();

    const { mutate: createObservationTypeMutation } = useMutation({
      mutationFn: createMarket,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["market"] });
        enqueueSnackbar("Market Created Successfully!", {
          variant: "success",
        });
      },
      onError: () => {
        enqueueSnackbar(`Market Creation Failed`, {
          variant: "error",
        });
      },
    });

    const handleCreateObservationType = (market: Market) => {
      console.log("marketName:", market.name);
      createObservationTypeMutation(market);
      setAddNewContactDialogOpen(false);
    };

    return (
      <Dialog
        open={addNewContactDialogOpen}
        onClose={() => setAddNewContactDialogOpen(false)}
        fullScreen={isMobile}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          style: {
            backgroundColor: grey[50],
          },
          component: "form",
        }}
      >
        <DialogTitle
          sx={{
            paddingY: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" component="div">
            Add New Market Name
          </Typography>
          <IconButton
            aria-label="open drawer"
            onClick={() => setAddNewContactDialogOpen(false)}
            edge="start"
            sx={{
              color: "#024271",
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <TextField
              {...register("name", { required: true })}
              required
              id="name"
              label="Market Name"
              size="small"
              fullWidth
              sx={{ marginBottom: "0.5rem" }}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ padding: "1rem" }}>
          <Button
            onClick={() => setAddNewContactDialogOpen(false)}
            sx={{ color: "var(--pallet-blue)" }}
          >
            Cancel
          </Button>
          <CustomButton
            variant="contained"
            sx={{
              backgroundColor: "var(--button-color)",
            }}
            size="medium"
            onClick={handleSubmit(handleCreateObservationType)}
          >
            Add Market Name
          </CustomButton>
        </DialogActions>
      </Dialog>
    );
  };

  const AddNewGroupTypeDialog = () => {
    const { register, handleSubmit } = useForm<Group>();

    const { mutate: createObservationTypeMutation } = useMutation({
      mutationFn: createGroup,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["group"] });
        enqueueSnackbar("Group Created Successfully!", {
          variant: "success",
        });
      },
      onError: () => {
        enqueueSnackbar(`Group Creation Failed`, {
          variant: "error",
        });
      },
    });

    const handleCreateObservationType = (group: Group) => {
      console.log("marketName:", group.name);
      createObservationTypeMutation(group);
      setAddNewContactGroupDialogOpen(false);
    };

    return (
      <Dialog
        open={addNewContactGroupDialogOpen}
        onClose={() => setAddNewContactGroupDialogOpen(false)}
        fullScreen={isMobile}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          style: {
            backgroundColor: grey[50],
          },
          component: "form",
        }}
      >
        <DialogTitle
          sx={{
            paddingY: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" component="div">
            Add New Group Number
          </Typography>
          <IconButton
            aria-label="open drawer"
            onClick={() => setAddNewContactGroupDialogOpen(false)}
            edge="start"
            sx={{
              color: "#024271",
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <TextField
              {...register("name", { required: true })}
              required
              id="name"
              label="Group Number"
              size="small"
              fullWidth
              sx={{ marginBottom: "0.5rem" }}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ padding: "1rem" }}>
          <Button
            onClick={() => setAddNewContactGroupDialogOpen(false)}
            sx={{ color: "var(--pallet-blue)" }}
          >
            Cancel
          </Button>
          <CustomButton
            variant="contained"
            sx={{
              backgroundColor: "var(--button-color)",
            }}
            size="medium"
            onClick={handleSubmit(handleCreateObservationType)}
          >
            Add Group Number
          </CustomButton>
        </DialogActions>
      </Dialog>
    );
  };
  return (
    <Dialog
      open={open}
      onClose={() => {
        resetForm();
        handleClose();
      }}
      fullScreen={true}
      PaperProps={{
        style: {
          backgroundColor: grey[50],
        },
        component: "form",
      }}
    >
      
      <AddNewObservationTypeDialog />
      <AddNewGroupTypeDialog />
      <DialogTitle
        sx={{
          paddingY: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" component="div">
          {defaultValues ? "Edit Daily Report" : "Add Daily Report"}
        </Typography>
        <IconButton
          aria-label="open drawer"
          onClick={handleClose}
          edge="start"
          sx={{
            color: "var(--secondary-color)",
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Stack
          sx={{
            display: "flex",
            flexDirection: isTablet ? "column" : "row",
            padding: "1rem",
          }}
        >
          <Stack
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
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-end",
                flexDirection: "column",
                margin: "0.5rem",
              }}
            >
              <Typography variant="body2" component="div">
                <b>Date</b>
              </Typography>
              <Typography variant="body2" component="div">
                {format(new Date(), "dd MMM yyyy")}
              </Typography>
            </Box>
            <AppBar
              position="static"
              sx={{ backgroundColor: "var(--app-headers)" }}
            >
              <Tabs
                value={activeTab}
                onChange={handleChange}
                indicatorColor="secondary"
                // TabIndicatorProps={{
                //   style: {
                //     backgroundColor: "var(--button-color)",
                //     height: "3px",
                //   },
                // }}
                // sx={{
                //   backgroundColor: "var(--button-color)",
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
                {defaultValues && (
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
                )}
              </Tabs>
            </AppBar>
            <TabPanel value={activeTab} index={0} dir={theme.direction}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                }}
              >
                <Box sx={{ margin: "0.5rem", flex: 1 }}>
                  <Controller
                    control={control}
                    {...register("date", { required: true })}
                    name={"date"}
                    render={({ field }) => {
                      return (
                        <DatePickerComponent
                          onChange={(e) => field.onChange(e)}
                          value={
                            field.value ? new Date(field.value) : undefined
                          }
                          label="Packing Date"
                          error={errors?.date ? "Required" : ""}
                          disablePast={false}
                          disableFuture={true}
                        />
                      );
                    }}
                  />
                </Box>

                <Controller
                  name="groupNo"
                  control={control}
                  rules={{ required: "required" }}
                  defaultValue={defaultValues?.groupNo ?? 0}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      onChange={(_, value) => field.onChange(value)}
                      value={field.value || ""}
                      size="small"
                      noOptionsText={
                        <Typography
                          variant="body2"
                          color="inherit"
                          gutterBottom
                        >
                          No matching Items
                        </Typography>
                      }
                      options={[
                        ...(groupData?.length
                          ? groupData.map((group) => group.name)
                          : []),
                        "$ADD_NEW_ITEM",
                      ]}
                      renderOption={(props, option) =>
                        option === "$ADD_NEW_ITEM" ? (
                          <AddNewGroupNoButton {...props} />
                        ) : (
                          <li {...props} key={option}>
                            {option}
                          </li>
                        )
                      }
                      sx={{
                        flex: 1,
                        margin: "0.5rem",
                        marginTop: isTablet ? "0.5rem" : "1.8rem",
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={!!errors.groupNo}
                          helperText={errors.groupNo ? "Required" : ""}
                          label="Group Number"
                        />
                      )}
                    />
                  )}
                />


                <TextField
                  required
                  type="number"
                  id="unitPrice"
                  label="Unit Price"
                  error={!!errors.unitPrice}
                  helperText={errors.unitPrice ? "Required" : ""}
                  size="small"
                  sx={{
                    flex: 1,
                    margin: "0.5rem",
                    marginTop: isTablet ? "0.5rem" : "1.8rem",
                  }}
                  {...register("unitPrice", { required: true })}
                />

                <Controller
                  name="marketName"
                  control={control}
                  rules={{ required: "required" }}
                  defaultValue={defaultValues?.marketName ?? ""}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      onChange={(_, value) => field.onChange(value)}
                      value={field.value || ""}
                      size="small"
                      noOptionsText={
                        <Typography
                          variant="body2"
                          color="inherit"
                          gutterBottom
                        >
                          No matching Items
                        </Typography>
                      }
                      options={[
                        ...(marketData?.length
                          ? marketData.map((market) => market.name)
                          : []),
                        "$ADD_NEW_ITEM",
                      ]}
                      renderOption={(props, option) =>
                        option === "$ADD_NEW_ITEM" ? (
                          <AddNewObservationButton {...props} />
                        ) : (
                          <li {...props} key={option}>
                            {option}
                          </li>
                        )
                      }
                      sx={{
                        flex: 1,
                        margin: "0.5rem",
                        marginTop: isTablet ? "0.5rem" : "1.8rem",
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={!!errors.marketName}
                          helperText={errors.marketName ? "Required" : ""}
                          label="Market Name"
                        />
                      )}
                    />
                  )}
                />
              </Box>
              {marketName && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                  }}
                >
                  <TextField
                    required
                    type="number"
                    id="noOfPackets"
                    label="No Of Packets"
                    error={!!errors.noOfPackets}
                    helperText={errors.noOfPackets ? "Required" : ""}
                    size="small"
                    sx={{
                      flex: 1,
                      margin: "0.5rem",
                      marginTop: isTablet ? "0.5rem" : "1.8rem",
                    }}
                    {...register("noOfPackets", { required: true })}
                  />
                  <TextField
                    required
                    type="number"
                    id="salesPrice"
                    label="Sales Price"
                    error={!!errors.salesPrice}
                    helperText={errors.salesPrice ? "Required" : ""}
                    size="small"
                    sx={{
                      flex: 1,
                      margin: "0.5rem",
                      marginTop: isTablet ? "0.5rem" : "1.8rem",
                    }}
                    {...register("salesPrice", { required: true })}
                  />
                </Box>
              )}
            </TabPanel>
            <TabPanel value={activeTab} index={1} dir={theme.direction}>
              <TextField
                type="number"
                id="noOfReturnPackets"
                label="Return Packets"
                error={!!errors.noOfReturnPackets}
                helperText={
                  errors.noOfReturnPackets
                    ? errors.noOfReturnPackets.message
                    : ""
                }
                size="small"
                sx={{
                  width: isMobile ? "full" : "50%",
                  margin: "0.5rem",
                }}
                {...register("noOfReturnPackets", {
                  min: {
                    value: 0,
                    message: "Amount must be greater than 0",
                  },
                  max: {
                    value: defaultValues?.noOfPackets,
                    message: `Amount must be Less than ${defaultValues?.noOfPackets}`,
                  },
                })}
              />
            </TabPanel>
          </Stack>
        </Stack>
      </DialogContent>
      <Divider />
      <DialogActions sx={{ padding: "1rem" }}>
        <Button
          onClick={() => {
            resetForm();
            handleClose();
          }}
          sx={{ color: "var(--secondary-color)" }}
        >
          Cancel
        </Button>
        <CustomButton
          variant="contained"
          sx={{
            backgroundColor: "var(--button-color)",
          }}
          size="medium"
          onClick={handleSubmit((data) => {
            handleSubmitSalesReport(data);
          })}
        >
          {isLoading ? (
            <>
              Submitting...{" "}
              <CircularProgress size={20} sx={{ color: "white" }} />
            </>
          ) : defaultValues ? (
            "Update Changes"
          ) : (
            "Create Report"
          )}
        </CustomButton>
      </DialogActions>
    </Dialog>
  );
}
