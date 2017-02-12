package org.tscode.exp.shape;

import org.tscode.exp.AbstractException;

/**
 * 
 * @author Lang
 *
 */
public final class SideNonPositiveException extends AbstractException{
	// ~ Static Fields =======================================
	/**
	 * 
	 */
	private static final long serialVersionUID = -4515651327316297985L;
	// ~ Instance Fields =====================================
	// ~ Static Block ========================================
	// ~ Static Methods ======================================
	// ~ Constructors ========================================
	/**
	 * 
	 * @param clazz
	 * @param shapeName
	 * @param current
	 */
	public SideNonPositiveException(final Class<?> clazz, final String shapeName, final int current){
		super(clazz, -10002, shapeName, current);
	}
	// ~ Abstract Methods ====================================
	// ~ Override Methods ====================================
	// ~ Methods =============================================
	// ~ Private Methods =====================================
	// ~ Get/Set =============================================
	// ~ hashCode,equals,toString ============================
}
