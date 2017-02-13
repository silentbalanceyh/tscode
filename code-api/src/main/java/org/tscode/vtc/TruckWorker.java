package org.tscode.vtc;

import org.tscode.centor.LbsDataSyncImpl;
import org.tscode.centor.LbsService;
import org.tscode.util.Instance;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.eventbus.EventBus;
import io.vertx.core.json.JsonObject;

/**
 * 
 * @author Lang
 *
 */
public class TruckWorker extends AbstractVerticle {
	// ~ Static Fields =======================================
	// ~ Instance Fields =====================================
	/** **/
	private transient LbsService serivce = Instance.singleton(LbsDataSyncImpl.class);

	// ~ Static Block ========================================
	// ~ Static Methods ======================================
	// ~ Constructors ========================================
	// ~ Abstract Methods ====================================
	// ~ Override Methods ====================================
	/** 主要方法，重写start **/
	@Override
	public void start() {
		final EventBus bus = vertx.eventBus();
		bus.<JsonObject>consumer("MSG://QUEUE/TRUCKS", handler -> {
			final JsonObject params = handler.body();
			if (null != params)
				System.out.println("Request:" + params.encode());
			final JsonObject response = this.serivce.queryData(params);
			if (null != response)
				System.out.println("Response:" + response.encode());
			handler.reply(response);
		});
	}
	// ~ Methods =============================================
	// ~ Private Methods =====================================
	// ~ Get/Set =============================================
	// ~ hashCode,equals,toString ============================
}
