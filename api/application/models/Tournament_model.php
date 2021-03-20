<?php

class Tournament_model extends CI_Model {
    public function __construct()
    {
        parent::__construct();
    }

    public function getTournament($payload) {
        $returnData = [];

        $sql = "SELECT * FROM TBL_TOURNAMENT ORDER BY createdAt DESC LIMIT ? OFFSET ?";
        $queryResult = $this->db->query($sql, [$payload["limit"], $payload["skip"]]);

        foreach ($queryResult->result() as $row) {
            $row = (array) $row;
            
            $userCountQuery = "SELECT count(*) as total FROM TBL_TOURNAMENT_RECORDS WHERE tournamentId = ?";
            $userCountResult = (array) $this->db->query($userCountQuery, $row["id"])->result()[0];

            $row["numberOfUsers"] = $userCountResult["total"];

            if ($row["type"] === "team") {
                $teamCountQuery = "SELECT DISTINCT count(*) as total FROM TBL_TOURNAMENT_RECORDS WHERE tournamentId = ? GROUP BY team";
                $teamCountResult = $this->db->query($teamCountQuery, $row["id"])->result();
    
                $row["numberOfTeams"] = count($teamCountResult);
            } else {
                $row["numberOfTeams"] = 0;
            }

            array_push($returnData, $row);
        }
        return $returnData;
    }

    public function getAllTournament() {
        $returnData = [];

        $sql = "SELECT * FROM TBL_TOURNAMENT ORDER BY createdAt DESC";
        $queryResult = $this->db->query($sql);
        
        foreach ($queryResult->result() as $row) {
            $row = (array) $row;
            
            $userCountQuery = "SELECT count(*) as total FROM TBL_TOURNAMENT_RECORDS WHERE tournamentId = ?";
            $userCountResult = (array) $this->db->query($userCountQuery, $row["id"])->result()[0];

            $row["numberOfUsers"] = $userCountResult["total"];

            if ($row["type"] === "team") {
                $teamCountQuery = "SELECT DISTINCT count(*) as total FROM TBL_TOURNAMENT_RECORDS WHERE tournamentId = ? GROUP BY team";
                $teamCountResult = $this->db->query($teamCountQuery, $row["id"])->result();
    
                $row["numberOfTeams"] = count($teamCountResult);
            } else {
                $row["numberOfTeams"] = 0;
            }

            array_push($returnData, $row);
        }
        return $returnData;
    }

    public function tournamentRecordCount() {
        $result = (array) $this->db->query("SELECT count(*) as totalRecordCount FROM TBL_TOURNAMENT")->result()[0];
        return (int) $result["totalRecordCount"];
    }

    public function registerToTournament($payload) {
        $isUsernameExists = $this->isUsernameAlreadyRegistered($payload);
        if ($isUsernameExists) {
            return "username_already_exists";
        }

        $isNicknameEsists = $this->isNicknameAlreadyRegistered($payload);
        if ($isNicknameEsists) {
            return "nickname_already_exists";
        }

        $sql = "INSERT INTO TBL_TOURNAMENT_RECORDS(type, username, nickname, tournamentId, team) VALUES(?,?,?,?,?)";

        $insertData = [
            "type" => $payload["type"],
            "username" => $payload["username"],
            "nickname" => $payload["nickname"],
            "tournamentId" => $payload["tournamentId"],
            "team" => $payload["team"],
        ];

        $result = $this->db->query($sql, $insertData);

        if ($result) {
            return "record_saved_successfully";
        }
        return "record_saved_failure";
    }

    public function memberTeamRegister(array $payload) {
        $isUsernameExists = $this->isUsernameAlreadyRegistered($payload);
        if ($isUsernameExists) {
            return "username_already_exists";
        }

        $isNicknameEsists = $this->isNicknameAlreadyRegistered($payload);
        if ($isNicknameEsists) {
            return "nickname_already_exists";
        }

        $sql = "INSERT INTO TBL_TOURNAMENT_RECORDS(type, username, nickname, tournamentId, team) VALUES(?,?,?,?,?)";

        $insertData = [
            "type" => $payload["type"],
            "username" => $payload["username"],
            "nickname" => $payload["nickname"],
            "tournamentId" => $payload["tournamentId"],
            "team" => $payload["selectedTeam"],
        ];

        $result = $this->db->query($sql, $insertData);

        if ($result) {
            return "record_saved_successfully";
        }
        return "record_saved_failure";
    }

    public function newTeamRegister(array $payload) {
        $isUsernameExists = $this->isUsernameAlreadyRegistered($payload);
        if ($isUsernameExists) {
            return "username_already_exists";
        }

        $isTeamNameExists = $this->isTeamNameAlreadyRegistered($payload);
        if ($isTeamNameExists) {
            return "team_name_already_exists";
        }

        $isNicknameEsists = $this->isNicknameAlreadyRegistered($payload);
        if ($isNicknameEsists) {
            return "nickname_already_exists";
        }

        $sql = "INSERT INTO TBL_TOURNAMENT_RECORDS(type, username, nickname, tournamentId, team) VALUES(?,?,?,?,?)";

        $insertData = [
            "type" => $payload["type"],
            "username" => $payload["username"],
            "nickname" => $payload["nickname"],
            "tournamentId" => $payload["tournamentId"],
            "team" => $payload["teamName"],
        ];

        $result = $this->db->query($sql, $insertData);

        if ($result) {
            return "record_saved_successfully";
        }
        return "record_saved_failure";
    }

    public function individualRegister(array $payload) {
        $isUsernameExists = $this->isUsernameAlreadyRegistered($payload);
        if ($isUsernameExists) {
            return "username_already_exists";
        }
        
        $isNicknameEsists = $this->isNicknameAlreadyRegistered($payload);
        if ($isNicknameEsists) {
            return "nickname_already_exists";
        }

        $sql = "INSERT INTO TBL_TOURNAMENT_RECORDS(type, username, nickname, tournamentId) VALUES(?,?,?,?)";

        $insertData = [
            "type" => $payload["type"],
            "username" => $payload["username"],
            "nickname" => $payload["nickname"],
            "tournamentId" => $payload["tournamentId"]
        ];

        $result = $this->db->query($sql, $insertData);

        if ($result) {
            return "record_saved_successfully";
        }
        return "record_saved_failure";
    }

    public function isUsernameAlreadyRegistered(array $payload) {
        $sql = "SELECT * FROM TBL_TOURNAMENT_RECORDS WHERE tournamentId = ? and username = ?";
        $result = $this->db->query($sql, [$payload["tournamentId"], $payload["username"]])->result();

        return empty($result) ? false : true;
    }

    public function isNicknameAlreadyRegistered(array $payload) {
        $sql = "SELECT * FROM TBL_TOURNAMENT_RECORDS WHERE tournamentId = ? and nickname = ?";
        $result = $this->db->query($sql, [$payload["tournamentId"], $payload["nickname"]])->result();

        return empty($result) ? false : true;
    }

    public function isTeamNameAlreadyRegistered(array $payload) {
        $sql = "SELECT * FROM TBL_TOURNAMENT_RECORDS WHERE tournamentId = ? and team = ?";
        $result = $this->db->query($sql, [$payload["tournamentId"], $payload["teamName"]])->result();

        return empty($result) ? false : true;
    }

    public function getUnfilledTeamList($tournamentId) {
        $sql = "SELECT team, count(*) as totalRecord FROM TBL_TOURNAMENT_RECORDS WHERE tournamentId = ? GROUP BY team HAVING totalRecord < 4";
        $queryResult = (array) $this->db->query($sql, [$tournamentId])->result();

        return $queryResult;
    }

    public function createTournament($payload) {
        $isExistsTournament = "SELECT count(*) as count FROM TBL_TOURNAMENT WHERE title = ?";
        $isExistsTournamentResult = (array) $this->db->query($isExistsTournament, [$payload["tournamentName"]])->result()[0];

        if ($isExistsTournamentResult["count"] > 0) {
            return "tournament_exists";
        }

        $insertData = [
            "title" => $payload["tournamentName"],
            "description" => $payload["description"],
            "image" => $payload["filename"],
            "numberOfTeams" => 0,
            "numberOfUsers" => 0,
            "prize" => $payload["prize"],
            "finishedAt" => $payload["finishedAt"],
            "type" => $payload["tournamentType"]
        ];

        $insertQuery = "INSERT INTO TBL_TOURNAMENT(title, description, image, numberOfTeams, numberOfUsers, prize, finishedAt, type) values(?,?,?,?,?,?,?,?)";
        
        $insertResult = $this->db->query($insertQuery, $insertData);

        return "inserted";
    }

    public function removeTournament($payload) {
        if (isset($payload["selectedTournaments"])) {
            foreach($payload["selectedTournaments"] as $row) {
                $deleteQuery = "DELETE FROM TBL_TOURNAMENT WHERE id = ?";
                $deleteResult = $this->db->query($deleteQuery, [$row]);
            }
        }
        return "deleted"; 
    }

    public function getAllRegisteredUser($payload) {
        $query = "SELECT * FROM TBL_TOURNAMENT_RECORDS WHERE tournamentId = ?";
        $result = $this->db->query($query, [$payload["tournamentId"]]);
        return $result->result();
    }

    public function setIndividualWinner($payload) {
        $getTournamentInfoQuery = "SELECT * FROM TBL_TOURNAMENT WHERE id = ?";
        $getTournamentInfoResult = (array) $this->db->query($getTournamentInfoQuery, [$payload["tournamentId"]])->result()[0];

        $updateTournamentQuery = "UPDATE TBL_TOURNAMENT set winner = ? WHERE id = ?";
        $updateTournamentResult = $this->db->query($updateTournamentQuery, [$payload["username"], $payload["tournamentId"]]);

        foreach($payload["rows"] as $item) {
            if (!empty($item)) {
                $updateUserQuery = "UPDATE TBL_USER set numberOfWins = numberOfWins + 1, totalPrize = totalPrize + ?, title = title + ? WHERE username = ?";
                $updateUserResult = $this->db->query($updateUserQuery, [$item['prize'], $item['score'], $item['username']]);
            }
        }

        return true;
    }

    public function setTeamWinner($payload) {
        $updateTournamentQuery = "UPDATE TBL_TOURNAMENT set winner = ? WHERE id = ?";
        $updateTournamentResult = $this->db->query($updateTournamentQuery, [$payload["username"], $payload["tournamentId"]]);

        foreach($payload["rows"] as $item) {
            if (!empty($item)) {
                $updateUserQuery = "UPDATE TBL_TEAM set numberOfWins = numberOfWins + 1, totalPrize = totalPrize + ?, rank = rank + ? WHERE name = ?";
                $updateUserResult = $this->db->query($updateUserQuery, [$item['prize'], $item['score'], $item['teamName']]);

                $teamIdQuery = "SELECT * FROM TBL_TEAM WHERE name = ?";
                $teamIdResult = (array) $this->db->query($teamIdQuery, [$item["teamName"]])->result();

                if (!empty($teamIdResult)) {
                    $teamIdResult = (array) $teamIdResult[0];

                    $getUserQuery = "SELECT * FROM TBL_USER WHERE teamId = ?";
                    $getUserResult = $this->db->query($getUserQuery, [$teamIdResult["id"]])->result();

                    if (!empty($getUserResult)) {
                        foreach($getUserResult as $user) {
                            $user = (array) $user;
                            $prize = $item["prize"] / count($getUserResult);
                            $score = $item["score"];
                            $updateUserQuery = "UPDATE TBL_USER set numberOfWins = numberOfWins + 1, totalPrize = totalPrize + ?, title = title + ? WHERE id = ?";
                            $updateUserResult  = $this->db->query($updateUserQuery, [$prize, $score, $user["id"]]);
                        }
                    }
                }
            }
        }

        return true;
    }
}