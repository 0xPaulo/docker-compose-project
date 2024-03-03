package com.betha.backend.controller;

import java.io.File;
import java.io.IOException;
import java.security.GeneralSecurityException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.betha.backend.res.GoogleApiRes;
import com.betha.backend.service.GoogleApiService;

@RestController
public class GoogleApiController {

  @Autowired
  private GoogleApiService service;

  @PostMapping("/uploadToGoogleDrive")
  public Object handleFileUpload(@RequestParam("image") MultipartFile file)
      throws GeneralSecurityException, IOException {
    if (file.isEmpty()) {
      return "File is empty";
    }
    File tempFile = File.createTempFile("temp", null);
    file.transferTo(tempFile);
    GoogleApiRes res = service.uploadImageToDrive(tempFile);
    System.out.println(res);
    return res;
  }

}
