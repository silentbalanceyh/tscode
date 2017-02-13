package org.tscode.centor;

import org.tscode.data.MatrixEntity;
import org.tscode.util.IOKit;

import io.vertx.core.json.JsonObject;
import net.sf.oval.constraint.NotNull;
import net.sf.oval.guard.Guarded;

/**
 * 
 * @author Lang
 *
 */
@Guarded
public class LbsLocalImpl implements LbsService {

	// ~ Static Fields =======================================
	// ~ Instance Fields =====================================
	// ~ Static Block ========================================
	// ~ Static Methods ======================================
	// ~ Constructors ========================================
	// ~ Abstract Methods ====================================
	// ~ Override Methods ====================================
	// ~ Methods =============================================
	/** **/
	@Override
	public JsonObject queryLocal(@NotNull final JsonObject params) {
		// File path could be set
		final JsonObject data = IOKit.getJObject("data/trucks.json");
		// Create Entity from data
		final MatrixEntity entity = new MatrixEntity(data);

		return new JsonObject().put("data", entity.queryByFilter(params));
	}

	/** **/
	@Override
	public JsonObject queryRemote(@NotNull final JsonObject params) {
		// TODO Get Data from
		// https://data.sfgov.org/Economy-and-Community/Mobile-Food-Facility-Permit/rqzj-sfat
		return new JsonObject().put("Success", "Pending implementation");
	}
	// ~ Private Methods =====================================
	// ~ Get/Set =============================================
	// ~ hashCode,equals,toString ============================
}
