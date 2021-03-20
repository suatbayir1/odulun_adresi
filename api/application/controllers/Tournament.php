<?php

class Tournament extends CI_Controller {
    public function __construct()
    {
        parent::__construct();
        $this->load->model("Tournament_model");
        getHeader();
    }

    public function getTournament() {
        $request = getRequest();
        $payload = [];

        if (!isset($request["limit"])) {
            $payload["limit"] = 9;
        } else {
            $payload["limit"] = $request["limit"];
        }
        if (!isset($request["skip"])) {
            $payload["skip"] = 0;
        }else {
            $payload["skip"] = $request["skip"];
        }

        $result = $this->Tournament_model->getTournament($payload);
        $totalRecordCount = $this->Tournament_model->tournamentRecordCount();

        if (empty($result)) {
            return returnResponse(false, ["tournament_list_empty"]);
        }
        return returnResponse(true, ["tournament_list_get_successfully"], $result, ["totalRecordCount" => $totalRecordCount]);
    }

    public function registerToTournament() {
        $request = getRequest();

        $result = $this->Tournament_model->registerToTournament($request);

        return returnResponse(true, [$result]);

        // if ($request["type"] === "individual") {
        //     $result = $this->Tournament_model->individualRegister($request);
        //     if ($result === "record_saved_successfully") {
        //         return returnResponse(true, ["record_saved_successfully"]);
        //     } 
        //     return returnResponse(true, [$result]);
        // } else if ($request["type"] === "newTeam") {
        //     $result = $this->Tournament_model->newTeamRegister($request);
        //     if ($result === "record_saved_successfully") {
        //         return returnResponse(true, ["record_saved_successfully"]);
        //     } 
        //     return returnResponse(true, [$result]);
        // } else if ($request["type"] === "memberTeam") {
        //     $result = $this->Tournament_model->memberTeamRegister($request);
        //     if ($result === "record_saved_successfully") {
        //         return returnResponse(true, ["record_saved_successfully"]);
        //     } 
        //     return returnResponse(true, [$result]);
        // }
    }

    public function getUnfilledTeamList() {
        $request = getRequest();

        if (!isset($request["id"])) {
            return returnResponse(false, ["tournament_is_not_found"]);
        }

        $result = $this->Tournament_model->getUnfilledTeamList($request["id"]);

        if (empty($result)) {
            return returnResponse(false, ["unfilled_team_list_not_found"]);
        }
        return returnResponse(true, ["get_unfilled_team_list_successfully"], $result);
    }

    public function createTournament() {
        $request = getRequest();

        if(getimagesize($_FILES['image']['tmp_name']) == FALSE ) {
            // return returnResponse(true, ["image_not_found"]);
        } else {   
            // $uploaddir = '/opt/lampp/htdocs/kemalproje/frontend/src/assets/img/';
            $uploaddir = '../images/';
            $uploadfile = $uploaddir . basename($_POST["filename"]);

            move_uploaded_file($_FILES['image']['tmp_name'], $uploadfile);
        }

        $result = $this->Tournament_model->createTournament($request);
        return returnResponse(true, [$result]);
    }

    public function getAllTournament() {
        $request = getRequest();
        $result = $this->Tournament_model->getAllTournament();
        return returnResponse(true, ["data_success"], $result);
    }

    public function removeTournament() {
        $request = getRequest();

        $result = $this->Tournament_model->removeTournament($request);
        return returnResponse(true, [$result]);
    }

    public function getAllRegisteredUser() {
        $request = getRequest();
        $result = $this->Tournament_model->getAllRegisteredUser($request);
        return returnResponse(true, ["get_records"], $result);
    }

    public function setIndividualWinner() {
        $request = getRequest();
        $result = $this->Tournament_model->setIndividualWinner($request);
        return returnResponse(true, ["finished"]);
    }

    public function setTeamWinner() {
        $request = getRequest();
        $result = $this->Tournament_model->setTeamWinner($request);
        return returnResponse(true, ["finished"]);
    }

    public function isUsernameAlreadyRegistered() {
        $request = getRequest();
        $result = $this->Tournament_model->isUsernameAlreadyRegistered($request);
        return returnResponse(true, [$result]);
    }
}