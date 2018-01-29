package com.minginglamp.utils;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class Md5Util
{
  public static final String Md5(byte[] source)
  {
    String s = null;
    char[] hexDigits = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F' };
    try
    {
      MessageDigest md = MessageDigest.getInstance("MD5");
      md.update(source);
      byte[] tmp = md.digest();

      char[] str = new char[32];

      int k = 0;
      for (int i = 0; i < 16; i++)
      {
        byte byte0 = tmp[i];
        str[(k++)] = hexDigits[(byte0 >>> 4 & 0xF)];

        str[(k++)] = hexDigits[(byte0 & 0xF)];
      }
      s = new String(str);
    }
    catch (NoSuchAlgorithmException e) {
      e.printStackTrace();
    }
    return s;
  }

  public static String Md5(String strsource, String charsetName)
  {
    String s = null;
    try {
      byte[] source = strsource.getBytes(charsetName);
      s = Md5(source);
    }
    catch (Exception e) {
      e.printStackTrace();
    }
    return s;
  }

  public static String Md5(String strsource) {
    return Md5(strsource, "UTF-8");
  }
}