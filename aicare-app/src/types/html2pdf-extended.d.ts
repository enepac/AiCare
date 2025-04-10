declare module "html2pdf.js" {
  interface Html2Pdf {
    toPdf(): this;
    get(type: "pdf"): Promise<import("jspdf").jsPDF>;
  }
}
