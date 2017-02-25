package org.tscode.centor;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.tscode.data.MatrixEntity;
import org.tscode.util.IOKit;

import io.vertx.core.json.JsonArray;
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
	
	public Connection getConn(){
		Connection conn = null;
		try{
			Class.forName("com.mysql.jdbc.Driver");
			conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/DB_TS","htl","pl,okmijn123");
		}catch(SQLException ex){
			ex.printStackTrace();
		}catch(ClassNotFoundException ex){
			ex.printStackTrace();
		}
		return conn;
	}

	/** **/
	@Override
	public JsonObject increase(JsonObject params) {
		final String id = params.getString("id");
		final JsonObject ret = new JsonObject();
		try {
			final Connection conn = this.getConn();
			final PreparedStatement stmt = conn.prepareStatement("UPDATE DB_LINK SET COUNTER = COUNTER + 1 WHERE ID = ?");
			stmt.setString(1, id);
			final Boolean executed = stmt.execute();
			if(executed){
				ret.put("result", "SUCCESS");
			}else{
				ret.put("result", "DATA ERROR");
			}
		} catch (Exception ex) {
			ex.printStackTrace();
			ret.put("result", "FAILURE");
		}
		return ret;
	}
	
	public JsonObject getAll(){
		final JsonObject ret = new JsonObject();
		try {
			final Connection conn = this.getConn();
			final Statement stmt = conn.createStatement();
			final ResultSet rs = stmt.executeQuery("SELECT * FROM DB_LINK ORDER BY COUNTER DESC");
			final JsonArray data = new JsonArray();
			while(rs.next()){
				final JsonObject item = new JsonObject();
				item.put("id",rs.getString("ID"));
				item.put("name",rs.getString("NAME"));
				item.put("url",rs.getString("URL"));
				data.add(item);
			}
			ret.put("DATA",data);
		}catch(Exception ex){
			ex.printStackTrace();
			ret.put("result", "FAILURE");
		}
		return ret;
	}
	// ~ Private Methods =====================================
	// ~ Get/Set =============================================
	// ~ hashCode,equals,toString ============================
}
