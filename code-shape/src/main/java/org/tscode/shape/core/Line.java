package org.tscode.shape.core;

import net.sf.oval.constraint.NotNull;
import net.sf.oval.guard.Guarded;

/**
 * 
 * @author Lang
 *
 */
@Guarded
public final class Line<T, L> {
	// ~ Static Fields =======================================
	// ~ Instance Fields =====================================
	/** **/
	private Point<T> start = new Point<>();
	/** **/
	private Point<T> end = new Point<>();
	/** Store data into this line to extend **/
	private L dataRef;
	// ~ Static Block ========================================
	// ~ Static Methods ======================================
	// ~ Constructors ========================================
	/**
	 * 
	 * @param start
	 * @param end
	 */
	public Line(@NotNull final Point<T> start, @NotNull final Point<T> end) {
		this.start = start;
		this.end = end;
	}

	// ~ Abstract Methods ====================================
	// ~ Override Methods ====================================
	/** **/
	public Point<T> getStart() {
		return this.start;
	}

	/** **/
	public Point<T> getEnd() {
		return this.end;
	}

	/** **/
	public L getData() {
		return this.dataRef;
	}

	/** **/
	public void setData(@NotNull final L dataRef) {
		this.dataRef = dataRef;
	}
	// ~ Methods =============================================
	// ~ Private Methods =====================================
	// ~ Get/Set =============================================
	// ~ hashCode,equals,toString ============================
}
