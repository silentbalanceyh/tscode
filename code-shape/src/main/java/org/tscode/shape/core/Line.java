package org.tscode.shape.core;

import org.tscode.cv.Constants;

import net.sf.oval.constraint.NotNull;
import net.sf.oval.guard.Guarded;

/**
 * 
 * @author Lang
 *
 */
@Guarded
public class Line<L> {
	// ~ Static Fields =======================================
	// ~ Instance Fields =====================================
	/** **/
	protected double distance = Constants.ZERO;
	/** Store data into this line to extend **/
	private L dataRef;
	// ~ Static Block ========================================
	// ~ Static Methods ======================================
	// ~ Constructors ========================================
	/** **/
	public Line(final double distance){
		this.distance = distance;
	}
	// ~ Abstract Methods ====================================
	// ~ Override Methods ====================================
	// ~ Methods =============================================
	/** **/
	public double getLength() {
		return this.distance;
	}

	/** **/
	public void setData(@NotNull final L dataRef) {
		this.dataRef = dataRef;
	}
	/** **/
	public L getData() {
		return this.dataRef;
	}
	// ~ Private Methods =====================================
	// ~ Get/Set =============================================
	// ~ hashCode,equals,toString ============================
}
