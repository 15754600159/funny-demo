package com.minginglamp.action;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.minginglamp.model.ImportantPersonCategory;
import com.minginglamp.service.ImportantPersonCategoryService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/importantPersonCategory")
@Slf4j
public class ImportantPersonCategoryAction {

	@Autowired
	private ImportantPersonCategoryService importantPersonCategoryService;
	
     @GetMapping("/listCategory")
	 public List<ImportantPersonCategory> listCategory() {
			return importantPersonCategoryService.listCategory();
	 }
     
     @RequestMapping(value = "listCategoryByCode", method = RequestMethod.GET)
	 public List<ImportantPersonCategory> listCategoryByCode(String code) {
			return importantPersonCategoryService.listCategoryByCode(code);
	 }
}
