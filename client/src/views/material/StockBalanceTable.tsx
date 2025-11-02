import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  LinearProgress,
  Stack,
  TableFooter,
  TablePagination,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import theme from "../../theme";
import PageTitle from "../../components/PageTitle";
import Breadcrumb from "../../components/BreadCrumb";
import { useMemo, useState } from "react";
import ViewDataDrawer, { DrawerHeader } from "../../components/ViewDataDrawer";
import AddIcon from "@mui/icons-material/Add";
import { format } from "date-fns";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";
import { useSnackbar } from "notistack";
import { useMutation, useQuery } from "@tanstack/react-query";
import queryClient from "../../state/queryClient";
import {
  createPackets,
  deletePacket,
  getDailyPacketReport,
  getDailyPacketTotal,
  getMonthlyPacketReport,
  getMonthlyPacketTotal,
  getPacketList,
  getPacketTotal,
  Sales,
  updatePacket,
} from "../../api/salesApi";
//import AddOrEditSalesReportDialog from "./AddOrEditSalesReportDialog";
import { dateFormatter } from "../../util/dateFormat.util";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Controller, useForm } from "react-hook-form";
import DatePickerComponent from "../../components/DatePickerComponent";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { generateMonthlySalesPDF } from "../../util/pdfGenerator";
//import ViewSalesReportContent from "./ViewSalesReportContent";

function DailyReportTable({
  isDailyReport,
  isMonthlyReport,
}: {
  isDailyReport: boolean;
  isMonthlyReport: boolean;
}) {
  const { enqueueSnackbar } = useSnackbar();
  const [openViewDrawer, setOpenViewDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Sales>(null);
  const [openAddOrEditDialog, setOpenAddOrEditDialog] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const {
    register,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const breadcrumbItems = [
    { title: "Home", href: "/home" },
    {
      title: `${
        isDailyReport ? "Daily " : isMonthlyReport ? " Monthly " : ""
      }Stock Balance`,
    },
  ];

  let beforeFormatDate = watch("date") || new Date();
  beforeFormatDate = new Date(beforeFormatDate);
  const formattedDate = dateFormatter(beforeFormatDate);

  //packet details
  const { data: packetData, isFetching: isPacketDataFetching } = useQuery({
    queryKey: ["packets"],
    queryFn: getPacketList,
  });

  const { data: dailyPacketData, isFetching: isPacketAssignedTaskData } =
    useQuery({
      queryKey: ["packet-daily-sales", formattedDate],
      queryFn: () => getDailyPacketReport(formattedDate),
    });

  const { data: monthlyPacketData, isFetching: isPacketApprovedTaskData } =
    useQuery({
      queryKey: ["packet-monthly-sales", formattedDate],
      queryFn: () => getMonthlyPacketReport(formattedDate),
    });

  //packet total details
  const { data: packetTotalData } = useQuery({
    queryKey: ["packet-total"],
    queryFn: getPacketTotal,
  });

  const { data: dailyPacketTotalData } = useQuery({
    queryKey: ["daily-packet-total", formattedDate],
    queryFn: () => getDailyPacketTotal(formattedDate),
  });

  const { data: monthlyPacketTotalData } = useQuery({
    queryKey: ["monthly-packet-total", formattedDate],
    queryFn: () => getMonthlyPacketTotal(formattedDate),
  });

  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );

  //create packet
  const { mutate: createPacketMutation, isPending: isPacketCreating } =
    useMutation({
      mutationFn: createPackets,
      onSuccess: () => {
        setSelectedRow(null);
        setOpenViewDrawer(false);
        setOpenAddOrEditDialog(false);
        queryClient.invalidateQueries({ queryKey: ["packets"] });
        queryClient.invalidateQueries({
          queryKey: ["daily-packet-total", formattedDate],
        });
        queryClient.invalidateQueries({
          queryKey: ["monthly-packet-total", formattedDate],
        });
        queryClient.invalidateQueries({
          queryKey: ["packet-monthly-sales", formattedDate],
        });
        queryClient.invalidateQueries({
          queryKey: ["packet-daily-sales", formattedDate],
        });
        queryClient.invalidateQueries({
          queryKey: ["packet-total"],
        });
        enqueueSnackbar("Daily Sales Report Created Successfully!", {
          variant: "success",
        });
      },
      onError: () => {
        enqueueSnackbar(`Daily Sales Report Creation Failed`, {
          variant: "error",
        });
      },
    });

  //update packet
  const { mutate: updatePacketMutation, isPending: isPacketUpdating } =
    useMutation({
      mutationFn: updatePacket,
      onSuccess: () => {
        setSelectedRow(null);
        setOpenViewDrawer(false);
        setOpenAddOrEditDialog(false);
        queryClient.invalidateQueries({ queryKey: ["packets"] });
        queryClient.invalidateQueries({
          queryKey: ["daily-packet-total", formattedDate],
        });
        queryClient.invalidateQueries({
          queryKey: ["monthly-packet-total", formattedDate],
        });
        queryClient.invalidateQueries({
          queryKey: ["packet-monthly-sales", formattedDate],
        });
        queryClient.invalidateQueries({
          queryKey: ["packet-daily-sales", formattedDate],
        });
        queryClient.invalidateQueries({
          queryKey: ["packet-total"],
        });
        enqueueSnackbar("Daily Sales Report Update Successfully!", {
          variant: "success",
        });
      },
      onError: () => {
        enqueueSnackbar(`Daily Sales Report Update Failed`, {
          variant: "error",
        });
      },
    });

  //delete packet
  const { mutate: deletePacketMutation } = useMutation({
    mutationFn: deletePacket,
    onSuccess: () => {
      setSelectedRow(null);
      setOpenViewDrawer(false);
      setOpenAddOrEditDialog(false);
      queryClient.invalidateQueries({ queryKey: ["packets"] });
      queryClient.invalidateQueries({
        queryKey: ["daily-packet-total", formattedDate],
      });
      queryClient.invalidateQueries({
        queryKey: ["monthly-packet-total", formattedDate],
      });
      queryClient.invalidateQueries({
        queryKey: ["packet-monthly-sales", formattedDate],
      });
      queryClient.invalidateQueries({
        queryKey: ["packet-daily-sales", formattedDate],
      });
      queryClient.invalidateQueries({
        queryKey: ["packet-total"],
      });
      enqueueSnackbar("Daily Sales Report Delete Successfully!", {
        variant: "success",
      });
    },
    onError: () => {
      enqueueSnackbar(`Daily Sales Report Delete Failed`, {
        variant: "error",
      });
    },
  });

  const allTotal = useMemo(() => {
    if (isDailyReport) {
      if (!dailyPacketTotalData) return null;
      return {
        totalPackets: dailyPacketTotalData.totalPackets,
        returnPackets: dailyPacketTotalData.returnPackets,
        totalPrice: dailyPacketTotalData.totalPrice,
        totalReturnPrice: dailyPacketTotalData.totalReturnPrice,
        subTotal: dailyPacketTotalData.subTotal,
      };
    } else if (isMonthlyReport) {
      if (!monthlyPacketTotalData) return null;
      return {
        totalPackets: monthlyPacketTotalData.totalPackets,
        returnPackets: monthlyPacketTotalData.returnPackets,
        totalPrice: monthlyPacketTotalData.totalPrice,
        totalReturnPrice: monthlyPacketTotalData.totalReturnPrice,
        subTotal: monthlyPacketTotalData.subTotal,
      };
    } else {
      if (!packetTotalData) return null;
      return {
        totalPackets: packetTotalData.totalPackets,
        returnPackets: packetTotalData.returnPackets,
        totalPrice: packetTotalData.totalPrice,
        totalReturnPrice: packetTotalData.totalReturnPrice,
        subTotal: packetTotalData.subTotal,
      };
    }
  }, [
    packetTotalData,
    monthlyPacketTotalData,
    dailyPacketTotalData,
    isDailyReport,
    isMonthlyReport,
  ]);

  const paginatedPacketData = useMemo(() => {
    if (isDailyReport) {
      if (!dailyPacketData) return [];
      if (rowsPerPage === -1) {
        return dailyPacketData;
      }
      return dailyPacketData.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      );
    } else if (isMonthlyReport) {
      if (!monthlyPacketData) return [];
      if (rowsPerPage === -1) {
        return monthlyPacketData;
      }
      return monthlyPacketData.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      );
    } else {
      if (!packetData) return [];
      if (rowsPerPage === -1) {
        return packetData;
      }
      return packetData.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      );
    }
  }, [
    packetData,
    page,
    rowsPerPage,
    dailyPacketData,
    monthlyPacketData,
    isDailyReport,
    isMonthlyReport,
  ]);

  return (
    <Stack>
      <Box
        sx={{
          padding: theme.spacing(2),
          boxShadow: 2,
          marginY: 2,
          borderRadius: 1,
          overflowX: "hidden",
        }}
      >
        <PageTitle
          title={`${
            isDailyReport ? "Daily " : isMonthlyReport ? "Monthly " : ""
          }Stock Balance`}
        />
        <Breadcrumb breadcrumbs={breadcrumbItems} />
      </Box>
      {(isDailyReport || isMonthlyReport) && (
        <Accordion sx={{ marginBottom: 2, borderRadius: 1 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            sx={{
              borderBottom: "1px solid var(--pallet-lighter-grey)",
            }}
          >
            <Typography variant="subtitle2">Select Filters</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box width={isMobile ? "100%" : "25%"}>
              <Controller
                control={control}
                {...register("date", { required: true })}
                name={"date"}
                render={({ field }) => {
                  return (
                    <DatePickerComponent
                      onChange={(e) => field.onChange(e)}
                      value={field.value ? new Date(field.value) : undefined}
                      error={errors?.date ? "Required" : ""}
                      disablePast={false}
                      disableFuture={true}
                    />
                  );
                }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                onClick={() => {
                  reset();
                }}
                sx={{ color: "var(--button-color)", marginRight: "0.5rem" }}
              >
                Reset
              </Button>
            </Box>
          </AccordionDetails>
        </Accordion>
      )}
       
      

      <Stack sx={{ alignItems: "center" }}>
        <TableContainer
          component={Paper}
          elevation={2}
          sx={{
            overflowX: "auto",
            maxWidth: isMobile ? "88vw" : "100%",
          }}
        >
          <Stack
            flexDirection={isMobile ? "column" : "row"}
            sx={{ alignItems: "center", justifyContent: "flex-end" }}
          >
            <Box
              sx={{
                padding: theme.spacing(2),
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                variant="contained"
                sx={{ backgroundColor: "var(--app-headers)" }}
                startIcon={<DownloadOutlinedIcon />}
                onClick={() =>
                  generateMonthlySalesPDF(
                    isDailyReport
                      ? dailyPacketData
                      : isMonthlyReport
                      ? monthlyPacketData
                      : packetData
                  )
                }
              >
                Report Download
              </Button>
            </Box>
            <Box
              sx={{
                padding: theme.spacing(2),
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                variant="contained"
                sx={{ backgroundColor: "var(--button-color)" }}
                startIcon={<AddIcon />}
                onClick={() => {
                  setSelectedRow(null);
                  setOpenAddOrEditDialog(true);
                }}
              >
                Add Sales Report
              </Button>
            </Box>
          </Stack>

          {(isPacketDataFetching ||
            isPacketAssignedTaskData ||
            isPacketApprovedTaskData) && (
            <LinearProgress
              sx={{ width: "100%", color: "var(--secondary-color)" }}
            />
          )}
          <Table aria-label="simple table">
            <TableHead sx={{ backgroundColor: "var(--app-headers)" }}>
              <TableRow>
                <TableCell align="center">Date</TableCell>
                <TableCell align="right">Meterial type</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Unit Price</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell align="right">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedPacketData?.length > 0 ? (
                paginatedPacketData?.map((row) => (
                  <TableRow
                    key={`${row._id}`}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setSelectedRow(row);
                      setOpenViewDrawer(true);
                    }}
                  >
                    <TableCell align="center">
                      {format(row.date, "yyyy-MM-dd")}
                    </TableCell>
                    <TableCell align="right">{row.noOfPackets}</TableCell>
                    <TableCell align="right">{row.noOfReturnPackets}</TableCell>
                    <TableCell align="right">{row.unitPrice}</TableCell>
                    <TableCell align="right">{row.marketName}</TableCell>
                    <TableCell align="right">
                      {row.totalPrice - row.totalReturnPrice}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={11} align="center">
                    <Typography variant="body2">No Records found</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={100}
                  count={
                    isDailyReport
                      ? dailyPacketData?.length
                      : isMonthlyReport
                      ? monthlyPacketData
                      : packetData?.length
                  }
                  rowsPerPage={rowsPerPage}
                  page={page}
                  showFirstButton={true}
                  showLastButton={true}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Stack>
      <ViewDataDrawer
        open={openViewDrawer}
        handleClose={() => setOpenViewDrawer(false)}
        fullScreen={true}
        drawerContent={
          <Stack spacing={1} sx={{ paddingX: theme.spacing(1) }}>
            <DrawerHeader
              title="Sales Details"
              handleClose={() => setOpenViewDrawer(false)}
              onEdit={() => {
                setSelectedRow(selectedRow);
                setOpenAddOrEditDialog(true);
              }}
              onDelete={() => setDeleteDialogOpen(true)}
            />

            {selectedRow && (
              <Stack>
                {/* <ViewSalesReportContent
                  dailySales={selectedRow}
                  handleCloseDrawer={() => setOpenViewDrawer(false)}
                /> */}
              </Stack>
            )}
          </Stack>
        }
      />
      {/* {openAddOrEditDialog && (
        <AddOrEditSalesReportDialog
          open={openAddOrEditDialog}
          handleClose={() => {
            setSelectedRow(null);
            setOpenViewDrawer(false);
            setOpenAddOrEditDialog(false);
          }}
          onSubmit={(data) => {
            if (selectedRow) {
              updatePacketMutation(data);
            } else {
              createPacketMutation(data);
            }
          }}
          defaultValues={selectedRow}
          isLoading={isPacketCreating || isPacketUpdating}
        />
      )} */}
      {deleteDialogOpen && (
        <DeleteConfirmationModal
          open={deleteDialogOpen}
          title="Remove Sales Report Confirmation"
          content={
            <>
              Are you sure you want to remove this Sales Report?
              <Alert severity="warning" style={{ marginTop: "1rem" }}>
                This action is not reversible.
              </Alert>
            </>
          }
          handleClose={() => setDeleteDialogOpen(false)}
          deleteFunc={async () => {
            deletePacketMutation(selectedRow._id);
          }}
          onSuccess={() => {
            setOpenViewDrawer(false);
            setSelectedRow(null);
            setDeleteDialogOpen(false);
          }}
          handleReject={() => {
            setOpenViewDrawer(false);
            setSelectedRow(null);
            setDeleteDialogOpen(false);
          }}
        />
      )}
    </Stack>
  );
}

export default DailyReportTable;
