package org.tscode.web;

import org.tscode.vtc.RouterAgent;
import org.tscode.vtc.TruckWorker;

import io.vertx.core.DeploymentOptions;
import io.vertx.core.Vertx;
import io.vertx.core.VertxOptions;
import io.vertx.core.impl.VertxFactoryImpl;
import io.vertx.core.spi.VertxFactory;

/**
 * 
 * @author Lang
 *
 */
public class Server {
	// ~ Static Fields =======================================
	/** **/
	private static final VertxFactory FACTORY = new VertxFactoryImpl();

	// ~ Instance Fields =====================================
	// ~ Static Block ========================================
	// ~ Static Methods ======================================
	/**
	 * Starter
	 * 
	 * @param args
	 */
	public static void main(final String[] args) {
		/** TODO: VertxOptions **/
		final VertxOptions opt = new VertxOptions();
		/** Create vertx instances **/
		final Vertx vertxRef = FACTORY.vertx(opt);
		/** TODO: DeploymentOptions **/
		final RouterAgent agent = new RouterAgent();
		vertxRef.deployVerticle(agent);
		/** Deploy **/
		final DeploymentOptions opts = new DeploymentOptions();
		opts.setWorker(true);
		opts.setInstances(32);
		final String workerName = TruckWorker.class.getName();
		vertxRef.deployVerticle(workerName, opts, handler -> {
			System.out.println("Successful to deploy workers: " + workerName + ", Instances = " + opts.getInstances());
		});
	}
	// ~ Constructors ========================================
	// ~ Abstract Methods ====================================
	// ~ Override Methods ====================================
	// ~ Methods =============================================
	// ~ Private Methods =====================================
	// ~ Get/Set =============================================
	// ~ hashCode,equals,toString ============================
}
