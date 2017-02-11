package org.tscode.shape;

import java.util.List;
import java.util.Set;

import org.tscode.shape.core.Line;
import org.tscode.shape.core.Point;

import io.vertx.core.json.JsonObject;

/**
 * Build Triangle shape
 * 
 * @author Lang
 *
 */
public interface Shape<P, L> {
	/**
	 * Get all Points, provide sequence of points to build vectors.
	 * 
	 * @return
	 */
	List<Point<P>> getPoints();

	/**
	 * Get all Lines
	 * 
	 * @return
	 */
	Set<Line<L>> getLines();

	/**
	 * Get shape data
	 * 
	 * @return
	 */
	JsonObject getData();

	/**
	 * Shape connect to calculator will refresh Data
	 */
	void connect(Calculator calculator);
}
