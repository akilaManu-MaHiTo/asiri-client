import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../assets/asiri-logo.png";

const PRIMARY_COLOR = "#090c20";
const ACCENT_COLOR = "#d32f2f";
const LIGHT_TEXT = "#ffffff";
const MUTED_TEXT = "#666666";
const ALT_ROW = "#f8f9fa";

const LEFT_MARGIN = 15;
const RIGHT_MARGIN = 15;

const money = (v: any) =>
  v !== undefined && v !== null && !isNaN(Number(v)) ? Number(v).toFixed(2) : "-";

const int = (v: any) =>
  v !== undefined && v !== null && !isNaN(Number(v)) ? Number(v) : 0;

function drawHeader(doc: jsPDF, companyName: string, subtitle: string, title: string) {
  // Reduced header background
  doc.setFillColor(LIGHT_TEXT);
  doc.rect(0, 0, 210, 30, "F"); // A4 portrait width = 210mm, header height = 30mm

  // Add logo (safe-guarded)
  try {
    doc.addImage(logo, "PNG", 15, 5, 20, 20);
  } catch {
    console.warn("Logo could not be added to PDF");
  }

  // Company name
  doc.setTextColor(PRIMARY_COLOR);
  doc.setFontSize(20);
  doc.setFont(undefined, "bold");
  doc.text(companyName, 40, 15);

  // Subtitle
  doc.setFontSize(12);
  doc.setFont(undefined, "normal");
  doc.text(subtitle, 40, 22);

  // Title bar
  doc.setFillColor(ACCENT_COLOR);
  doc.rect(0, 30, 210, 8, "F");
  doc.setTextColor(LIGHT_TEXT);
  doc.setFontSize(14);
  doc.setFont(undefined, "bold");
  doc.text(title, 15, 36);
}

function drawFooter(doc: jsPDF, footerLeft: string, generatedOn: string) {
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    const pageHeight = doc.internal.pageSize.getHeight();

    // Divider line
    doc.setDrawColor(ACCENT_COLOR);
    doc.setLineWidth(1);
    doc.line(LEFT_MARGIN, pageHeight - 25, doc.internal.pageSize.getWidth() - RIGHT_MARGIN, pageHeight - 25);

    // Footer text
    doc.setFontSize(8);
    doc.setTextColor(MUTED_TEXT);
    doc.text(footerLeft, LEFT_MARGIN, pageHeight - 18);
    doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.getWidth() - RIGHT_MARGIN - 25, pageHeight - 18);
    doc.text(`Generated: ${generatedOn}`, LEFT_MARGIN, pageHeight - 12);
    doc.text("Contact: info@asirimushrooms.lk | +94 XX XXX XXXX", LEFT_MARGIN, pageHeight - 6);
  }
}

function getColumnStyles(doc: jsPDF) {
  // Compute widths that ALWAYS fit the printable area (A4 portrait with 15mm margins)
  const pageWidth = doc.internal.pageSize.getWidth();
  const usable = pageWidth - (LEFT_MARGIN + RIGHT_MARGIN); // 180mm on A4 portrait

  // Percentages sum to 100%
  const w = {
    group: usable * 0.12,  // ~21.6mm
    date: usable * 0.16,   // ~28.8mm
    market: usable * 0.25, // ~45mm
    unit: usable * 0.16,   // ~28.8mm
    packets: usable * 0.13,// ~23.4mm
    total: usable * 0.18,  // ~32.4mm
  };

  return {
    0: { halign: "center" as const, cellWidth: w.group },
    1: { halign: "center" as const, cellWidth: w.date },
    2: { halign: "left" as const,   cellWidth: w.market },
    3: { halign: "right" as const,  cellWidth: w.unit },
    4: { halign: "right" as const,  cellWidth: w.packets },
    5: { halign: "right" as const,  cellWidth: w.total },
  };
}

function commonTable(doc: jsPDF, rows: any[], startY: number) {
  const columns = [
    "Group No",
    "Date",
    "Market",
    "Unit Price (Rs.)",
    "Packets",
    "Total Price (Rs.)",
  ];

  autoTable(doc, {
    head: [columns],
    body: rows,
    startY,
    theme: "grid",
    styles: {
      fontSize: 9,
      cellPadding: 4,
      textColor: PRIMARY_COLOR,
      fillColor: "#ffffff",
      overflow: "linebreak", // wrap long content within the set width
      minCellHeight: 8,
    },
    headStyles: {
      fillColor: PRIMARY_COLOR,
      textColor: LIGHT_TEXT,
      fontSize: 10,
      fontStyle: "bold",
      halign: "center",
      lineWidth: 0.2,
    },
    alternateRowStyles: {
      fillColor: ALT_ROW,
    },
    columnStyles: getColumnStyles(doc),
    margin: { left: LEFT_MARGIN, right: RIGHT_MARGIN },
    // Force the table to respect the printable width (prevents overflow)
    tableWidth: doc.internal.pageSize.getWidth() - (LEFT_MARGIN + RIGHT_MARGIN),
    pageBreak: "auto",
  });
}

/** PUBLIC: Fixed version that fits end columns on A4 without changing your design */
export const generateMonthlySalesPDF = (
  data: any[],
  fileName: string = "monthly-sales-report.pdf"
) => {
  const doc = new jsPDF("p", "mm", "a4");

  // Header
  drawHeader(doc, "Asiri Mushrooms", "Premium Quality Mushroom Products", "Monthly Sales Report");

  // Date & summary block
  const currentDate = new Date().toLocaleDateString();
  doc.setTextColor(PRIMARY_COLOR);
  doc.setFontSize(10);
  doc.setFont(undefined, "normal");
  doc.text(`Generated on: ${currentDate}`, 15, 45);

  const totalSales = data.reduce((sum, item) => sum + int(item.totalPrice), 0);
  const totalPackets = data.reduce((sum, item) => sum + int(item.noOfPackets), 0);

  doc.setFontSize(9);
  doc.setTextColor(MUTED_TEXT);
  doc.text(`Total Records: ${data.length}`, 15, 52);
  doc.text(`Total Packets Sold: ${totalPackets.toLocaleString()}`, 70, 52);
  doc.text(
    `Total Sales Value: Rs. ${totalSales.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    140,
    52
  );

  // Rows (only the 6 specified columns)
  const rows = data.map((item) => [
    item.groupNo ?? "-",
    item.date ? new Date(item.date).toLocaleDateString() : "-",
    item.marketName ?? "-",
    money(item.unitPrice),
    Number.isFinite(int(item.noOfPackets)) ? int(item.noOfPackets).toLocaleString() : "-",
    money(item.totalPrice),
  ]);

  // Table
  commonTable(doc, rows, 58);

  // Footer
  drawFooter(doc, "Asiri Mushrooms - Monthly Sales Report", currentDate);

  // Save
  doc.save(fileName);
};

/** PUBLIC: Same as above but with options */
export const generateCustomMonthlySalesPDF = (
  data: any[],
  options: {
    fileName?: string;
    title?: string;
    showSummary?: boolean;
    companyInfo?: {
      name?: string;
      subtitle?: string;
      contact?: string;
      email?: string;
    };
  } = {}
) => {
  const {
    fileName = "monthly-sales-report.pdf",
    title = "Monthly Sales Report",
    showSummary = true,
    companyInfo = {
      name: "Asiri Mushrooms",
      subtitle: "Premium Quality Mushroom Products",
      contact: "+94 XX XXX XXXX",
      email: "info@asirimushrooms.lk",
    },
  } = options;

  const doc = new jsPDF("p", "mm", "a4");
  drawHeader(doc, companyInfo.name!, companyInfo.subtitle!, title);

  let currentY = 45;
  const currentDate = new Date().toLocaleDateString();

  doc.setTextColor(PRIMARY_COLOR);
  doc.setFontSize(10);
  doc.text(`Generated on: ${currentDate}`, 15, currentY);

  if (showSummary) {
    const totalSales = data.reduce((sum, item) => sum + int(item.totalPrice), 0);
    const totalPackets = data.reduce((sum, item) => sum + int(item.noOfPackets), 0);

    currentY += 7;
    doc.setFontSize(9);
    doc.setTextColor(MUTED_TEXT);
    doc.text(`Total Records: ${data.length}`, 15, currentY);
    doc.text(`Total Packets: ${totalPackets.toLocaleString()}`, 70, currentY);
    doc.text(
      `Total Sales: Rs. ${totalSales.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      140,
      currentY
    );
  }

  const rows = data.map((item) => [
    item.groupNo ?? "-",
    item.date ? new Date(item.date).toLocaleDateString() : "-",
    item.marketName ?? "-",
    money(item.unitPrice),
    Number.isFinite(int(item.noOfPackets)) ? int(item.noOfPackets).toLocaleString() : "-",
    money(item.totalPrice),
  ]);

  commonTable(doc, rows, showSummary ? currentY + 8 : currentY + 8);

  // Footer with company contact
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    const pageHeight = doc.internal.pageSize.getHeight();

    doc.setDrawColor(ACCENT_COLOR);
    doc.setLineWidth(1);
    doc.line(LEFT_MARGIN, pageHeight - 25, doc.internal.pageSize.getWidth() - RIGHT_MARGIN, pageHeight - 25);

    doc.setFontSize(8);
    doc.setTextColor(MUTED_TEXT);
    doc.text(`${companyInfo.name} - ${title}`, LEFT_MARGIN, pageHeight - 18);
    doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.getWidth() - RIGHT_MARGIN - 25, pageHeight - 18);
    doc.text(`Generated: ${currentDate}`, LEFT_MARGIN, pageHeight - 12);
    doc.text(`Contact: ${companyInfo.email} | ${companyInfo.contact}`, LEFT_MARGIN, pageHeight - 6);
  }

  doc.save(fileName);
};
