package model.DM0001;


import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.annotate.JsonProperty;

/**
 * Comment
 */
public class DM0001Response_Body {
	/**
	 * userName
	 */
	private String userName = "";

	public DM0001Response_Body() {
	}

	public DM0001Response_Body(JsonNode jsonNode) {
		this.userName = jsonNode.path("userName").getTextValue();
	}

	@JsonProperty("userName")
	public String getUserName() {
		return this.userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("DM0001Response_Body [");
		builder.append("userName=").append(userName);
		builder.append("]");
		return builder.toString();
	}
}