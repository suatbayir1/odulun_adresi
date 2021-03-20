<?php

class Team extends CI_Controller {
    public function __construct()
    {
        parent::__construct();
        $this->load->model("Team_model");
        getHeader();
    }

    public function getBestTeamByNumber() {
        $request = getRequest();
        $payload = [];

        if (!isset($request["limit"])) {
            $payload["limit"] = 10;
        } else {
            $payload["limit"] = $request["limit"];
        }

        if (!isset($request["skip"])) {
            $payload["skip"] = 0;
        } else {
            $payload["skip"] = $request["skip"];
        }

        $result = $this->Team_model->getBestTeamByNumber($payload);
        $totalRecordCount = $this->Team_model->getTeamRecordCount();

        if(empty($result)) {
            return returnResponse(false, ["team_empty"]);
        }
        return returnResponse(true, ["get_best_team_successfully"], $result, ["totalRecordCount" => $totalRecordCount]);
    }

    public function getFoundTeamList() {
        $request = getRequest();

        $result = $this->Team_model->getFoundTeamList($request);

        if(empty($result)) {
            return returnResponse(false, ["team_empty"]);
        }
        return returnResponse(true, ["get_found_team_successfully"], $result);
    }

    public function fetchRegisterToTeam() {
        $request = getRequest();

        $result = $this->Team_model->fetchRegisterToTeam($request);

        return returnResponse(true, [$result]);
    }

    public function createTeam() {
        $request = getRequest();

        $result = $this->Team_model->createTeam($request);
        
        return returnResponse(true, [$result]);
    }

    public function logoutFromTeam() {
        $request = getRequest();

        $result = $this->Team_model->logoutFromTeam($request);

        return returnResponse(true, [$result]);
    }

    public function getTeamRequest() {
        $request = getRequest();

        if ($request["teamId"] == null || $request["teamId"] == "") {
            return returnResponse(false, ["user_not_registered_team"]);
        }

        $result = $this->Team_model->getTeamRequest($request);

        if ($result === "not_found_request") {
            return returnResponse(false, ["not_found_request"]);
        }

        return returnResponse(true, ["get_request_successfully"], $result);
    }

    public function deleteTeamRegisterRequest() {
        $request = getRequest();
        $result = $this->Team_model->deleteTeamRegisterRequest($request);
        return returnResponse(true, ["record_deleted"]);
    }

    public function acceptTeamRegisterRequest() {
        $request = getRequest();
        $result = $this->Team_model->acceptTeamRegisterRequest($request);
        return returnResponse(true, [$result]);
    }
}