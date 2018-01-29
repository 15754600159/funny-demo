package com.minginglamp.common;

import java.util.List;

import com.github.miemiedev.mybatis.paginator.domain.PageList;

/**
 * Created by lilongfei on 2017/4/24.
 */
public class PageHelper {

    /**
     * 每页显示
     */
    private int pageSize = 10;
    /**
     * 页码
     */
    private int pageNo = 1;
    /**
     * 开始数
     */
    private int start = 0;

    private List<?> result;

    private int totalPage;
    
    private long total;

    public long getTotal() {
		return total;
	}

	public void setTotal(long total) {
		this.total = total;
	}

	public PageHelper() {

    }

    public PageHelper(int pageNo, int pageSize) {
        this.pageSize = pageSize;
        this.pageNo = pageNo;
    }

    /**
     * @param pageSize 每页条数
     * @param pageNo   页码（单前页码）
     * @param start    开始条数
     * @param result   返回数据list
     */
    public PageHelper(int pageSize, int pageNo, int start, List<?> result) {

        this.pageSize = pageSize;
        this.pageNo = pageNo;
        this.start = start;
        this.result = result;
    }

    /**
     * <p>
     * 每一页的条数，默认10条
     * <p/>
     *
     * @author LH
     */
    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public int getPageNo() {
        return pageNo;
    }

    public void setPageNo(int pageNo) {
        this.pageNo = pageNo;
    }

    public int getStart() {
        this.start = (pageNo - 1) * pageSize;
        return start;
    }

    public void setStart(int start) {
        this.start = start;
    }

    public List<?> getResult() {
        return result;
    }

    public void setResult(List<?> result) {
        this.result = result;
    }

    public int getTotalPage() {
        return totalPage;
    }

    public void setTotalPage(int totalPage) {
        this.totalPage = totalPage;
    }
}
