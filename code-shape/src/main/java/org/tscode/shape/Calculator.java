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
public interface Calculator {
	/**
	 * Calculator required data
	 * 
	 * @return
	 */
	<P, L> JsonObject calc(final Set<Line<L>> lines, final List<Point<P>> points);
}
