package org.katas.tripservice.trip;

import org.junit.jupiter.api.Test;
import org.katas.tripservice.exception.UserNotLoggedInException;
import org.katas.tripservice.user.User;

import static org.junit.jupiter.api.Assertions.assertThrows;

class TripServiceOverload extends TripService {
    @Override
    protected User getUser() {
        return null;
    }
}

public class TripServiceTest {

    @Test
    public void should_ThrowException_WhenUserIsNotLogged() {
        TripService tripService = new TripServiceOverload();

        assertThrows(UserNotLoggedInException.class, () -> tripService.getTripsByUser(null));
    }

}
