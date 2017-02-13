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
	/** Earth Radius **/
	private static final double EARTH_RADIUS = 6378.137;

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

	/**
	 * 
	 * @param fromLat
	 * @param fromLng
	 * @param toLat
	 * @param toLng
	 * @return
	 */
	public static <T> double calculate(final double fromLat, final double fromLng, final double toLat,
			final double toLng) {
		double radLat1 = rad(fromLat);
		double radLat2 = rad(toLat);
		double lat = radLat1 - radLat2;
		double lng = rad(fromLng) - rad(toLng);
		double distance = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(lat / 2), 2)
				+ Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(lng / 2), 2)));
		distance = distance * EARTH_RADIUS;
		distance = Math.round(distance * 10000) / 10;
		return distance;
	}

	// ~ Constructors ========================================
	private Distance() {
	}

	// ~ Abstract Methods ====================================
	// ~ Override Methods ====================================
	// ~ Methods =============================================
	// ~ Private Methods =====================================
	private static double rad(double d) {
		return d * Math.PI / 180.0;
	}
	// ~ Get/Set =============================================
	// ~ hashCode,equals,toString ============================
}
