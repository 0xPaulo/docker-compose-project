import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ImgProxyService {
  private proxyUrl = "http://localhost:8080/proxy";
  constructor(private http: HttpClient) {}

  getImage(imageUrl: string): Observable<Blob> {
    return this.http.get(this.proxyUrl, {
      params: { imageUrl: imageUrl },
      responseType: "blob" as "json",
    }) as Observable<Blob>;
  }
}
