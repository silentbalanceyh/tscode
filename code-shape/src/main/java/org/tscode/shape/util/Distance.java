package org.tscode.shape.util;

import org.tscode.shape.core.Point;

import net.sf.oval.constraint.NotNull;
import net.sf.oval.guard.Guarded;

/**
 * 
 * @author Lang
 *
 */
@Guarded
public final class Distance {
	// ~ Static Fields =======================================
	// ~ Instance Fields =====================================
	// ~ Static Block ========================================
	// ~ Static Methods ======================================
	/**
	 * 
	 * @param start
	 * @param end
	 * @return
	 */
	public static <T> double calculate(@NotNull final Point<T> start, @NotNull final Point<T> end) {
		/** 1.Calculate (x1 - x2)2 + (y1 - y2)2 **/
		final double x2 = Math.pow((start.getX() - end.getX()), 2);
		final double y2 = Math.pow((start.getY() - end.getY()), 2);
		/** 2.Check Z **/
		double sum = x2 + y2;
		if (Double.NaN != start.getZ() && Double.NaN != end.getZ()) {
			/** + (z1 - z2)2 **/
			final double z2 = Math.pow((start.getZ() - end.getZ()), 2);
			sum += z2;
		}
		assert 0 <= sum;
		/** 3.Set distance **/
		return Math.sqrt(sum);
	}

	// ~ Constructors ========================================
	private Distance() {
	}
	// ~ Abstract Methods ====================================
	// ~ Override Methods ====================================
	// ~ Methods =============================================
	// ~ Private Methods =====================================
	// ~ Get/Set =============================================
	// ~ hashCode,equals,toString ============================
}
