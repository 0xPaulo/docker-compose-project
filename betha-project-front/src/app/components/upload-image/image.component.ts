import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { LoadingService } from "./service/loading.service";

@Component({
  selector: "upload-image",
  templateUrl: "./image.component.html",
  styleUrls: ["./image.component.scss"],
})
export class ImageComponent implements OnInit {
  resultMessage: { type: string; result: any } | null = null;
  image: { url: string } = { url: "" };
  selectedFile: File[] = [];
  selectedFileUrls: string[] = [];
  isInputDisabled = false;

  @Output() imagUrlSon = new EventEmitter<string>();

  constructor(
    private snackBar: MatSnackBar,
    public loadingService: LoadingService
  ) {}

  handleSelectFile(event: any): void {
    const files = event.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        this.selectedFile.push(file);
        this.selectedFileUrls.push(this.getObjectUrlFile(file));
      }
      if (this.selectedFile.length >= 3) {
        this.isInputDisabled = true;
      }
    }
  }

  getObjectUrlFile(file: File): string {
    return URL.createObjectURL(file);
  }
  async handleUpload(): Promise<void> {
    this.loadingService.startLoading();

    try {
      const formData = new FormData();
      this.selectedFile.forEach((element) => {
        formData.append("images[]", element);
      });

      const response = await fetch(
        "http://localhost:8080/uploadToGoogleDrive",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();
      if (response.ok) {
        this.loadingService.stopLoading();
        this.imagUrlSon.emit(result);
        // this.image.url = result.url;
        this.onSucess();
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
