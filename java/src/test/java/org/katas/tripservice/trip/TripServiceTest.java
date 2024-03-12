package org.katas.tripservice.trip;

import org.junit.jupiter.api.Test;
import org.katas.tripservice.exception.UserNotLoggedInException;
import org.katas.tripservice.trip.fakes.FakeTripDaoService;
import org.katas.tripservice.user.User;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

class TripServiceOverload extends TripService {
    public TripServiceOverload(){
        super();
    }
    public TripServiceOverload(FakeTripDaoService dao) {
        super(dao);
    }

    User user = null;

    @Override
    protected User getUser() {
        return user;
    }

    public void setLoggedUser(User user) {
        this.user = user;
    }
}

public class TripServiceTest {

    @Test
    public void should_ThrowException_WhenUserIsNotLogged() {
        TripService tripService = new TripServiceOverload();

        assertThrows(UserNotLoggedInException.class, () -> tripService.getTripsByUser(null));
    }

    @Test
    public void should_ReturnUserTrips_IfFriendWithLoggedUser() {
        FakeTripDaoService dao = new FakeTripDaoService();
        TripServiceOverload tripService = new TripServiceOverload(dao);

        User alice = new User();
        tripService.setLoggedUser(alice);

        User bob = new User();
        bob.addFriend(alice);
        List<Trip> trips = new ArrayList<>();
        trips.add(new Trip());
        dao.setTripsForUser(trips);

        List<Trip> returnedTrips = tripService.getTripsByUser(bob);

        assertEquals(trips, returnedTrips);
    }

}
