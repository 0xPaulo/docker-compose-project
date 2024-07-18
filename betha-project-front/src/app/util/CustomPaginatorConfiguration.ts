import { MatPaginatorIntl } from "@angular/material/paginator";

export function CustomPaginator() {
  const customPaginatorIntl = new MatPaginatorIntl();

  customPaginatorIntl.itemsPerPageLabel = "Resultados por página:";
  customPaginatorIntl.nextPageLabel = "Proxima página";
  customPaginatorIntl.previousPageLabel = "Página anterior";

  return customPaginatorIntl;
}
