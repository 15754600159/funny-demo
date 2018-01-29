package com.minginglamp.sharding;

import java.util.List;
import java.util.Map;

import org.springframework.data.domain.PageRequest;

public class PageResponse extends PageRequest{

	private static final long serialVersionUID = 1L;
	private int totalCount;
	private List<Map<String, Object>> list;
	private int totalPages;
	
	private int currentsize;

	public int getCurrentsize() {
		return currentsize;
	}

	public void setCurrentsize(int currentsize) {
		this.currentsize = currentsize;
	}

	public void setTotalPages(int totalPages) {
		this.totalPages = totalPages;
	}

	public PageResponse(int page, int size, int totalCount, int currentsize,List<Map<String, Object>> list) {
		super(page, size);
		this.totalCount = totalCount;
		this.list = list;
		this.currentsize = currentsize;
		this.totalPages = totalCount % size == 0 ? totalCount / size : totalCount / size + 1;
	}

	public int getTotalCount() {
		return totalCount;
	}

	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
	}

	public List<Map<String, Object>> getList() {
		return list;
	}

	public void setList(List<Map<String, Object>> list) {
		this.list = list;
	}

	public int getTotalPages() {
		return totalPages;
	}
	
}
