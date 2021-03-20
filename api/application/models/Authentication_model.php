<?php

class Authentication_model extends CI_Model {
    public function __construct()
    {
        parent::__construct();
    }

    public function login(array $payload) {
        $sql = "SELECT * FROM TBL_USER WHERE username = ?";
        $result = $this->db->query($sql, [$payload["username"]]);

        $matchedUser = $result->result();

        if (empty($matchedUser)) {
            return false;
        }

        $matchedUser = (array) $result->result()[0];

        $hash = substr( $matchedUser["password"], 0, 60 );

        if (password_verify($payload["password"], $hash)) {
            return $matchedUser;
        }
        return false;
    }


    public function adminLogin(array $payload) {
        $sql = "SELECT * FROM TBL_ADMIN WHERE username = ?";
        $result = $this->db->query($sql, [$payload["username"]]);
        $matchedUser = $result->result();

        if (empty($matchedUser)) {
            return false;
        }

        $matchedUser = (array) $result->result()[0];

        if ($matchedUser["password"] == $payload["password"]) {
            return $matchedUser;
        }
        return false;
    }

    public function signup(array $payload) {
        $isExist = $this->isExistUser($payload["username"]);

        if ($isExist) {
            return "user_already_exists";
        }

        $sql = "INSERT INTO TBL_USER(nameSurname, age, email, username, password, phone, title, numberOfWins, city, town, games) VALUES(?,?,?,?,?,?,?,?,?,?, ?)";

        $insertData = [
            "nameSurname" => $payload["nameSurname"],
            "age" => $payload["age"],
            "email" => $payload["email"],
            "username" => $payload["username"],
            "password" => password_hash(trim($payload["password"]), PASSWORD_DEFAULT),
            "phone" => $payload["phone"],
            "title" => 0,
            "numberOfWins" => 0,
            "city" => $payload["city"],
            "town" => $payload["town"],
            "games" => $payload["games"],
        ];


        $result = $this->db->query($sql, $insertData);

        if ($result) {
            return "user_saved_successfully";
        }
        return "user_saved_failure";
    }

    public function isExistUser($username) {
        $sql = "SELECT * FROM TBL_USER WHERE username = ?";
        $result = $this->db->query($sql, [$username]);

        if ($result->num_rows() > 0) {
            return true;
        }
        return false;
    }
}