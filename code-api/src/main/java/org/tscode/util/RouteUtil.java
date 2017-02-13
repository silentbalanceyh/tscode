package org.tscode.util;

import org.tscode.request.RequestHandler;

import io.vertx.core.Handler;
import io.vertx.core.http.HttpMethod;
import io.vertx.ext.web.Route;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;
import io.vertx.ext.web.handler.CorsHandler;

/**
 * 
 * @author Lang
 *
 */
public class RouteUtil {
	// ~ Static Fields =======================================
	// ~ Instance Fields =====================================
	// ~ Static Block ========================================
	/** **/
	public static Route registerTrucks(final Router router) {
		final Route route = router.route();
		route.path("/api/trucks");
		route.method(HttpMethod.GET);
		// Resevered
		// route.consumes("application/json");
		route.order(10000);
		route.handler(Instance.singleton(RequestHandler.class));
		return route;
	}
	/** **/
	public static Route registerCors(final Router router){
		final Route route = router.route();
		// Filtered all cross domain request
		route.path("/api/*");
		route.order(0);
		route.handler(buildCors());
		return route;
	}
	// ~ Static Methods ======================================
	// ~ Constructors ========================================
	// ~ Abstract Methods ====================================
	// ~ Override Methods ====================================
	// ~ Methods =============================================
	// ~ Private Methods =====================================
	/**
	 * Cross Domain Handler
	 * @return
	 */
	private static Handler<RoutingContext> buildCors(){
		final CorsHandler handler = CorsHandler.create("*");
		handler.allowCredentials(false);
		final String[] headers = new String[]{"Content-Type","Content-Length","Accept","Authorization"};
		for(final String header: headers){
			handler.allowedHeader(header);
		}
		final HttpMethod[] methods = new HttpMethod[]{HttpMethod.GET,HttpMethod.OPTIONS};
		for(final HttpMethod method: methods){
			handler.allowedMethod(method);
		}
		return handler;
	}
	// ~ Get/Set =============================================
	// ~ hashCode,equals,toString ============================
}
