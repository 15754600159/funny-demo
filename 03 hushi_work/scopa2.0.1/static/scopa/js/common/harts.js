define({ 
	"harts": [
    {
      "name": "铁路同行",
      "id": 2,
      "event": [
        "train_event"
      ],
      "description": "火车订票号相邻且同车次"
    },
    {
      "name": "民航离港同行",
      "id": 12,
      "event": [
        "flightLG_event"
      ],
      "description": "同日期搭乘同航班两次或以上"
    },
    {
      "name": "同屋同住",
      "id": 3,
      "event": [
        "hotel_event"
      ],
      "description": "同屋入住且入住时间相差1小时以内"
    },
    {
      "name": "多次同住",
      "id": 13,
      "event": [
        "hotel_event"
      ],
      "description": "两次或以上入住同旅馆且入住时间相差10分钟以内"
    }
  ],
	eventmapping: {
		hotel_event: 'eHOTEL_xm,rzsj,eHOTEL_ldmc,eHOTEL_fjh,eHOTEL_tfsj',
		//,ePASSPORTHOTEL_xm,rzsj,ePASSPORTHOTEL_ldmc,ePASSPORTHOTEL_fjh,ePASSPORTHOTEL_tfsj
    	train_event: 'ccrq,eTRAIN_fz,eTRAIN_dz,new_cc,eTRAIN_zwh,eTRAIN_spsj',
    	//ccrq,ePASSPORTTRAIN_fz,ePASSPORTTRAIN_dz,new_cc,ePASSPORTTRAIN_zwh,ePASSPORTTRAIN_spsj
    	flightlg_event: 'hbrq,eFLIGHTlg_djjc,eFLIGHTlg_ddjc,hbh,eFLIGHTlg_zwh,eFLIGHTlg_jgsj,eFLIGHTlg_lgsj'
    	//hbrq,ePASSPORTFLIGHTlg_djjc,ePASSPORTFLIGHTlg_ddjc,hbh,ePASSPORTFLIGHTlg_zwh,ePASSPORTFLIGHTlg_jgsj,ePASSPORTFLIGHTlg_lgsj
	}
})