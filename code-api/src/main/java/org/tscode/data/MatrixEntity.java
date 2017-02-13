package org.tscode.data;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.tscode.shape.util.Distance;
import org.tscode.util.Log;
import org.tscode.vtc.Searcher;

import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import net.sf.oval.constraint.NotNull;
import net.sf.oval.guard.Guarded;

/**
 * Parse raw data
 * 
 * @author Lang
 *
 */
@Guarded
public class MatrixEntity {
	// ~ Static Fields =======================================
	/** **/
	private static Logger LOGGER = LoggerFactory.getLogger(MatrixEntity.class);
	// ~ Instance Fields =====================================
	/**
	 * Field -> Index
	 */
	private transient List<String> fields = new ArrayList<>();
	/**
	 * Data
	 */
	private transient List<RowEntity> data = new ArrayList<>();

	// ~ Static Block ========================================
	// ~ Static Methods ======================================
	// ~ Constructors ========================================
	/** **/
	public MatrixEntity(@NotNull final JsonObject raw) {
		/** 1.Fill fields **/
		this.fields = RawParser.getFields(Searcher.lookup(raw, "meta", "view", "columns"));
		/** 2.Fill Data **/
		this.data = RawParser.getData(this.fields, Searcher.lookup(raw, "data"));
	}

	// ~ Abstract Methods ====================================
	// ~ Override Methods ====================================
	// ~ Methods =============================================
	/** **/
	public JsonArray queryAll() {
		final JsonArray dataArr = new JsonArray();
		final int limit = 50 < data.size() ? 50 : data.size();
		for (int idx = 0; idx < limit; idx++) {
			dataArr.add(this.data.get(idx).getData());
		}
		/**
		 * this.data.forEach(item -> { dataArr.add(item.getData()); if(limit ==
		 * dataArr.size()){ return; } });
		 **/
		return dataArr;
	}

	/** **/
	public JsonArray queryByFilter(final JsonObject params) {
		final JsonArray dataArr = new JsonArray();
		final int limit = data.size();
		for (int idx = 0; idx < limit; idx++) {
			final JsonObject toData = this.data.get(idx).getData();
			if(this.inRange(params, toData)){
				dataArr.add(this.data.get(idx).getData());
			}
		}
		Log.info(LOGGER,"Found trunks: " + dataArr.size());
		return dataArr;
	}

	public boolean inRange(final JsonObject from, final JsonObject to) {
		/** **/
		double fromLng = from.getDouble("longitude");
		double fromLat = from.getDouble("latitude");
		/** **/
		double toLat = Double.parseDouble(to.getString("latitude"));
		double toLng = Double.parseDouble(to.getString("longitude"));
		/** **/
		double distance = Distance.calculate(fromLat, fromLng, toLat, toLng);
		double range = from.getDouble("distance");
		return distance < range;
	}
	// ~ Private Methods =====================================
	// ~ Get/Set =============================================
	// ~ hashCode,equals,toString ============================
}
