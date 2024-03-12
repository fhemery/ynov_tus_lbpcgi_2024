package org.katas.tripservice.trip;

import org.katas.tripservice.interfaces.ITripDaoService;
import org.katas.tripservice.user.User;

import java.util.List;

public class TripDaoService implements ITripDaoService {
    @Override
    public List<Trip> getTripsForUser(User user) {
        return TripDAO.findTripsByUser(user);
    }
}
