package org.tscode.shape.exp;

import org.tscode.exp.AbstractException;

/**
 * 
 * @author Lang
 *
 */
public final class InputExceedException extends AbstractException {
	/**
	 * 
	 */
	private static final long serialVersionUID = -4501913010452031928L;

	// ~ Static Fields =======================================
	// ~ Instance Fields =====================================
	// ~ Static Block ========================================
	// ~ Static Methods ======================================
	// ~ Constructors ========================================
	/**
	 * 
	 * @param clazz
	 * @param shapeName
	 * @param sides
	 * @param limit
	 */
	public InputExceedException(final Class<?> clazz, final String shapeName, final String category, final int current,
			final int limit) {
		super(clazz, -10001, shapeName, category, current, limit);
	}
	// ~ Abstract Methods ====================================
	// ~ Override Methods ====================================
	// ~ Methods =============================================
	// ~ Private Methods =====================================
	// ~ Get/Set =============================================
	// ~ hashCode,equals,toString ============================
}
