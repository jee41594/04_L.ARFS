package model.DM0004;


import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.annotate.JsonProperty;

/**
 * Comment
 */
public class DM0004Request_Body {
	/**
	 * 제목
	 */
	private String title = "";
	/**
	 * 본문
	 */
	private String contents = "";

	public DM0004Request_Body() {
	}

	public DM0004Request_Body(JsonNode jsonNode) {
		this.title = jsonNode.path("title").getTextValue();
		this.contents = jsonNode.path("contents").getTextValue();
	}

	@JsonProperty("title")
	public String getTitle() {
		return this.title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	@JsonProperty("contents")
	public String getContents() {
		return this.contents;
	}

	public void setContents(String contents) {
		this.contents = contents;
	}

	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("DM0004Request_Body [");
		builder.append("title=").append(title);
		builder.append(", ");
		builder.append("contents=").append(contents);
		builder.append("]");
		return builder.toString();
	}
}