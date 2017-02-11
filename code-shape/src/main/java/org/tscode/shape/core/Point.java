package org.tscode.shape.core;

import org.tscode.cv.Constants;
import org.tscode.cv.Symbol;

import net.sf.oval.constraint.NotNull;
import net.sf.oval.guard.Guarded;

/**
 * Point
 * 
 * @author Lang
 *
 */
@Guarded
public final class Point<T> {
	// ~ Static Fields =======================================
	// ~ Instance Fields =====================================
	/** X Pos **/
	private double xPos = Constants.ZERO;
	/** Y Pos **/
	private double yPos = Constants.ZERO;
	/** Z Pos: Resevered **/
	private double zPos = Constants.ZERO;
	/** Store data into this point to extend **/
	private T dataRef;

	// ~ Static Block ========================================
	// ~ Static Methods ======================================
	// ~ Constructors ========================================
	/** Origin **/
	public Point() {
		this.xPos = Constants.ZERO;
		this.yPos = Constants.ZERO;
		this.zPos = Constants.ZERO;
	}

	/** **/
	public Point(final double xPos, final double yPos) {
		this.setLocation(xPos, yPos);
	}

	/** **/
	public Point(final double xPos, final double yPos, final double zPos) {
		this.setLocation(xPos, yPos, zPos);
	}
	// ~ Abstract Methods ====================================
	// ~ Override Methods ====================================
	// ~ Methods =============================================
	/** **/
	public void setLocation(final double xPos, final double yPos) {
		this.setLocation(xPos, yPos, Constants.ZERO);
	}
	/** **/
	public void setLocation(final double xPos, final double yPos, final double zPos) {
		this.xPos = xPos;
		this.yPos = yPos;
		this.zPos = zPos;
	}
	/** **/
	public T getData() {
		return dataRef;
	}

	/** **/
	public void setData(@NotNull final T dataRef) {
		this.dataRef = dataRef;
	}

	/** **/
	public double getX() {
		return this.xPos;
	}

	/** **/
	public double getY() {
		return this.yPos;
	}

	/** **/
	public double getZ() {
		return this.zPos;
	}
	// ~ Private Methods =====================================
	// ~ Get/Set =============================================
	// ~ hashCode,equals,toString ============================

	/** **/
	@Override
	public String toString() {
		final StringBuilder ret = new StringBuilder(Constants.BLD_DFT_SIZE);
		ret.append(Symbol.BRACKET_ML).append("x=").append(this.xPos).append(Symbol.COMMA);
		ret.append("y=").append(this.yPos);
		if (Constants.INVALID != this.zPos) {
			ret.append(Symbol.COMMA).append("z=").append(this.zPos);
		}
		ret.append(Symbol.BRACKET_MR);
		return ret.toString();
	}

	/** **/
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		long temp;
		temp = Double.doubleToLongBits(xPos);
		result = prime * result + (int) (temp ^ (temp >>> 32));
		temp = Double.doubleToLongBits(yPos);
		result = prime * result + (int) (temp ^ (temp >>> 32));
		temp = Double.doubleToLongBits(zPos);
		result = prime * result + (int) (temp ^ (temp >>> 32));
		return result;
	}

	/** **/
	@Override
	@SuppressWarnings("unchecked")
	public boolean equals(final Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		final Point<T> other = (Point<T>) obj;
		if (Double.doubleToLongBits(xPos) != Double.doubleToLongBits(other.xPos))
			return false;
		if (Double.doubleToLongBits(yPos) != Double.doubleToLongBits(other.yPos))
			return false;
		if (Double.doubleToLongBits(zPos) != Double.doubleToLongBits(other.zPos))
			return false;
		return true;
	}
}
