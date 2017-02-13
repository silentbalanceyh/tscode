package org.tscode.vtc;

import java.util.Properties;

import org.tscode.cv.FilePath;
import org.tscode.util.ConfigLoader;
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
	private static final Properties LOADER = ConfigLoader.get(FilePath.OPT_SERVER);
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
		opts.setHost(LOADER.getProperty("server.host"));
		final HttpServer server = vertx.createHttpServer(opts);
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
