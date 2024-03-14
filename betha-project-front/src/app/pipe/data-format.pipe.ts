import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "dataFormat",
})
export class DataFormatPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return "";

    // Extrai a data do valor de entrada
    const date = new Date(value);

    // Formata a data no formato desejado
    const formattedDate = `${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${date.getFullYear().toString().substr(-2)}`;

    return formattedDate;
  }
}
