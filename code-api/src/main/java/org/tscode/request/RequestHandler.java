package org.tscode.request;

import io.vertx.core.Handler;
import io.vertx.core.Vertx;
import io.vertx.core.eventbus.EventBus;
import io.vertx.core.http.HttpHeaders;
import io.vertx.core.http.HttpServerRequest;
import io.vertx.core.http.HttpServerResponse;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.RoutingContext;

/**
 * Vertx Fixed Handler
 * 
 * @author Lang
 *
 */
public class RequestHandler implements Handler<RoutingContext> {
	// ~ Static Fields =======================================
	// ~ Instance Fields =====================================
	// ~ Static Block ========================================
	// ~ Static Methods ======================================
	// ~ Constructors ========================================
	// ~ Abstract Methods ====================================
	// ~ Override Methods ====================================
	@Override
	public void handle(final RoutingContext event) {
		/** **/
		final Vertx vertx = event.vertx();
		final EventBus bus = vertx.eventBus();
		final JsonObject params = extractParams(event);
		/** **/
		bus.<JsonObject>send("MSG://QUEUE/TRUCKS", params, handler -> {
			/** **/
			final HttpServerResponse response = event.response();
	        response.headers().add(HttpHeaders.CONTENT_TYPE,"application/json");
			// DEBUG
			if(null != handler.cause()){
				handler.cause().printStackTrace();
			}
			if (handler.succeeded()) {
				final JsonObject data = handler.result().body();
				response.setStatusCode(200);
				response.end(data.encode());
			} else {
				final JsonObject data = new JsonObject().put("error", "Internal Server Error");
				response.setStatusCode(500);
				response.end(data.encode());
			}
		});
	}
	// ~ Methods =============================================
	// ~ Private Methods =====================================
	private JsonObject extractParams(final RoutingContext event){
		/** Get Parameters **/
		final HttpServerRequest request = event.request();
		final JsonObject params = new JsonObject();
		params.put("longitude",Double.parseDouble(request.getParam("lng")));
		params.put("latitude",Double.parseDouble(request.getParam("lat")));
		// Convert KM to m
		params.put("distance", Double.parseDouble(request.getParam("distance")) * 1000);
		return params;
	}
	// ~ Get/Set =============================================
	// ~ hashCode,equals,toString ============================
}
