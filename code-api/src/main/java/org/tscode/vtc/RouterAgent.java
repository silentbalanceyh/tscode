package org.tscode.vtc;

import org.tscode.config.Inceptor;
import org.tscode.cv.FilePath;
import org.tscode.util.RouteUtil;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.http.HttpServer;
import io.vertx.core.http.HttpServerOptions;
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
	/** **/
	private static final Inceptor LOADER = Inceptor.get(FilePath.OPT_SERVER);
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
		final HttpServerOptions opts = new HttpServerOptions();
		opts.setHost(LOADER.getString("server.host"));
		opts.setPort(LOADER.getInt("server.port"));
		final HttpServer server = vertx.createHttpServer(opts);
		/** Set Router **/
		final Router router = Router.router(vertx);
		/** Temp code **/
		{
			/** 1.Cross Domain **/
			RouteUtil.registerCors(router);
			RouteUtil.registerBody(router);
			/** 2.Common Api **/
			RouteUtil.registerTrucks(router);

			RouteUtil.registerIncrease(router);
			
			RouteUtil.registerLinks(router);
		}
		/** **/
		server.requestHandler(router::accept).listen();
		System.out.println("Successful to deploy!");
	}
	// ~ Methods =============================================
	// ~ Private Methods =====================================
	// ~ Get/Set =============================================
	// ~ hashCode,equals,toString ============================
}
