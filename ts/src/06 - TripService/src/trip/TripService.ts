import UserNotLoggedInException from "../exception/UserNotLoggedInException";
import User from "../user/User";
import UserSession from "../user/UserSession";
import Trip from "./Trip";
import TripDAO from "./TripDAO";

export default class TripService {
    public getTripsByUser(user: User): Trip[] {
        const loggedUser = this.getUser();
        if (loggedUser == null) {
            throw new UserNotLoggedInException();
        }
        
        for (const friend of user.getFriends()) {
            if (friend === loggedUser) {
                return TripDAO.findTripsByUser(user);
            }
        }

        return [];
    }

    protected getUser() {
        return UserSession.getLoggedUser();
    }
}
