package org.tscode.shape.core;

import java.io.Serializable;

import org.tscode.exp.AbstractException;

import io.vertx.core.json.JsonObject;
import net.sf.oval.constraint.NotNull;
import net.sf.oval.guard.Guarded;

/**
 * Response to Restful/Service/UI
 * 
 * @author Lang
 *
 */
@Guarded
public class Response implements Serializable {
	// ~ Static Fields =======================================
	/** **/
	private static final long serialVersionUID = 8427697623960056526L;
	// ~ Instance Fields =====================================
	/** **/
	private transient AbstractException error = null;
	/** Returned Data **/
	private transient JsonObject data;

	// ~ Static Block ========================================
	// ~ Static Methods ======================================
	/**
	 * 
	 * @param data
	 * @return
	 */
	public static Response success(@NotNull final JsonObject data) {
		return new Response(data, null);
	}

	/**
	 * 
	 * @param data
	 * @return
	 */
	public static Response failure(@NotNull final AbstractException error) {
		final JsonObject data = new JsonObject();
		data.put("errorCode", error.getErrorCode());
		data.put("errorMessage", error.getErrorMessage());
		return new Response(data, error);
	}

	/**
	 * 
	 * @return
	 */
	public JsonObject getData() {
		return this.data;
	}

	/**
	 * 
	 * @return
	 */
	public AbstractException getError() {
		return this.error;
	}

	// ~ Constructors ========================================
	private Response(final JsonObject data, final AbstractException error) {
		this.data = data;
		this.error = error;
	}
	// ~ Abstract Methods ====================================
	// ~ Override Methods ====================================
	// ~ Methods =============================================
	// ~ Private Methods =====================================
	// ~ Get/Set =============================================
	// ~ hashCode,equals,toString ============================
}
