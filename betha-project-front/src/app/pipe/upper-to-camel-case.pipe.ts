import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "upperToCamelCase",
})
export class UpperToCamelCasePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;
    let result = value.toLowerCase();
    result = result.replace(/_([a-z])/g, (g) => " " + g[1].toUpperCase());
    result = result.charAt(0).toUpperCase() + result.slice(1);
    return result;
  }
}
