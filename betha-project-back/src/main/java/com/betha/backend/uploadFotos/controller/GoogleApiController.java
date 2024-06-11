package com.betha.backend.uploadFotos.controller;

import java.io.File;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.betha.backend.uploadFotos.res.GoogleApiRes;
import com.betha.backend.uploadFotos.service.GoogleApiService;

@RestController
public class GoogleApiController {

  @Autowired
  private GoogleApiService service;

  @PostMapping("/uploadToGoogleDrive")
  public Object handleFileUpload(@RequestParam("images[]") MultipartFile[] files)
      throws GeneralSecurityException, IOException {

    ArrayList<String> arrayRes = new ArrayList<>();
    for (MultipartFile file : files) {
      if (file.isEmpty()) {
        continue;
      }
      File tempFile = File.createTempFile("temp", null);
      file.transferTo(tempFile);
      GoogleApiRes res = service.uploadImageToDrive(tempFile);
      arrayRes.add(res.getUrl());
    }
    return arrayRes;
  }
}
