package adapter;

import java.util.HashMap;

import model.DM0001.DM0001Request;
import model.DM0001.DM0001Request_Body;
import model.DM0001.DM0001Response;
import model.DM0001.DM0001Response_Body;
import model.header.DMheader;

import org.codehaus.jackson.node.ObjectNode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import common.CodesEx;

import data.UserInfo;
import kr.co.ldcc.common.util.JsonUtil;
import kr.co.ldcc.lemp.adapter.AbstractTemplateAdapter;
import kr.co.ldcc.lemp.adapter.DBAdapter;
import kr.co.ldcc.lemp.hybrid.adapter.api.Adapter;
import kr.co.ldcc.lemp.hybrid.adapter.api.IAdapterJob;
import kr.co.ldcc.lemp.hybrid.common.server.JsonAdaptorObject;

@Adapter(trcode = { "TT0002" })
public class DM0002_Adapter extends AbstractTemplateAdapter implements
		IAdapterJob {

	private static final Logger logger = LoggerFactory
			.getLogger(DM0002_Adapter.class);
	@Autowired
	private DBAdapter dbAdapter;

	public JsonAdaptorObject onProcess(JsonAdaptorObject obj) {
		
		DM0001Request request = new DM0001Request(obj);
		DMheader header = request.getHeader();
		DM0001Request_Body reqBody = request.getBody();
		
		ObjectNode sessionNode = (ObjectNode) obj.get(JsonAdaptorObject.TYPE.META);
		
		try {
			String userId = reqBody.getUserId();
			String passWord = reqBody.getPassword();
			
			logger.info("유저 아이디 {}", userId);
			logger.info("패스 워드 {}", passWord);
			
			HashMap<String, Object> inputPrameterMap = new HashMap<String, Object>();
			inputPrameterMap.put("userId", userId);
			
			UserInfo userInfo = (UserInfo) dbAdapter.selectOne(CodesEx.DATA_SOURCE_DEMO_LEGACYDB, "DM0001.1001", inputPrameterMap);
			
			if (userInfo == null) {
				logger.info("사용자 정보 없음 {}");
				return makeFailResponse("DM0001ERR001", "사용자 정보를 확인 해주세요");
			}
			
			if (!passWord.equals(userInfo.getPassword())) {
				logger.info("사용자 패스워드 틀림");
				return makeFailResponse("DM0001ERR001", "사용자 정보를 확인 해주세요");
			}
			
			if (sessionNode != null) {
				JsonUtil.putValue(sessionNode, "username", userInfo.getUserName());
				JsonUtil.putValue(sessionNode, "userid", userInfo.getUserId());
				JsonUtil.putValue(sessionNode, "deptname", userInfo.getDeptName());
			}
			
			DM0001Response response = new DM0001Response();
			DM0001Response_Body resBody = new DM0001Response_Body();
			resBody.setUserName(userInfo.getUserName());
			
			response.setHeader(header);
			response.setBody(resBody);
			
			return makeResponse(obj, response.toJsonNode());
			
		} catch (Exception e) {
			logger.error("예상치 못한 익셉션 : {}", e);
			return makeFailResponse("DM0001ERR001","어뎁터 로직 처리중 에러 발생함");
		}
	}
}
