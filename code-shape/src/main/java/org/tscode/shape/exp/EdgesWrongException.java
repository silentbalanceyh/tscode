package org.tscode.shape.exp;

import org.tscode.exp.AbstractException;

/**
 * 
 * @author Lang
 *
 */
public class EdgesWrongException extends AbstractException {

	/**
	 * 
	 */
	private static final long serialVersionUID = -4501913010452031928L;

	// ~ Static Fields =======================================
	// ~ Instance Fields =====================================
	// ~ Static Block ========================================
	// ~ Static Methods ======================================
	// ~ Constructors ========================================
	/** **/
	public EdgesWrongException(final Class<?> clazz, final int edges) {
		super(clazz, -10001, edges);
	}
	// ~ Abstract Methods ====================================
	// ~ Override Methods ====================================
	// ~ Methods =============================================
	// ~ Private Methods =====================================
	// ~ Get/Set =============================================
	// ~ hashCode,equals,toString ============================
}
