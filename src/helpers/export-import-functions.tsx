import * as XLSX from "xlsx";

export const handleExportToExcel = (headersMap: any, selectedForm: string) => {
  const headers = headersMap[selectedForm];
  const ws = XLSX.utils.json_to_sheet(headers, { skipHeader: false });
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Cadastros");
  XLSX.writeFile(wb, "cadastros.xlsx");
};

export const handleImportFromExcel = (
  file: File,
  selectedForm: string,
  setExcelData: any,
  addFileToContext: null | any = null,
  orderQnt: number | null = null
) => {
  console.log(file);
  const reader = new FileReader();
  reader.onload = (event) => {
    const data = new Uint8Array(event.target?.result as ArrayBuffer);
    const workbook = XLSX.read(data, { type: "array" });

    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    setExcelData(jsonData);
    jsonData.forEach((x) => {
      console.log(x);
    });
    switch (selectedForm) {
      case "os":
        return handleOSFile(jsonData, addFileToContext, orderQnt);
      default:
        return console.log("Erro ao fazer importação");
    }
  };

  reader.readAsArrayBuffer(file);
};

const handleOSFile = (
  jsonData: any,
  addFileToContext: any,
  orderQnt: number | null
) => {
  const newOrders: any[] = [];
  let orderId = orderQnt ? orderQnt + 1 : 0;

  jsonData.forEach((os: any) => {
    const newOrder = {
      id: orderId,
      day: os.Data,
      technician: os.Tecnico,
      product: os.Produto,
      hospital: os.Cliente,
      status: "Progresso",
    };
    newOrders.push(newOrder);
    orderId = orderId + 1;
  });

  newOrders.forEach((n) => {
    addFileToContext(n);
  });
};
