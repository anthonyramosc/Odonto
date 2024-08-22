import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.scss']
})
export class InformesComponent implements OnInit {

  constructor() { }

  selectedFile: File | null = null;
  selectedFileUrl: any;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onUpload(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);

      // Aquí puedes hacer una petición HTTP para enviar el archivo al servidor
      // Por ejemplo, usando HttpClient de Angular
      console.log('Archivo listo para ser enviado:', this.selectedFile);
      // Ejemplo de petición HTTP
      // this.http.post('URL_DEL_SERVIDOR', formData).subscribe(response => {
      //   console.log('Respuesta del servidor', response);
      // });
    }
  }

  //Guardar Imagen, Param: ubicacion en serv web
  onSaveImgSocio(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      console.log("Imagen seleccionada");

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 566; //800
          const MAX_HEIGHT = 1080; //600
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.7); // 0.7 es la calidad de compresión (0 a 1)

          this.selectedFileUrl = dataUrl;
          // console.log('IMG SOCIO',this.selectedFileUrl)
        };

        img.src = e.target.result;
      };

      reader.readAsDataURL(this.selectedFile);
    }
  }

  ngOnInit(): void {
  }

}
