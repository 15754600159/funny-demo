package com.minginglamp.action;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.minginglamp.model.Dwdm;
import com.minginglamp.service.DwdmService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/dwdm/info")
@Slf4j
public class DwdmAction {
	
	@Autowired
	private DwdmService dwdmService;
	
     @GetMapping("/findall")
	 public List<Dwdm> findAll() {
			 
			   return dwdmService.findAll();
	  }

}
