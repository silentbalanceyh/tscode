package org.tscode.request;

import io.vertx.core.Handler;
import io.vertx.core.Vertx;
import io.vertx.core.eventbus.EventBus;
import io.vertx.core.http.HttpHeaders;
import io.vertx.core.http.HttpServerResponse;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.RoutingContext;

public class LinkHandler implements Handler<RoutingContext> {
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
		params.put("KEY","UPDATE");
		bus.<JsonObject>send("MSG://QUEUE/LINKS", params, handler -> {
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
		return new JsonObject(event.getBodyAsString());
	}
}