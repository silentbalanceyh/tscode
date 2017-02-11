package org.tscode.shape;

import java.util.List;
import java.util.Set;

import org.tscode.shape.core.Line;
import org.tscode.shape.core.Point;

import io.vertx.core.json.JsonObject;

/**
 * Data Calculator
 * 
 * @author Lang
 *
 */
public interface Calculator<P, L> {
	/**
	 * Calculator required data
	 * 
	 * @return
	 */
	JsonObject calc(final List<Point<P>> points, final Set<Line<L>> lines);
}
