import TripService from "../src/trip/TripService";
import User from "../src/user/User";
import UserNotLoggedInException from "../src/exception/UserNotLoggedInException";
import UserSession from "../src/user/UserSession";
import TripDAO from "../src/trip/TripDAO";
import Trip from "../src/trip/Trip";

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

jest.mock('../src/user/UserSession');
jest.mock('../src/trip/TripDAO');

describe('TripService', () => {
    let tripService: TripService;
    let userSessionGetLoggedUser: jest.SpyInstance;
    let tripDAOFindTripsByUser: jest.SpyInstance;

    beforeEach(() => {
        tripService = new TripService();
        userSessionGetLoggedUser = jest.spyOn(UserSession, 'getLoggedUser');
        tripDAOFindTripsByUser = jest.spyOn(TripDAO, 'findTripsByUser');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should throw UserNotLoggedInException when user is not logged in', () => {
        userSessionGetLoggedUser.mockReturnValue(null);

        expect(() => tripService.getTripsByUser(new User())).toThrow(new UserNotLoggedInException());
    });

    it('should return empty trip list when user has no friend', () => {
        const user = new User();
        userSessionGetLoggedUser.mockReturnValue(new User());

        expect(tripService.getTripsByUser(user)).toEqual([]);
    });

    it('should return empty trip list when logged user is not a friend of the user', () => {
        const alice = new User();
        const bob = new User();
        alice.addFriend(bob);
        const carol = new User();
        userSessionGetLoggedUser.mockReturnValue(carol);
    
        expect(tripService.getTripsByUser(alice)).toEqual([]);
    });

    it('should return trip list when logged user is a friend', () => {
        const user = new User();
        const friend = new User();
        user.addFriend(friend);
        userSessionGetLoggedUser.mockReturnValue(friend);
        const expectedTrips = [new Trip(), new Trip()];
        tripDAOFindTripsByUser.mockReturnValue(expectedTrips);

        expect(tripService.getTripsByUser(user)).toEqual(expectedTrips);
    });
});
