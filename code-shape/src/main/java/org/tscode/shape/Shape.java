package org.tscode.shape;

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
	 * Check whether Shape is valid
	 * 
	 * @return
	 */
	boolean valid();
	/**
	 * Get all Points
	 * 
	 * @return
	 */
	Set<Point<P>> getPoints();
	/**
	 * Get all Lines
	 * 
	 * @return
	 */
	Set<Line<P, L>> getLines();

	/**
	 * Get shape data
	 * 
	 * @return
	 */
	JsonObject getData();
}
