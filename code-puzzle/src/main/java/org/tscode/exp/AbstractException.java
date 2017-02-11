package org.tscode.exp;

import org.tscode.util.ErrorLoader;

/**
 * Defined base checked exception
 * 
 * @author Lang
 *
 */
public abstract class AbstractException extends Exception {
	// ~ Static Fields =======================================
	/**
	 * 
	 */
	private static final long serialVersionUID = 5453108138099693236L;
	/** **/
	protected static final ErrorLoader ERROR = ErrorLoader.getInstance();
	// ~ Instance Fields =====================================
	/** **/
	protected transient String errorMsg;
	// ~ Static Block ========================================
	// ~ Static Methods ======================================
	// ~ Constructors ========================================
	/**
	 * 
	 * @param message
	 */
	public AbstractException(final String message) {
		super(message);
		this.errorMsg = message;
	}

	// ~ Abstract Methods ====================================
	/**
	 * Error code to identifier error details
	 * 
	 * @return
	 */
	public abstract int getErrorCode();

	// ~ Override Methods ====================================
	// ~ Methods =============================================
	/**
	 * @return
	 */
	public String getErrorMessage() {
		return this.errorMsg;
	}
	// ~ Private Methods =====================================
	// ~ Get/Set =============================================
	// ~ hashCode,equals,toString ============================
}
