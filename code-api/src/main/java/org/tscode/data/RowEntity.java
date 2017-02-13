package org.tscode.data;

import io.vertx.core.json.JsonObject;
import net.sf.oval.constraint.NotNull;
import net.sf.oval.guard.Guarded;

/**
 * 
 * @author Lang
 *
 */
@Guarded
public class RowEntity {
	// ~ Static Fields =======================================
	// ~ Instance Fields =====================================
	/** **/
	private transient JsonObject data;
	// ~ Static Block ========================================
	// ~ Static Methods ======================================
	// ~ Constructors ========================================
	/** **/
	public RowEntity(@NotNull final JsonObject data){
		this.data = data;
	}
	// ~ Abstract Methods ====================================
	// ~ Override Methods ====================================
	// ~ Methods =============================================
	/** 1.Get Data **/
	public JsonObject getData(){
		return this.data;
	}
	// ~ Private Methods =====================================
	// ~ Get/Set =============================================
	// ~ hashCode,equals,toString ============================
}
