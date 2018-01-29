package com.minginglamp;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.hbase.HBaseConfiguration;
import org.mortbay.log.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.data.hadoop.hbase.HbaseTemplate;
import org.springframework.web.client.RestTemplate;

import com.minginglamp.common.PageInquire;
import com.minginglamp.service.ConcernCarService;
import com.minginglamp.service.ConcernPersonService;



@SpringBootApplication
//@EnableSwagger2
public class RchcApiApplication {

	private static final String HBASE_QUORUM = "hbase.zookeeper.quorum";

	@Value("${hbase.zookeeper.quorum}")
	private String quorum;

	@Autowired
	private RestTemplateBuilder builder;

	public static void main(String[] args) throws Exception{
		SpringApplication.run(RchcApiApplication.class, args);
//		ApplicationContext context = SpringApplication.run(RchcApiApplication.class, args);
//		RestTemplate restTemplate = context.getBean(RestTemplate.class);
//		String json = restTemplate.getForObject(args[0],String.class);
//		RelationMap.map.putAll(JsonUtils.readJsonMap(json));
		Log.info("server is started!!!");
	}
	
	/*@Bean
	public Docket createRestApi() {
		return new Docket(DocumentationType.SWAGGER_2).apiInfo(apiInfo()).select()
				.apis(RequestHandlerSelectors.basePackage("com.minginglamp.action")).paths(PathSelectors.any()).build();
	}

	private ApiInfo apiInfo() {
		return new ApiInfoBuilder().title("rchc-api-java 后端接口测试")
				.description("")
				.termsOfServiceUrl("").contact("").version("1.0").build();
	}*/

	@Bean
	public RestTemplate restTemplate() {
		return builder.build();
	}
	
   	//  ScheduledTaskTool
	
	/*@Bean
	public ScheduledTaskTool getScheduledTaskTool() {
		return new ScheduledTaskTool();
	}*/
	
	@Bean
	public PageInquire getPageInquire() {
		return new PageInquire();
	}
	
//	@Bean
//	public JwtCarService getJwtCarService() {
//		return new JwtCarService();
//	}
//	 
//	@Bean
//	public JwtPersonService getJwtPersonService() {
//		return new JwtPersonService();
//	}
	
	@Bean
	public ConcernCarService getConcernCarService() {
		return new ConcernCarService();
	}
	
	@Bean
	public ConcernPersonService getConcernPersonService() {
		return new ConcernPersonService();
	}
	
	/*@Bean
	public ScheduledTaskTool getScheduledTaskTool() {
		return new ScheduledTaskTool();
	}*/
	
//	@Bean
//	public LKCarService getLKCarService(){
//		return new LKCarService();
//	}
//	
//	@Bean
//	public LKPersonService getLKPersonService(){
//		return new LKPersonService();
//	}
	
	@Bean
	public HbaseTemplate hbaseTemplate() {
		Configuration configuration = HBaseConfiguration.create();
		configuration.set(HBASE_QUORUM, quorum);
		return new HbaseTemplate(configuration);
	}
}
