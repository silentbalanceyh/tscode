package org.tscode.cv;

/**
 * Define interface to store constant key for fixed config file path
 * 
 * @author Lang
 *
 */
public interface FilePath {
	/**
	 * System config file path
	 */
	String PATH_ROOT = "config.properties";

	/**
	 * Error config file.
	 */
	String CFG_ERROR = "file.config.errors";

	/**
	 * Vertx Options file.
	 */
	String OPT_VERTX = "file.vertx.opts";
	/**
	 * Server Options
	 */
	String OPT_SERVER = "file.server.opts";
}
