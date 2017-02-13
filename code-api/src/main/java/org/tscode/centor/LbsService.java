package org.tscode.centor;

import io.vertx.core.json.JsonObject;

/**
 * 
 * @author Lang
 *
 */
public interface LbsService {
	/** **/
	JsonObject queryData(JsonObject params);
}
