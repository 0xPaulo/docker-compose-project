package com.betha.backend.uploadFotos.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.GeneralSecurityException;
import java.util.Collections;

import org.springframework.stereotype.Service;

import com.betha.backend.uploadFotos.res.GoogleApiRes;
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.FileContent;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.DriveScopes;

@Service
public class GoogleApiService {

  private static final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();
  private static final String SERVICE_ACOUNT_KEY_PATH = getPathGoogleCredentials();

  private static String getPathGoogleCredentials() {
    String currentDirectory = System.getProperty("user.dir");
    Path filePath = Paths.get(currentDirectory, "cred.json");
    return filePath.toString();
  }

  public GoogleApiRes uploadImageToDrive(File file) throws GeneralSecurityException, IOException {
    GoogleApiRes res = new GoogleApiRes();

    try {
      String folderId = "1f-ZVTel6pKMIv93WGdmwpsXygi55hlHF";
      Drive drive = createDriveService();
      com.google.api.services.drive.model.File fileMetaData = new com.google.api.services.drive.model.File();
      String fileName = file.getName().toLowerCase();
      if (!fileName.endsWith(".jpg") && !fileName.endsWith(".jpeg")) {
        fileName += ".jpg";
      }
      fileMetaData.setName(fileName);
      fileMetaData.setParents(Collections.singletonList(folderId));
      FileContent mediaContent = new FileContent("image/jpeg", file);
      com.google.api.services.drive.model.File uploadedFile = drive.files().create(fileMetaData, mediaContent)
          .setFields("id").execute();
      String imageUrl = "https://lh3.googleusercontent.com/d/" + uploadedFile.getId();
      System.out.println("IMAGE URL: " + imageUrl);
      file.delete();
      res.setStatus(200);
      res.setMsg("Imagem enviada pro drive");
      res.setUrl(imageUrl + "=w150");

    } catch (Exception e) {
      System.out.println(e.getMessage());
      res.setStatus(500);
      res.setMsg(e.getMessage());
    }
    return res;
  }

  private Drive createDriveService() throws GeneralSecurityException, IOException {
    GoogleCredential credential = GoogleCredential.fromStream(new FileInputStream(SERVICE_ACOUNT_KEY_PATH))
        .createScoped(Collections.singleton(DriveScopes.DRIVE));

    return new Drive.Builder(GoogleNetHttpTransport.newTrustedTransport(), JSON_FACTORY, credential)
        .build();
  }
}
