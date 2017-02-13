package org.tscode.sev;

import org.junit.Test;
import org.tscode.centor.LbsLocalImpl;
import org.tscode.centor.LbsService;
import org.tscode.util.IOKit;
import org.tscode.util.Instance;

import io.vertx.core.json.JsonObject;

/**
 * 
 * @author Lang
 *
 */
public class LbsTestCase {
	// ~ Static Fields =======================================
	// ~ Instance Fields =====================================
	/** **/
	private transient LbsService serivce = Instance.singleton(LbsLocalImpl.class);
	// ~ Static Block ========================================
	// ~ Static Methods ======================================
	// ~ Constructors ========================================
	// ~ Abstract Methods ====================================
	// ~ Override Methods ====================================
	// ~ Methods =============================================
	/** **/
	@Test
	public void testResult(){
		/** **/
		final JsonObject params = IOKit.getJObject("test/query1.json");
		final JsonObject result = this.serivce.queryLocal(params);
		System.out.println(result.encodePrettily());
	}
	// ~ Private Methods =====================================
	// ~ Get/Set =============================================
	// ~ hashCode,equals,toString ============================
}
