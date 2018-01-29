package com.minginglamp;

import com.minginglamp.service.TaskDataService;
import com.minginglamp.utils.HBaseUtil;
import com.minginglamp.utils.Md5Util;

import org.apache.poi.openxml4j.exceptions.InvalidFormatException;

import java.io.IOException;

/**
 * Created by lilongfei on 2017/5/23.
 */
public class Test {
    public static void main(String[] args) throws IOException, InvalidFormatException {
        TaskDataService taskDataService = new TaskDataService();
//        taskDataService.getOne("150104197903293015");
//        HBaseUtil.getResult("person_tag_more", Md5Util.Md5("150104197903293015"));
        HBaseUtil.getOneTaskDetail("person_tag_more", Md5Util.Md5("220125197610153617"));
    }
}