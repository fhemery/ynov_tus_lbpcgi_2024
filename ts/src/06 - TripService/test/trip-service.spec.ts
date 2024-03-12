import "jest";
import TripService from "../src/trip/TripService";
import User from "../src/user/User";
import UserNotLoggedInException from "../src/exception/UserNotLoggedInException";

class TripServiceOverload extends TripService {
    protected getUser() {
        return null!;
    }

}

describe("TripServiceShould", () => {
    it('should throw exception when user is not logged', () => {
        const tripService = new TripServiceOverload();

        expect(() => tripService.getTripsByUser(new User())).toThrowError(new UserNotLoggedInException());
    });
});
