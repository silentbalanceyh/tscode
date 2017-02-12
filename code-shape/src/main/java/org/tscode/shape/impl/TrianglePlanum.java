package org.tscode.shape.impl;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

import org.tscode.cv.Constants;
import org.tscode.exp.AbstractException;
import org.tscode.exp.shape.InputExceedException;
import org.tscode.exp.shape.SideNonPositiveException;
import org.tscode.exp.shape.TriangleInvalidException;
import org.tscode.shape.Planum;
import org.tscode.shape.Shape;
import org.tscode.shape.core.Line;
import org.tscode.shape.core.Point;

import net.sf.oval.constraint.NotNull;
import net.sf.oval.guard.Guarded;

/**
 * Triangle manager act as container to create triangle There is no @MinSize of
 * OVal for create(...) method because the system must throw special exception
 * out.
 * TODO: Singleton is the best
 * @author Lang
 *
 */
@Guarded
public class TrianglePlanum implements Planum {
	// ~ Static Fields =======================================
	/** **/
	private static final int LIMIT = 3;
	/** The name of current planum **/
	protected static final String NAME = "Triangle";

	// ~ Instance Fields =====================================
	// ~ Static Block ========================================
	// ~ Static Methods ======================================
	// ~ Constructors ========================================
	// ~ Abstract Methods ====================================
	// ~ Override Methods ====================================
	/** **/
	@Override
	public <P, L> Shape<P, L> create(@NotNull final int... sides) throws AbstractException {
		/** 1.Verify inputes **/
		this.verifySide(sides);
		/** 2.Build Shape **/
		return this.build(sides);
	}

	/** **/
	@Override
	public <P, L> Shape<P, L> create(@NotNull final Point<P>[] points) throws AbstractException {
		// TODO: Another complex creation for Map Using
		return null;
	}

	// ~ Methods =============================================
	// ~ Private Methods =====================================
	/** **/
	private <P, L> Shape<P, L> build(final int... sides) {
		final Set<Line<L>> sets = new HashSet<>();
		for (final Integer side : sides) {
			sets.add(new Line<L>(side));
		}
		return new Triangle<P, L>(sets, null);
	}

	/**
	 * @param sides
	 * @return
	 * @throws AbstractException
	 */
	private void verifySide(final int... sides) throws AbstractException {
		// 1.Side Length
		int length = sides.length;
		if (LIMIT < length) {
			throw new InputExceedException(getClass(), "Side", NAME, length, LIMIT);
		}
		// 2.Side range
		final int[] filtered = Arrays.stream(sides).filter(item -> (Constants.ZERO < item)).toArray();
		length = filtered.length;
		if (LIMIT != length) {
			throw new SideNonPositiveException(getClass(), NAME, length);
		}
		// 3.Valid ?
		assert LIMIT == length;
		final boolean valid = (sides[0] + sides[1] > sides[2]) && (sides[0] + sides[2] > sides[1]) && (sides[2] + sides[1] > sides[0]);
		if (!valid) {
			throw new TriangleInvalidException(getClass(), sides);
		}
	}
	// ~ Get/Set =============================================
	// ~ hashCode,equals,toString ============================
}
