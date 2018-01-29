package com.minginglamp.common;

import java.util.List;

import com.github.miemiedev.mybatis.paginator.domain.PageList;

/**
 * Created by lilongfei on 2017/4/24.
 */
public class PageH {

    /**
     * 每页显示
     */
    private int size = 10;
    
    /**
     * 当前页面记录数
     */
    private int numberElements;
    
    /**
     * 页码
     */
    private int number = 1;
    /**
     * 开始数
     */
    private int start = 0;

    private List<?> content;

    private int totalPages;
    
    private long totalElements;
    
    private boolean first;
    
    private boolean last;
    
    

    public long getTotalElements() {
		return totalElements;
	}

	public void setTotalElements(long totalElements) {
		this.totalElements = totalElements;
	}

	public PageH() {

    }

    public PageH(int pageNo, int pageSize) {
        this.size = size;
        this.number = number;
    }

    /**
     * @param pageSize 每页条数
     * @param pageNo   页码（单前页码）
     * @param start    开始条数
     * @param result   返回数据list
     */
    public PageH(int size, int pageNo, int start, List<?> result) {

        this.size = size;
        this.number = number;
        this.start = start;
        this.content = content;
    }

    /**
     * <p>
     * 每一页的条数，默认10条
     * <p/>
     *
     * @author LH
     */
    public int getPageSize() {
        return size;
    }

    public void setPageSize(int pageSize) {
        this.size = pageSize;
    }

    public int getPageNo() {
        return number;
    }

    public void setPageNo(int pageNo) {
        this.number = number;
    }

    public int getStart() {
        this.start = number * size;
        return start;
    }

    public void setStart(int start) {
        this.start = start;
    }

    public List<?> getContent() {
        return content;
    }

    public void setContent(List<?> content) {
        this.content = content;
    }

    public int getTotalPage() {
        return totalPages;
    }

    public void setTotalPages(int totalPages) {
        this.totalPages = totalPages;
    }

	public int getNumberElements() {
		return numberElements;
	}

	public void setNumberElements(int numberElements) {
		this.numberElements = numberElements;
	}

	public int getNumber() {
		return number;
	}

	public void setNumber(int number) {
		this.number = number;
	}

	public boolean isFirst() {
		return first;
	}

	public void setFirst(boolean first) {
		this.first = first;
	}

	public boolean isLast() {
		return last;
	}

	public void setLast(boolean last) {
		this.last = last;
	}
    
    
}
