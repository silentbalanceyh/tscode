package org.tscode.exp;

/**
 * Error for Shape
 * 
 * @author Lang
 *
 */
public abstract class AbstractDefinedException extends AbstractException {
	// ~ Static Fields =======================================
	/**
	 * 
	 */
	private static final long serialVersionUID = 6111583610166930483L;

	// ~ Instance Fields =====================================
	/** **/
	private transient final int errorCode;

	// ~ Static Block ========================================
	// ~ Static Methods ======================================
	// ~ Constructors ========================================
	/**
	 * 
	 * @param clazz
	 * @param errorCode
	 * @param args
	 */
	public AbstractDefinedException(final Class<?> clazz, final int errorCode, final Object... args) {
		super(ERROR.getError(clazz, errorCode, args));
		this.errorCode = errorCode;
	}

	// ~ Abstract Methods ====================================
	// ~ Override Methods ====================================
	// ~ Methods =============================================
	/** **/
	@Override
	public int getErrorCode() {
		return this.errorCode;
	}
	// ~ Private Methods =====================================
	// ~ Get/Set =============================================
	// ~ hashCode,equals,toString ============================
}
