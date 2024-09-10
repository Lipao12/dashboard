import * as XLSX from "xlsx";

export const handleExportToExcel = (headersMap: any, selectedForm: string) => {
  const headers = headersMap[selectedForm];
  const ws = XLSX.utils.json_to_sheet(headers, { skipHeader: false });
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Cadastros");
  XLSX.writeFile(wb, "cadastros.xlsx");
};

export const handleImportFromExcel = () => {
  alert("Importação");
};
