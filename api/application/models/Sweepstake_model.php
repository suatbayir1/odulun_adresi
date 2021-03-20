<?php

class Sweepstake_model extends CI_Model {
    public function __construct()
    {
        parent::__construct();
    }

    public function getSweepstake($payload) {
        $returnData = [];

        $sql = "SELECT * FROM TBL_SWEEPSTAKE ORDER BY createdAt DESC LIMIT ? OFFSET ?";
        $queryResult = $this->db->query($sql, [$payload["limit"], $payload["skip"]]);
    
        foreach ($queryResult->result() as $row) {
            $row = (array) $row;
            
            $userCountQuery = "SELECT count(*) as total FROM TBL_SWEEPSTAKE_RECORDS WHERE sweepstakeId = ?";
            $userCountResult = (array) $this->db->query($userCountQuery, $row["id"])->result()[0];

            $row["numberOfUsers"] = $userCountResult["total"];

            array_push($returnData, $row);
        }
    
        return $returnData;
    }

    public function getAllSweepstake() {
        $returnData = [];

        $sql = "SELECT * FROM TBL_SWEEPSTAKE ORDER BY createdAt DESC";
        $queryResult = $this->db->query($sql);

        foreach ($queryResult->result() as $row) {
            $row = (array) $row;
            
            $userCountQuery = "SELECT count(*) as total FROM TBL_SWEEPSTAKE_RECORDS WHERE sweepstakeId = ?";
            $userCountResult = (array) $this->db->query($userCountQuery, $row["id"])->result()[0];

            $row["numberOfUsers"] = $userCountResult["total"];

            array_push($returnData, $row);
        }

        return $returnData;
    }

    public function sweepstakeRecordCount() {
        $result = (array) $this->db->query("SELECT count(*) as totalRecordCount FROM TBL_SWEEPSTAKE")->result()[0];
        return (int) $result["totalRecordCount"];
    }


    public function registerToSweepstake(array $payload) {
        $isUsernameAlreadyExists = $this->isUsernameAlreadyRegistered($payload);
        if ($isUsernameAlreadyExists) {
            return "username_already_exists";
        }

        $sql = "INSERT INTO TBL_SWEEPSTAKE_RECORDS(sweepstakeId, username) VALUES (?,?)";
        $insertData = [
            "sweepstakeId" => $payload["sweepstakeId"],
            "username" => $payload["username"]
        ];

        $result = $this->db->query($sql, $insertData);

        if ($result) {
            return "record_saved_successfully";
        }
        return "record_saved_failure";
    }

    public function isUsernameAlreadyRegistered(array $payload) {
        $sql = "SELECT * FROM TBL_SWEEPSTAKE_RECORDS WHERE sweepstakeId = ? and username = ?";
        $result = $this->db->query($sql, [$payload["sweepstakeId"], $payload["username"]])->result();

        return empty($result) ? false : true;
    }

    public function removeSweepstake($payload) {
        if (isset($payload["selectedSweepstakes"])) {
            foreach($payload["selectedSweepstakes"] as $row) {
                $deleteQuery = "DELETE FROM TBL_SWEEPSTAKE WHERE id = ?";
                $deleteResult = $this->db->query($deleteQuery, [$row]);
            }
        }
        return "deleted"; 
    }

    public function createSweepstake($payload) {
        $isExistsSweepstake = "SELECT count(*) as count FROM TBL_SWEEPSTAKE WHERE title = ?";
        $isExistsSweepstakeResult = (array) $this->db->query($isExistsSweepstake, [$payload["sweepstakeName"]])->result()[0];

        if ($isExistsSweepstakeResult["count"] > 0) {
            return "sweepstake_exists";
        }

        $insertData = [
            "title" => $payload["sweepstakeName"],
            "description" => $payload["description"],
            "image" => $payload["filename"],
            "numberOfUsers" => 0,
            "prize" => $payload["prize"],
            "finishedAt" => $payload["finishedAt"],
        ];

        $insertQuery = "INSERT INTO TBL_SWEEPSTAKE(title, description, image, numberOfUsers, prize, finishedAt) values(?,?,?,?,?,?)";
        
        $insertResult = $this->db->query($insertQuery, $insertData);

        return "inserted";
    }

    public function getAllRegisteredUser($payload) {
        $query = "SELECT * FROM TBL_SWEEPSTAKE_RECORDS WHERE sweepstakeId = ?";
        $result = $this->db->query($query, [$payload["sweepstakeId"]]);
        return $result->result();
    }

    public function setWinner($payload) {
        $getSweepstakeInfoQuery = "SELECT * FROM TBL_SWEEPSTAKE WHERE id = ?";
        $getSweepstakeInfoResult = (array) $this->db->query($getSweepstakeInfoQuery, [$payload["sweepstakeId"]])->result()[0];

        // print_r($getSweepstakeInfoResult);

        $updateSweepstakeQuery = "UPDATE TBL_SWEEPSTAKE set winner = ? WHERE id = ?";
        $updateSweepstakeResult = $this->db->query($updateSweepstakeQuery, [$payload["username"], $payload["sweepstakeId"]]);


        print_r($payload);
        // $arr = explode(",", $payload["username"]);

        foreach($payload["rows"] as $item) {
            if (!empty($item)) {
                $updateUserQuery = "UPDATE TBL_USER set numberOfSweepstakeWins = numberOfSweepstakeWins + 1, totalPrize = totalPrize + ? WHERE username = ?";
                $updateUserResult = $this->db->query($updateUserQuery, [$item["prize"], $item["winner"]]);
            }
        }

        return true;
    }
}