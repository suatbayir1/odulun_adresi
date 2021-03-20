import { combineReducers } from "redux";
import authenticationReducer from "./authentication/authenticationReducer";
import playerReducer from "./player/playerReducer";
import tournamentReducer from "./tournament/tournamentReducer";
import teamReducer from "./team/teamReducer";
import sweepstakeReducer from "./sweepstake/sweepstakeReducer";
import userReducer from "./user/userReducer";

const rootReducer = combineReducers({
  authentication: authenticationReducer,
  player: playerReducer,
  tournament: tournamentReducer,
  team: teamReducer,
  sweepstake: sweepstakeReducer,
  user: userReducer,
});

export default rootReducer;
