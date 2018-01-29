package com.minginglamp.action;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.minginglamp.model.ImportantCarCategory;
import com.minginglamp.service.ImportantCarCategoryService;

@RestController
@RequestMapping("/importantCarCategory")
public class ImportantCarCategoryAction {

	@Autowired
	private ImportantCarCategoryService importantCarCategoryService;

	@GetMapping("/listCategory")
	public List<ImportantCarCategory> listCategory() {
		return importantCarCategoryService.listCategory();
	}

	@RequestMapping(value = "listCategoryByCode", method = RequestMethod.GET)
	public List<ImportantCarCategory> listCategoryByCode(String code) {
		return importantCarCategoryService.listCategoryByCode(code);
	}
}
