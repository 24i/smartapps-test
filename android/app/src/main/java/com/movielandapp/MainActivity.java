package com.movielandapp;

import android.os.Bundle;
import com.facebook.react.ReactActivity;


import android.content.Intent; 
import android.content.res.Configuration; 

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "MovieLandApp";
  }

  /** 
   * Necessary to run package react-native-screens on Android devices. 
   * This change is required to avoid crashes related to View state being not persisted consistently across Activity restarts.
   */
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(null);
  }

  @Override
  public void onConfigurationChanged(Configuration newConfig) {
    super.onConfigurationChanged(newConfig);
    Intent intent = new Intent("onConfigurationChanged");
    intent.putExtra("newConfig", newConfig);
    this.sendBroadcast(intent);
  }
}
