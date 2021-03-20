<?php

class Authentication extends CI_Controller {
    public function __construct()
    {
        parent::__construct();
        $this->load->model("Authentication_model");
        getHeader();
    }

    public function login() {
        $request = getRequest();

        if (empty($request["username"]) || empty($request["password"])) {
            return returnResponse(false, ["empty_username_password"]);
        }

        $isUserActive = (array) $this->db->query("SELECT * FROM TBL_USER WHERE username = ?", $request["username"])->result()[0];
        if ($isUserActive["status"] === "passive") {
            return returnResponse(false, ["username_is_banned"]);
        }

        $result = $this->Authentication_model->login($request);

        if (!$result) {
            return returnResponse(false, ["user_not_found"]);
        }

        $user = array(
            "id" => $result["id"],
            "teamId" => $result["teamId"],
            "nameSurname" => $result["nameSurname"],
            "age" => $result["age"],
            "email" => $result["email"],
            "username" => $result["username"],
            "phone" => $result["phone"],
            "title" => $result["title"],
            "numberOfWins" => $result["numberOfWins"],
            "creadAt" => $result["createdAt"],
        );

        $this->setUser($user);


        return returnResponse(true, ["user_matched"], $result);
    }

    public function setUser($user) {
        $this->session->set_userdata($user);
    }

    public function getUser() {
        print_r($this->session->all_userdata());
    }

    public function signup() {
        $request = getRequest();

        if (empty($request["username"]) || empty($request["password"])) {
            return returnResponse(false, ["empty_username_password"]);
        }

        if (empty($request["city"]) || empty($request["town"])) {
            return returnResponse(false, ["empty_city_town"]);
        }

        $result = $this->Authentication_model->signup($request);

        if ($result == "user_already_exists") {
            returnResponse(false, ["user_already_exists"]);
        } else if ($result == "user_saved_successfully"){
            returnResponse(false, ["user_saved_successfully"]);
        }
    }

    public function adminLogin() {
        $request = getRequest();

        if (empty($request["username"]) || empty($request["password"])) {
            return returnResponse(false, ["empty_username_password"]);
        }

        $result = $this->Authentication_model->adminLogin($request);

        if (!$result) {
            return returnResponse(false, ["user_not_found"]);
        }

        return returnResponse(true, ["user_matched"], $result);
    }

}