package org.tscode.exp.shape;

import org.tscode.exp.AbstractException;
/**
 * 
 * @author Lang
 *
 */
public class TriangleInvalidException extends AbstractException{
	// ~ Static Fields =======================================
	/**
	 * 
	 */
	private static final long serialVersionUID = -3745001699013542159L;
	// ~ Instance Fields =====================================
	// ~ Static Block ========================================
	// ~ Static Methods ======================================
	// ~ Constructors ========================================
	/**
	 * 
	 * @param clazz
	 * @param sides
	 */
	public TriangleInvalidException(final Class<?> clazz, final int... sides){
		super(clazz, -10003, sides);
	}
	// ~ Abstract Methods ====================================
	// ~ Override Methods ====================================
	// ~ Methods =============================================
	// ~ Private Methods =====================================
	// ~ Get/Set =============================================
	// ~ hashCode,equals,toString ============================
}
