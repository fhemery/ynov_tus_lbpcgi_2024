package org.katas.tripservice.interfaces;
import org.katas.tripservice.trip.Trip;
import org.katas.tripservice.user.User;

import java.util.List;

public interface ITripDaoService {

    List<Trip> getTripsForUser(User user);
}
