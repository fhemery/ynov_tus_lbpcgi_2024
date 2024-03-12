package org.katas.tripservice.trip.fakes;

import org.katas.tripservice.interfaces.ITripDaoService;
import org.katas.tripservice.trip.Trip;
import org.katas.tripservice.user.User;

import java.util.ArrayList;
import java.util.List;

public class FakeTripDaoService implements ITripDaoService {
    private List<Trip> trips = new ArrayList<>();
    @Override
    public List<Trip> getTripsForUser(User user) {
        return trips;
    }

    public void setTripsForUser(List<Trip> trips) {
        this.trips = trips;
    }
}
