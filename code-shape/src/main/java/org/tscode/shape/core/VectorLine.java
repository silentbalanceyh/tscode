package org.tscode.shape.core;

import org.tscode.shape.util.Distance;

import net.sf.oval.constraint.NotNull;
import net.sf.oval.guard.Guarded;

/**
 * 
 * @author Lang
 *
 */
@Guarded
public final class VectorLine<T, L> extends Line<L> {
	// ~ Static Fields =======================================
	// ~ Instance Fields =====================================
	/** **/
	private Point<T> start;
	/** **/
	private Point<T> end;
	// ~ Static Block ========================================
	// ~ Static Methods ======================================
	// ~ Constructors ========================================
	/**
	 * 
	 * @param start
	 * @param end
	 */
	public VectorLine(@NotNull final Point<T> start, @NotNull final Point<T> end) {
		super(Double.NaN);
		this.start = start;
		this.end = end;
		// Calculate distance
		this.distance = Distance.calculate(this.start, this.end);
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
	// ~ Methods =============================================
	// ~ Private Methods =====================================
	// ~ Get/Set =============================================
	// ~ hashCode,equals,toString ============================
}
