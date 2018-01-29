package com.minginglamp;

import com.minginglamp.utils.JsonUtils;
import com.minginglamp.utils.RelationMap;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.hbase.HBaseConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.data.hadoop.hbase.HbaseTemplate;
import org.springframework.web.client.RestTemplate;


@SpringBootApplication
public class BjhcApiApplication {

	private static final String HBASE_QUORUM = "hbase.zookeeper.quorum";

	@Value("${hbase.zookeeper.quorum}")
	private String quorum;

	@Autowired
	private RestTemplateBuilder builder;

	public static void main(String[] args) {
		ApplicationContext context = SpringApplication.run(BjhcApiApplication.class, args);
		RestTemplate restTemplate = context.getBean(RestTemplate.class);
		String json = restTemplate.getForObject(args[0],String.class);
		RelationMap.map.putAll(JsonUtils.readJsonMap(json));
	}

	@Bean
	public RestTemplate restTemplate() {
		return builder.build();
	}

	@Bean
	public HbaseTemplate hbaseTemplate() {
		Configuration configuration = HBaseConfiguration.create();
		configuration.set(HBASE_QUORUM, quorum);
		return new HbaseTemplate(configuration);
	}
}
