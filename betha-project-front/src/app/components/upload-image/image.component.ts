import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { LoadingService } from "./service/loading.service";

@Component({
  selector: "up-image",
  templateUrl: "./image.component.html",
  styleUrls: ["./image.component.scss"],
})
export class ImageComponent implements OnInit {
  selectedFile: File | null = null;
  resultMessage: { type: string; result: any } | null = null;
  image: { url: string } = { url: "" };

  constructor(
    private snackBar: MatSnackBar,
    public loadingService: LoadingService
  ) {}

  handleSelectFile(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  async handleUpload(): Promise<void> {
    this.loadingService.startLoading();
    try {
      const formData = new FormData();
      formData.append("image", this.selectedFile as Blob);

      const response = await fetch(
        "http://localhost:8080/uploadToGoogleDrive",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();
      if (response.ok) {
        this.onSucess();
        this.image.url = result.url;
        this.loadingService.stopLoading();
      } else {
        this.onError();
      }
    } catch (error: any) {
      console.error("Error uploading image:", error.message);
      this.resultMessage = { type: "error", result: error.message };
    }
    setTimeout(() => (this.resultMessage = null), 5000);
  }

  onSucess() {
    this.snackBar.open("Imagem salva com sucesso", "", { duration: 5000 });
  }
  onError() {
    this.snackBar.open("Acorreu um erro", "", { duration: 5000 });
  }
  ngOnInit(): void {}
}
