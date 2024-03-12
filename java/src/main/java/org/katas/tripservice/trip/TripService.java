package org.katas.tripservice.trip;

import org.katas.tripservice.exception.UserNotLoggedInException;
import org.katas.tripservice.interfaces.ITripDaoService;
import org.katas.tripservice.user.User;
import org.katas.tripservice.user.UserSession;

import java.util.ArrayList;
import java.util.List;
import java.util.Timer;

public class TripService {

	private final ITripDaoService tripDaoService;

	TripService() {
		tripDaoService = new TripDaoService();
	}
	TripService(ITripDaoService tripDaoService) {
		this.tripDaoService = tripDaoService;
	}


	public List<Trip> getTripsByUser(User user) throws UserNotLoggedInException {
		List<Trip> tripList = new ArrayList<Trip>();
		User loggedUser = getUser();
		boolean isFriend = false;
		if (loggedUser != null) {
			for (User friend : user.getFriends()) {
				if (friend.equals(loggedUser)) {
					isFriend = true;
					break;
				}
			}
			if (isFriend) {
				tripList = tripDaoService.getTripsForUser(user);
			}
			return tripList;
		} else {
			throw new UserNotLoggedInException();
		}
	}

	protected User getUser() {
        return UserSession.getInstance().getLoggedUser();
	}

}
