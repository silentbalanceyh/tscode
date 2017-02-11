package org.tscode.shape;

import org.tscode.exp.AbstractException;
import org.tscode.shape.core.Point;

/**
 * Create planum
 * 
 * @author Lang
 *
 */
public interface Planum {
	/**
	 * Create Shape -> By Sides
	 * 
	 * @param sides
	 * @return
	 */
	<P, L> Shape<P, L> create(final int... sides) throws AbstractException;

	/**
	 * Create Planum -> By Points
	 * 
	 * @param points
	 * @return
	 */
	<P, L> Shape<P, L> create(final Point<P>[] points) throws AbstractException;
}
