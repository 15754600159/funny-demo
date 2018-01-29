define({ 
	eventList:['hotel_event','train_event','flightLG_event','flightDP_event','internetcafe_event','trafficmonitor_event','vehicle_event','passporthotel_event','passporttrain_event','passportflightLG_event'],
    eventmapping: {
      hotel_event: 'rzsj,eHOTEL_ldmc,eHOTEL_fjh,eHOTEL_ldxz',
      train_event: 'ccrq,eTRAIN_fz,eTRAIN_dz,new_cc,eTRAIN_zwh,eTRAIN_spsj',
      flightLG_event: 'hbrq,eFLIGHTlg_djjc,eFLIGHTlg_ddjc,hbh,eFLIGHTlg_zwh,eFLIGHTlg_jgsj,eFLIGHTlg_lgsj',
      flightDP_event: 'cfsj,hbh,eFLIGHTdp_djjc,eFLIGHTdp_ddjc,eFLIGHTdp_ddsj',
      internetcafe_event: 'swsj,eINTERNETCAFE_xwsj,wbbm,eINTERNETCAFE_wbmc,eINTERNETCAFE_swip,eINTERNETCAFE_swlx',
      trafficmonitor_event: 'tgkksj,kkbh,eTRAFFICMONITOR_kkmc,hpzl_hphm,eTRAFFICMONITOR_xsfx',
      vehicle_event: 'wfsj,wfbh,eVEHICLE_wfxwmc,hpzl_hphm,eVEHICLE_sfzh,eVEHICLE_dsr',
      passporthotel_event: 'rzsj,ePASSPORTHOTEL_ldmc,ePASSPORTHOTEL_fjh,ePASSPORTHOTEL_ldxz',
      passporttrain_event: 'ccrq,ePASSPORTTRAIN_fz,ePASSPORTTRAIN_dz,new_cc,ePASSPORTTRAIN_zwh,ePASSPORTTRAIN_spsj',
      passportflightLG_event: 'hbrq,ePASSPORTFLIGHTlg_djjc,ePASSPORTFLIGHTlg_ddjc,hbh,ePASSPORTFLIGHTlg_zwh,ePASSPORTFLIGHTlg_jgsj,ePASSPORTFLIGHTlg_lgsj'
    }
})