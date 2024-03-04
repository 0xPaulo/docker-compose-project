package com.betha.backend.uploadFotos.res;

import lombok.Data;

@Data
public class GoogleApiRes {
  private int status;
  private String msg;
  private String url;
}
