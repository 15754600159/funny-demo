package com.minginglamp.utils;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.hbase.HBaseConfiguration;
import org.apache.hadoop.hbase.HColumnDescriptor;
import org.apache.hadoop.hbase.HTableDescriptor;
import org.apache.hadoop.hbase.KeyValue;
import org.apache.hadoop.hbase.client.Delete;
import org.apache.hadoop.hbase.client.Get;
import org.apache.hadoop.hbase.client.HBaseAdmin;
import org.apache.hadoop.hbase.client.HTable;
import org.apache.hadoop.hbase.client.Put;
import org.apache.hadoop.hbase.client.Result;
import org.apache.hadoop.hbase.client.ResultScanner;
import org.apache.hadoop.hbase.client.Scan;
import org.apache.hadoop.hbase.util.Bytes;
import org.mortbay.log.Log;
import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSONObject;
import com.minginglamp.model.TaskDetail;

@lombok.extern.java.Log
public class HBaseUtil {
	
	static Configuration conf = null;
	

	public static TaskDetail getOneTaskDetail(String tableName, String sfzh) {
		Map<String,String> zdrydl = new HashMap<String, String>();
		String rowKey = Md5Util.Md5(sfzh);
		zdrydl.put("01", "部下发涉恐人员");
		zdrydl.put("02", "部下发涉稳人员");
		zdrydl.put("03", "部下发在逃人员");
		zdrydl.put("04", "部下发涉毒人员");
		zdrydl.put("05", "部下发刑事犯罪前科人员");
		zdrydl.put("06", "部下发肇事肇祸精神病人");
		zdrydl.put("07", "部下发重点上访人员");
		TaskDetail detail = new TaskDetail();
		String birthday = "";
		String birthplace = "";
		String idCard = sfzh;
		String name = "";
		String nation = "";
		String sex = "";
		String tag = "";
		String tagDetail = "";
		try {
			Get get = new Get(Bytes.toBytes(rowKey));
			HTable table;
			table = new HTable(conf, Bytes.toBytes(tableName));
			Result result = table.get(get);
			if ((result != null) && (result.list() != null)) {
				birthday = new String(result.getValue("info".getBytes(),
						"birthday".getBytes()));
				birthplace = new String(result.getValue("info".getBytes(),
						"birthplace".getBytes()));
				idCard = new String(result.getValue("info".getBytes(),
						"idCard".getBytes()));
				name = new String(result.getValue("info".getBytes(),
						"name".getBytes()));
				nation = new String(result.getValue("info".getBytes(),
						"nation".getBytes()));
				sex = new String(result.getValue("info".getBytes(),
						"sex".getBytes()));
				tagDetail = new String(result.getValue("info".getBytes(),
						"tag".getBytes()));
				if (tagDetail.length() > 2) {
					List<Object> jsonObject = JSONObject.parseArray(tagDetail);
					if (jsonObject != null) {
						Set<String> tagSet = new HashSet<String>();
						for (int z = 0; z < jsonObject.size(); z++) {
							String tagOne = ((JSONObject) jsonObject.get(z))
									.get("tag").toString();
							if(tagOne.contains("部下发")){
								Set<String> bdl = new HashSet<String>();
								JSONObject parse2 = (JSONObject) JSONObject.parse(((JSONObject) jsonObject.get(z))
										.get("fields").toString());
								String zdryxl = parse2.get("重点人员细类").toString();
								for (String a : zdryxl.split(",")) {
									log.info("zdryxl------------------"+a);
									bdl.add(zdrydl.get(a.substring(0, 2)));
								}
								tagOne = bdl.toString().substring(1,bdl.toString().length()-1);
								log.info("tagOne:"+tagOne);
							}
							tagSet.add(tagOne);
						}
						tag = tagSet.toString()
								.substring(1, tagSet.toString().length() - 1).trim();
						log.info("tag:"+tag);
					}
				}
			}else{
				tag = "无背景";
			}

		} catch (IOException e) {
			e.printStackTrace();
		}
		detail.setBirthday(birthday);
		detail.setBirthplace(birthplace);
		detail.setIdCard(idCard);
		detail.setId(0);
		detail.setName(name);
		detail.setJobId(0);
		detail.setSex(sex);
		detail.setNation(nation);
		detail.setTag(tag);
		detail.setTagDetail(tagDetail);
		return detail;
	}

	public static Map<String, String> getTagList(String tableName,
			List<String> rowkeys) throws IOException {
		HTable table = new HTable(conf, Bytes.toBytes(tableName));
		List<Get> getList = new ArrayList<Get>();
		Map<String, String> result = new HashMap<String, String>();
		for (String rowkey : rowkeys) {
			getList.add(new Get(Bytes.toBytes(new String(Bytes.toBytes(rowkey),
					"utf-8"))));
		}
		Result[] results = table.get(getList);
		for (Result re : results) {
			if (re != null) {
				if ("person_tag_more".equals(tableName)) {
					byte[] idCard = re.getValue("info".getBytes(),
							"idCard".getBytes());
					byte[] value = re.getValue("info".getBytes(),
							"tag".getBytes());
					if ((value != null) && (value.length > 0))
						result.put(new String(idCard), new String(value));
				} else if ("plate_tag".equals(tableName)) {
					byte[] hpzl_hm = re.getValue(("info").getBytes(),
							("hpzl_hm").getBytes());
					byte[] value = re.getValue("info".getBytes(),
							"tag".getBytes());
					if ((value != null) && (value.length > 0)) {
						result.put(new String(hpzl_hm), new String(value));
					}
				}
			}
		}
		return result;
	}

	public static void creatTable(String tableName, String[] family)
			throws Exception {
		HBaseAdmin admin = new HBaseAdmin(conf);
		HTableDescriptor desc = new HTableDescriptor(tableName);
		for (int i = 0; i < family.length; i++) {
			desc.addFamily(new HColumnDescriptor(family[i]));
		}
		if (admin.tableExists(tableName)) {
			System.out.println("table Exists!");
			System.exit(0);
		} else {
			admin.createTable(desc);
			System.out.println("create table Success!");
		}
	}

	public static void addData(String rowKey, String tableName,
			String[] column1, String[] value1, String[] column2, String[] value2)
			throws IOException {
		Put put = new Put(Bytes.toBytes(rowKey));
		HTable table = new HTable(conf, Bytes.toBytes(tableName));

		HColumnDescriptor[] columnFamilies = table.getTableDescriptor()
				.getColumnFamilies();

		for (int i = 0; i < columnFamilies.length; i++) {
			String familyName = columnFamilies[i].getNameAsString();
			if (familyName.equals("article")) {
				for (int j = 0; j < column1.length; j++) {
					put.add(Bytes.toBytes(familyName),
							Bytes.toBytes(column1[j]), Bytes.toBytes(value1[j]));
				}
			}
			if (familyName.equals("author")) {
				for (int j = 0; j < column2.length; j++) {
					put.add(Bytes.toBytes(familyName),
							Bytes.toBytes(column2[j]), Bytes.toBytes(value2[j]));
				}
			}
		}
		table.put(put);
		System.out.println("add data Success!");
	}

	public static Map<String, String> getResult(String tableName, String rowKey)
			throws IOException {
		Map resultMap = new HashMap();
		Get get = new Get(Bytes.toBytes(rowKey));
		HTable table = new HTable(conf, Bytes.toBytes(tableName));
		Result result = table.get(get);
		System.out.println(result);
		if ((result != null) && (result.list() != null)) {
			for (KeyValue kv : result.list()) {
				System.out.println("family:" + Bytes.toString(kv.getFamily()));
				System.out.println("qualifier:"
						+ Bytes.toString(kv.getQualifier()));
				System.out.println("value:" + Bytes.toString(kv.getValue()));
				System.out.println("Timestamp:" + kv.getTimestamp());
				System.out
						.println("-------------------------------------------");
				resultMap.put(rowKey, Bytes.toString(kv.getValue()));
			}
		} else {
			resultMap.put(rowKey, "");
		}
		return resultMap;
	}

	public static void getResultScann(String tableName) throws IOException {
		Scan scan = new Scan();
		ResultScanner rs = null;
		HTable table = new HTable(conf, Bytes.toBytes(tableName));
		try {
			rs = table.getScanner(scan);
			for (Result r : rs)
				for (KeyValue kv : r.list()) {
					System.out.println("row:" + Bytes.toString(kv.getRow()));
					System.out.println("family:"
							+ Bytes.toString(kv.getFamily()));
					System.out.println("qualifier:"
							+ Bytes.toString(kv.getQualifier()));
					System.out
							.println("value:" + Bytes.toString(kv.getValue()));
					System.out.println("timestamp:" + kv.getTimestamp());
					System.out
							.println("-------------------------------------------");
				}
		} finally {
			rs.close();
		}
	}

	public static void getResultScann(String tableName, String start_rowkey,
			String stop_rowkey) throws IOException {
		Scan scan = new Scan();
		scan.setStartRow(Bytes.toBytes(start_rowkey));
		scan.setStopRow(Bytes.toBytes(stop_rowkey));
		ResultScanner rs = null;
		HTable table = new HTable(conf, Bytes.toBytes(tableName));
		try {
			rs = table.getScanner(scan);
			for (Result r : rs)
				for (KeyValue kv : r.list()) {
					System.out.println("row:" + Bytes.toString(kv.getRow()));
					System.out.println("family:"
							+ Bytes.toString(kv.getFamily()));
					System.out.println("qualifier:"
							+ Bytes.toString(kv.getQualifier()));
					System.out
							.println("value:" + Bytes.toString(kv.getValue()));
					System.out.println("timestamp:" + kv.getTimestamp());
					System.out
							.println("-------------------------------------------");
				}
		} finally {
			rs.close();
		}
	}

	public static void getResultByColumn(String tableName, String rowKey,
			String familyName, String columnName) throws IOException {
		HTable table = new HTable(conf, Bytes.toBytes(tableName));
		Get get = new Get(Bytes.toBytes(rowKey));
		get.addColumn(Bytes.toBytes(familyName), Bytes.toBytes(columnName));
		Result result = table.get(get);
		for (KeyValue kv : result.list()) {
			System.out.println("family:" + Bytes.toString(kv.getFamily()));
			System.out
					.println("qualifier:" + Bytes.toString(kv.getQualifier()));
			System.out.println("value:" + Bytes.toString(kv.getValue()));
			System.out.println("Timestamp:" + kv.getTimestamp());
			System.out.println("-------------------------------------------");
		}
	}

	public static void updateTable(String tableName, String rowKey,
			String familyName, String columnName, String value)
			throws IOException {
		HTable table = new HTable(conf, Bytes.toBytes(tableName));
		Put put = new Put(Bytes.toBytes(rowKey));
		put.add(Bytes.toBytes(familyName), Bytes.toBytes(columnName),
				Bytes.toBytes(value));

		table.put(put);
		System.out.println("update table Success!");
	}

	public static void getResultByVersion(String tableName, String rowKey,
			String familyName, String columnName) throws IOException {
		HTable table = new HTable(conf, Bytes.toBytes(tableName));
		Get get = new Get(Bytes.toBytes(rowKey));
		get.addColumn(Bytes.toBytes(familyName), Bytes.toBytes(columnName));
		get.setMaxVersions(5);
		Result result = table.get(get);
		for (KeyValue kv : result.list()) {
			System.out.println("family:" + Bytes.toString(kv.getFamily()));
			System.out
					.println("qualifier:" + Bytes.toString(kv.getQualifier()));
			System.out.println("value:" + Bytes.toString(kv.getValue()));
			System.out.println("Timestamp:" + kv.getTimestamp());
			System.out.println("-------------------------------------------");
		}
	}

	public static void deleteColumn(String tableName, String rowKey,
			String falilyName, String columnName) throws IOException {
		HTable table = new HTable(conf, Bytes.toBytes(tableName));
		Delete deleteColumn = new Delete(Bytes.toBytes(rowKey));
		deleteColumn.deleteColumns(Bytes.toBytes(falilyName),
				Bytes.toBytes(columnName));

		table.delete(deleteColumn);
		System.out.println(falilyName + ":" + columnName + "is deleted!");
	}

	public static void deleteAllColumn(String tableName, String rowKey)
			throws IOException {
		HTable table = new HTable(conf, Bytes.toBytes(tableName));
		Delete deleteAll = new Delete(Bytes.toBytes(rowKey));
		table.delete(deleteAll);
		System.out.println("all columns are deleted!");
	}

	public static void deleteTable(String tableName) throws IOException {
		HBaseAdmin admin = new HBaseAdmin(conf);
		admin.disableTable(tableName);
		admin.deleteTable(tableName);
		System.out.println(tableName + "is deleted!");
	}

	public static void main(String[] args) throws Exception {
		String tableName = "blog2";
		String[] family = { "article", "author" };

		String[] column1 = { "title", "content", "tag" };
		String[] value1 = {
				"Head First HBase",
				"HBase is the Hadoop database. Use it when you need random, realtime read/write access to your Big Data.",
				"Hadoop,HBase,NoSQL" };

		String[] column2 = { "name", "nickname" };
		String[] value2 = { "nicholas", "lee" };
		addData("rowkey1", "blog2", column1, value1, column2, value2);
		addData("rowkey2", "blog2", column1, value1, column2, value2);
		addData("rowkey3", "blog2", column1, value1, column2, value2);

		getResultScann("blog2", "rowkey4", "rowkey5");

		getResultScann("blog2", "rowkey4", "rowkey5");

		getResult("blog2", "rowkey1");

		getResultByColumn("blog2", "rowkey1", "author", "name");

		updateTable("blog2", "rowkey1", "author", "name", "bin");

		getResultByColumn("blog2", "rowkey1", "author", "name");

		getResultByVersion("blog2", "rowkey1", "author", "name");

		deleteColumn("blog2", "rowkey1", "author", "nickname");

		deleteAllColumn("blog2", "rowkey1");

		deleteTable("blog2");
	}

	static {
		conf = HBaseConfiguration.create();
		conf.set("hbase.zookeeper.quorum", "yp.hsga.nn,yp.hsga.nn2,yp.hsga.nn3");
	}
}