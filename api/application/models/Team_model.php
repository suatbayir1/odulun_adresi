<?php

class Team_model extends CI_Model{
    public function __construct()
    {
        parent::__construct();
    }

    public function getBestTeamByNumber(array $payload) {
        $sql = "SELECT * FROM TBL_TEAM team LEFT JOIN TBL_USER user on team.createdUser = user.id WHERE team.name is not null  ORDER BY team.rank DESC LIMIT ? OFFSET ?";
        $result = $this->db->query($sql, [$payload["limit"], $payload["skip"]]);
        return $result->result();
    }

    public function getTeamRecordCount() {
        $result = (array) $this->db->query("SELECT count(*) as totalRecordCount FROM TBL_TEAM")->result()[0];
        return (int) $result["totalRecordCount"];
    }

    public function getFoundTeamList($payload) {
        $sql = "SELECT * FROM TBL_TEAM";
        $result = $this->db->query($sql);

        $returnData = [];

        foreach($result->result() as $row) {
            $row = (array) $row;

            $totalUserQuery = "SELECT count(*) as count from TBL_USER WHERE teamId = ?";
            $totalUserResult = (array) $this->db->query($totalUserQuery, [$row["id"]])->result()[0];

            $row["memberCountOfUser"] = $totalUserResult["count"];

            $teamCreatorQuery = "SELECT * FROM TBL_USER WHERE id = ?";
            $teamCreatorResult = (array) $this->db->query($teamCreatorQuery, [$row["createdUser"]])->result();

            $creator = "";

            if (empty($teamCreatorResult)) {
                $creator = "";
            } else {
                $creator = (array) $teamCreatorResult[0];
                $creator = $creator["nameSurname"];
            }

            $row["nameSurname"] = $creator;

            if ($creator !== "") {
                array_push($returnData, $row);
            }
        }

        return $returnData;
    }

    public function fetchRegisterToTeam($payload) {
        $result = $this->isCanAdd($payload);
        if ($result > 3) {
            return "team_is_full";
        }

        if ($this->isUserAlreadyRegisteredTeam($payload["userId"]) > 0) {
            return "user_already_registered_team";
        }

        if ($this->isAlreadyRequestSameTeam($payload) > 0) {
            return "user_already_request";
        }

        $sql = "INSERT INTO TBL_REGISTER_TEAM_REQUEST(userId, teamId) VALUES(?,?)";
        $updateResult = $this->db->query($sql, [$payload["userId"], $payload["teamId"]]);
        return "register_team_request_added";
    }

    public function isCanAdd($payload) {
        $sql = "SELECT count(*) as totalRecord FROM TBL_USER WHERE teamId = ?";
        $result = (array) $this->db->query($sql, [$payload["teamId"]])->result()[0];
        return $result["totalRecord"];
    }

    public function isAlreadyRequestSameTeam($payload) {
        $sql = "SELECT count(*) as totalRecord FROM TBL_REGISTER_TEAM_REQUEST WHERE teamId = ? and userId = ?";
        $result = (array) $this->db->query($sql, [$payload["teamId"], $payload["userId"]])->result()[0];
        return $result["totalRecord"];
    }

    public function isUserAlreadyRegisteredTeam($userId) {
        $sql = "SELECT count(*) as totalRecord FROM TBL_USER WHERE teamId is not null and id = ?";
        $result = (array) $this->db->query($sql, [$userId])->result()[0];
        return $result["totalRecord"];
    }

    public function createTeam($payload) {
        if ($this->isTeamAlreadyExists($payload) > 0) {
            return "team_name_already_exists";
        }

        if ($this->isUserAlreadyRegisteredTeam($payload["createdUser"]) > 0) {
            return "user_already_registered_team";
        }
        
        $sql = "INSERT INTO TBL_TEAM(createdUser, name, rank) VALUES (?,?,?)";
        $result = $this->db->query($sql, [$payload["createdUser"], $payload["teamName"], 0]);
        $lastInsertId = $this->db->insert_id();

        $updateQuery = "UPDATE TBL_USER set teamId = ? WHERE id = ?";
        $updateResult = $this->db->query($updateQuery, [$lastInsertId, $payload["createdUser"]]); 
        return "team_created";
    }

    public function isTeamAlreadyExists($payload) {
        $sql = "SELECT count(*) as totalRecord FROM TBL_TEAM WHERE name = ?";
        $result = (array) $this->db->query($sql, [$payload["teamName"]])->result()[0];

        return $result["totalRecord"];
    }

    public function logoutFromTeam($payload) {
        $isUserMemberAnyTeamQuery = "SELECT count(*) as result FROM TBL_USER WHERE id = ? and teamId is not null";
        $isUserMemberAnyTeamResult = (array) $this->db->query($isUserMemberAnyTeamQuery, [$payload["userId"]])->result()[0];
        
        if ($isUserMemberAnyTeamResult["result"] == 0) {
            return "user_not_member";
        }

        $sql = "SELECT count(*) as totalRecord FROM TBL_TEAM WHERE createdUser = ?";
        $result = (array) $this->db->query($sql, [$payload["userId"]])->result()[0];

        if ($result["totalRecord"] == 0) {
            // kullanıcı doğrudan silinecek
            $deleteUserQuery = "UPDATE TBL_USER SET teamId = null WHERE id = ?";
            $this->db->query($deleteUserQuery, [$payload["userId"]]);
        } else {
            // kullanıcıyı sil takımı başkasına devret  
            $deleteUserQuery = "UPDATE TBL_USER SET teamId = null WHERE id = ?";
            $this->db->query($deleteUserQuery, [$payload["userId"]]);

            $allUserQuery = "SELECT * FROM TBL_USER WHERE teamId = ? ORDER BY numberOfWins DESC";
            $allUserResult = (array) $this->db->query($allUserQuery, [$payload["teamId"]])->result();


            if (!empty($allUserResult)) {
                $updateTeamLeaderQuery = "UPDATE TBL_TEAM SET createdUser = ? WHERE id = ?";
                $updateTeamLeaderResult = $this->db->query($updateTeamLeaderQuery, [$allUserResult["id"], $payload["teamId"]]);
            } else {
                $updateTeamLeaderQuery = "UPDATE TBL_TEAM SET createdUser = null WHERE id = ?";
                $updateTeamLeaderResult = $this->db->query($updateTeamLeaderQuery, [$payload["teamId"]]);
            }
        }   
        return true;
    }

    public function getTeamRequest($payload) {
        $getTeamCreatorQuery = "SELECT * FROM TBL_TEAM WHERE id = ?";
        $getTeamCreatorResult = (array) $this->db->query($getTeamCreatorQuery, [$payload["teamId"]])->result()[0];

        if ($getTeamCreatorResult["createdUser"] !== $payload["userId"]) {
            return [];
        }

        $getTeamRegisterRequestQuery = "SELECT * FROM TBL_REGISTER_TEAM_REQUEST WHERE teamId = ?";
        $getTeamRegisterRequestResult = $this->db->query($getTeamRegisterRequestQuery, [$payload["teamId"]])->result();

        if (empty($getTeamRegisterRequestResult)) {
            return "not_found_request";
        }


        $returnData = [];

        foreach ($getTeamRegisterRequestResult as $row) {
            $row = (array) $row;

            $getUserInfo = "SELECT * FROM TBL_USER WHERE id = ?";
            $getUserResult = (array) $this->db->query($getUserInfo, [$row["userId"]])->result()[0];

            $row["nameSurname"] = $getUserResult["nameSurname"];
            $row["age"] = $getUserResult["age"];
            $row["numberOfWins"] = $getUserResult["numberOfWins"];
            $row["rank"] = $getUserResult["title"];

            array_push($returnData, $row);
        }

        return $returnData;
    }

    public function deleteTeamRegisterRequest($payload) {
        $deleteQuery = "DELETE FROM TBL_REGISTER_TEAM_REQUEST WHERE id = ?";
        $deleteResult = $this->db->query($deleteQuery, [$payload["id"]]);
        return $deleteResult;
    }

    public function acceptTeamRegisterRequest($payload) {
        if ($this->isUserAlreadyRegisteredTeam($payload["userId"])) {
            return "user_already_registered_team";
        }

        $registerUserToTeamQuery = "UPDATE TBL_USER set teamId = ? WHERE id = ?";
        $registerUserToTeamResult = $this->db->query($registerUserToTeamQuery, [$payload["teamId"], $payload["userId"]]);

        if( $this->deleteTeamRegisterRequest(["id" => $payload["id"]])) {
            return "request_accepted";
        }
    }
}