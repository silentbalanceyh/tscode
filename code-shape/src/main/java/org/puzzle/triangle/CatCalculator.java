package org.puzzle.triangle;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.tscode.shape.Calculator;
import org.tscode.shape.core.Line;
import org.tscode.shape.core.Point;

import io.vertx.core.json.JsonObject;
import net.sf.oval.constraint.NotNull;
import net.sf.oval.constraint.Size;

/**
 * Calculator<Integer,Integer> Here Integer types are only placeholder because
 * line/point's data is useless here. For some complex calculation, this class
 * could be defined and loaded from Class Loader.
 * 
 * @author Lang
 *
 */
public class CatCalculator implements Calculator<Integer, Integer> {
	// ~ Static Fields =======================================
	// ~ Instance Fields =====================================
	// ~ Static Block ========================================
	// ~ Static Methods ======================================
	// ~ Constructors ========================================
	// ~ Abstract Methods ====================================
	// ~ Override Methods ====================================
	/** **/
	@Override
	public JsonObject calc(final List<Point<Integer>> points,
			@NotNull @Size(min = 3, max = 3) final Set<Line<Integer>> lines) {
		final Category category = this.getCategory(lines);
		// TODO: Could define data structure to store required data
		final JsonObject data = new JsonObject();
		data.put("category", category.name());
		return data;
	}

	// ~ Methods =============================================
	// ~ Private Methods =====================================
	private Category getCategory(final Set<Line<Integer>> lines) {
		final Set<Double> lengthes = new HashSet<>();
		for (final Line<Integer> line : lines) {
			lengthes.add(line.getLength());
		}
		return Category.get(lengthes.size());
	}
	// ~ Get/Set =============================================
	// ~ hashCode,equals,toString ============================
}
