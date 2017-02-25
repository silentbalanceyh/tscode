package org.tscode.vtc;

import org.tscode.centor.LbsLocalImpl;
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
public class TruckPostWorker extends AbstractVerticle {
	// ~ Static Fields =======================================
	// ~ Instance Fields =====================================
	/** **/
	private transient LbsService serivce = Instance.singleton(LbsLocalImpl.class);

	// ~ Static Block ========================================
	// ~ Static Methods ======================================
	// ~ Constructors ========================================
	// ~ Abstract Methods ====================================
	// ~ Override Methods ====================================
	/** 主要方法，重写start **/
	@Override
	public void start() {
		final EventBus bus = vertx.eventBus();
		bus.<JsonObject>consumer("MSG://QUEUE/INCRE", handler -> {
			final JsonObject params = handler.body();
			final String key = params.getString("KEY");
			JsonObject response = null;
			if(null != key && "GET".equals(key)){
				response = this.serivce.getAll();
			}else{
				response = this.serivce.increase(params);
			}
			if (null != params)
				System.out.println("Request:" + params.encode());
			handler.reply(response);
		});
	}
	// ~ Methods =============================================
	// ~ Private Methods =====================================
	// ~ Get/Set =============================================
	// ~ hashCode,equals,toString ============================
}
