package org.tscode.vtc;

import org.tscode.util.RouteUtil;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.http.HttpServer;
import io.vertx.ext.web.Router;
import net.sf.oval.guard.Guarded;

/**
 * 
 * @author Lang
 *
 */
@Guarded
public class RouterAgent extends AbstractVerticle {
	// ~ Static Fields =======================================
	// ~ Instance Fields =====================================
	// ~ Static Block ========================================
	// ~ Static Methods ======================================
	// ~ Constructors ========================================
	// ~ Abstract Methods ====================================
	// ~ Override Methods ====================================
	/** **/
	@Override
	public void start() {
		/** Default Options **/
		final HttpServer server = vertx.createHttpServer();
		/** Set Router **/
		final Router router = Router.router(vertx);
		/** Temp code **/
		{
			/** 1.Cross Domain **/
			RouteUtil.registerCors(router);
			/** 2.Common Api **/
			RouteUtil.registerTrucks(router);
		}
		/** **/
		server.requestHandler(router::accept).listen(8083);
		System.out.println("Successful to deploy!");
	}
	// ~ Methods =============================================
	// ~ Private Methods =====================================
	// ~ Get/Set =============================================
	// ~ hashCode,equals,toString ============================
}
