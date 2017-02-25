package org.tscode.centor;

import io.vertx.core.json.JsonObject;

/**
 * 
 * @author Lang
 *
 */
public interface LbsService {
	/** **/
	JsonObject queryLocal(JsonObject params);
	/** **/
	JsonObject queryRemote(JsonObject params);
	/** **/
	JsonObject increase(JsonObject params);
	/** **/
	JsonObject getAll();
}
