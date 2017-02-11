package org.tscode.shape.exp;

import org.tscode.exp.AbstractException;

/**
 * 
 * @author Lang
 *
 */
public class SidesWrongException extends AbstractException {

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
	public SidesWrongException(final Class<?> clazz, final int edges) {
		super(clazz, -10001, edges);
	}
	// ~ Abstract Methods ====================================
	// ~ Override Methods ====================================
	// ~ Methods =============================================
	// ~ Private Methods =====================================
	// ~ Get/Set =============================================
	// ~ hashCode,equals,toString ============================
}
