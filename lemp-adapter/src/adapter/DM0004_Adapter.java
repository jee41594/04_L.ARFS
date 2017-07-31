package adapter;

import java.util.HashMap;

import kr.co.ldcc.lemp.adapter.AbstractTemplateAdapter;
import kr.co.ldcc.lemp.adapter.DBAdapter;
import kr.co.ldcc.lemp.hybrid.adapter.api.Adapter;
import kr.co.ldcc.lemp.hybrid.adapter.api.IAdapterJob;
import kr.co.ldcc.lemp.hybrid.common.server.JsonAdaptorObject;
import model.DM0004.DM0004Request;
import model.DM0004.DM0004Request_Body;
import model.DM0004.DM0004Response;
import model.header.DMheader;

import org.codehaus.jackson.node.ObjectNode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import common.CodesEx;

@Adapter(trcode = { "DM0004" })
public class DM0004_Adapter extends AbstractTemplateAdapter implements
		IAdapterJob {

	private static final Logger logger = LoggerFactory
			.getLogger(DM0004_Adapter.class);
	@Autowired
	private DBAdapter dbAdapter;

	public JsonAdaptorObject onProcess(JsonAdaptorObject obj) {
		
		DM0004Request request = new DM0004Request(obj);
		DMheader header = request.getHeader();
		DM0004Request_Body reqBody = request.getBody();
		ObjectNode sessionNode = (ObjectNode) obj.get(JsonAdaptorObject.TYPE.META);
		
		try {
			String title = reqBody.getTitle();
			String contents = reqBody.getContents();
			String userId = sessionNode.get("userid").getTextValue();

			HashMap<String, Object> inputPrameterMap = new HashMap<String, Object>();
			inputPrameterMap.put("title", title);
			inputPrameterMap.put("contents", contents);
			inputPrameterMap.put("userId", userId);
			int insertResult = dbAdapter.insert("LegacyDB", "DM0004.4001", inputPrameterMap);
			
		
			if (insertResult < 1) {
				logger.error("게시물 등록 실패!!");
				return makeFailResponse("DM0004ERR002", "게시물 등록 중 오류가 발생했습니다.");
			}
			
			DM0004Response response = new DM0004Response();
			response.setHeader(header);
			return makeResponse(obj, response.toJsonNode());
			
		} catch (Exception e) {
			logger.error("어뎁터 에러", e);
			return makeFailResponse("DM0004ERR001", "어뎁터에서 로직 처리중 에러가 발생 하였습니다");
		}
	}

}
