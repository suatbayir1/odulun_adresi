<?php

class User_model extends CI_Model{
    public function __construct()
    {
        parent::__construct();
    }

    public function getBestPlayerByNumber(array $payload) {
        $sql = "SELECT * FROM TBL_USER ORDER BY title DESC LIMIT ? OFFSET ?";
        $result = $this->db->query($sql, [$payload["limit"], $payload["skip"]]);
        return $result->result();
    }

    public function getPlayerRecordCount() {
        $result = (array) $this->db->query("SELECT count(*) as totalRecordCount FROM TBL_USER")->result()[0];
        return (int) $result["totalRecordCount"];
    }

    public function getUserInfo($username) {
        $sql = "SELECT u.id, u.nameSurname, u.teamId, u.age, u.email, u.phone, u.title, u.numberOfWins, u.numberOfSweepstakeWins, u.totalPrize, u.createdAt, u.image, t.name, u.games, u.about FROM TBL_USER as u LEFT JOIN TBL_TEAM as t on u.teamId = t.id WHERE username = ?";
        $result = $this->db->query($sql, [$username]);

        $userInfo = (array) $result->result()[0];

        $user = array(
            "id" => $userInfo["id"],
            "nameSurname" => $userInfo["nameSurname"],
            "teamId" => $userInfo["teamId"],
            "age" => $userInfo["age"],
            "email" => $userInfo["email"],
            "phone" => $userInfo["phone"],
            "title" => $userInfo["title"],
            "numberOfWins" => $userInfo["numberOfWins"],
            "numberOfSweepstakeWins" => $userInfo["numberOfSweepstakeWins"],
            "totalPrize" => $userInfo["totalPrize"],
            "createdAt" => $userInfo["createdAt"],
            "teamName" => $userInfo["name"],
            "games" => $userInfo["games"],
            "image" => $userInfo["image"],
            "about" => $userInfo["about"],
        );

        return $user;
    }

    public function updateUser(array $payload) {
        $sql = "UPDATE TBL_USER SET nameSurname = ?, age = ?, email = ?, phone = ?, about = ? WHERE username = ?";
        $result = $this->db->query($sql, [$payload["nameSurname"], $payload["age"], $payload["email"], $payload["phone"], $payload["about"], $payload["username"]]);
        return $result;
    }

    public function changeUserPassword($payload) {
        $isMatchedPreviousPassword = $this->isMatchedPreviousPassword($payload);
        if (!$isMatchedPreviousPassword) {
            return "previous_password_not_matched";
        }

        $sql = "UPDATE TBL_USER SET password = ? WHERE username = ?";
        $result = $this->db->query($sql, [password_hash(trim($payload["newPassword"]), PASSWORD_DEFAULT), $payload["username"]]);

        return "password_changed_successfully";
    }

    public function isMatchedPreviousPassword($payload) {
        $sql = "SELECT * FROM TBL_USER WHERE username = ?";
        $result = (array) $this->db->query($sql, [$payload["username"]])->result();
        $result = (array) $result[0];

        $hash = substr( $result["password"], 0, 60 );

        if (password_verify($payload["previousPassword"], $hash)) {
            return true;
        }
        return false;
    }

    public function getAllUsers($payload) {
        $query = "SELECT user.id, user.nameSurname, user.status, user.age, user.email, team.name, user.phone, user.title, user.numberOfWins, user.numberOfSweepstakeWins, user.totalPrize, user.city, user.town, user.games FROM TBL_USER as user LEFT JOIN TBL_TEAM as team ON user.teamId = team.id";
        $result = $this->db->query($query);
        return $result->result();
    }

    public function removeUser($payload) {
        if (isset($payload["selectedUsers"])) {
            foreach($payload["selectedUsers"] as $row) {
                $deleteQuery = "DELETE FROM TBL_USER WHERE id = ?";
                $deleteResult = $this->db->query($deleteQuery, [$row]);
            }
        }
        return "deleted"; 
    }

    public function passiveUser($payload) {
        if (isset($payload["selectedUsers"])) {
            foreach($payload["selectedUsers"] as $row) {
                $query = "UPDATE TBL_USER set status = 'passive' WHERE id = ?";
                $result = $this->db->query($query, [$row]);
            }
        }
        return "deleted"; 
    }

    public function activeUser($payload) {
        if (isset($payload["selectedUsers"])) {
            foreach($payload["selectedUsers"] as $row) {
                $deleteQuery = "UPDATE TBL_USER set status = 'active' WHERE id = ?";
                $deleteResult = $this->db->query($deleteQuery, [$row]);
            }
        }
        return "deleted"; 
    }

    public function getUsersBySweepstakeWins($payload) {
        $query = "SELECT * FROM TBL_USER ORDER BY numberOfSweepstakeWins DESC";
        $result = $this->db->query($query);
        return $result->result();
    }

    public function isUserAdmin($payload) {
        $query = "SELECT count(*) as total FROM TBL_TEAM where createdUser = ?";
        $result = (array) $this->db->query($query, [$payload["userId"]])->result()[0];
        if ($result["total"] > 0) {
            return "admin";
        } else {
            return "false";
        }
    }

    public function isTeamMemberGreaterThanThree($payload) {
        $query = "SELECT count(*) as total FROM TBL_USER where teamId = ?";
        $result = (array) $this->db->query($query, [$payload["teamId"]])->result()[0];
        if ($result["total"] >= 3) {
            return "greater";
        } else {
            return "lesser";
        }
    }

    public function changeUserProfileImage($filename, $username) {
        $query = "UPDATE TBL_USER set image = ? WHERE username = ?";
        $this->db->query($query, [$filename, $username]);
    }

    public function addRemoveScore($payload) {
        foreach($payload["selectedUsers"] as $user) {
            $query = "UPDATE TBL_USER set title = title + ? WHERE id = ?";
            $result = $this->db->query($query, [$payload["score"], $user]);
        }
        return "updated";
    }

    public function getChampionUser() {
        $query = "SELECT * FROM TBL_USER ORDER BY title desc";
        $result = $this->db->query($query)->result();

        if (empty($result)) {
            return "empty_user_list";
        }

        $resultList = (array) $result[0];

        if ($resultList["title"] > 50000) {
            return $resultList;
        }
        return "empty_user_list";
    }
}