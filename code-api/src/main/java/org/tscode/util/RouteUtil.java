package org.tscode.util;

import org.tscode.request.RequestHandler;

import io.vertx.core.http.HttpMethod;
import io.vertx.ext.web.Route;
import io.vertx.ext.web.Router;

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
		route.consumes("application/json");
		route.handler(Instance.singleton(RequestHandler.class));
		return route;
	}
	// ~ Static Methods ======================================
	// ~ Constructors ========================================
	// ~ Abstract Methods ====================================
	// ~ Override Methods ====================================
	// ~ Methods =============================================
	// ~ Private Methods =====================================
	// ~ Get/Set =============================================
	// ~ hashCode,equals,toString ============================
}
