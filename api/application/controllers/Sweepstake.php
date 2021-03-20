<?php

class Sweepstake extends CI_Controller {
    public function __construct()
    {
        parent::__construct();
        getHeader();
        $this->load->model("Sweepstake_model");
    }

    public function getSweepstake() {
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

        $result = $this->Sweepstake_model->getSweepstake($payload);
        $totalRecordCount = $this->Sweepstake_model->sweepstakeRecordCount();


        if (empty($result)) {
            return returnResponse(false, ["sweepstake_list_empty"]);
        }
        return returnResponse(true, ["sweepstake_list_get_successfully"], $result, ["totalRecordCount" => $totalRecordCount]);
    }

    public function registerToSweepstake() {
        $request = getRequest();

        if (!isset($request["username"])) {
            return returnResponse(false, ["username_not_found"]);
        }

        $result = $this->Sweepstake_model->registerToSweepstake($request);

        if ($result === "record_saved_successfully") {
            return returnResponse(true, ["record_saved_successfully"]);
        } 
        return returnResponse(false, [$result]);
    }

    public function getAllSweepstake() {
        $request = getRequest();
        $result = $this->Sweepstake_model->getAllSweepstake();
        return returnResponse(true, ["data_success"], $result);
    }

    public function removeSweepstake() {
        $request = getRequest();

        $result = $this->Sweepstake_model->removeSweepstake($request);
        return returnResponse(true, [$result]);
    }

    public function createSweepstake() {
        $request = getRequest();

        if(getimagesize($_FILES['image']['tmp_name']) == FALSE ) {
            // return returnResponse(true, ["image_not_found"]);
        } else {   
            // $uploaddir = '/opt/lampp/htdocs/kemalproje/frontend/src/assets/img/';
            $uploaddir = '../images/';
            $uploadfile = $uploaddir . basename($_POST["filename"]);

            move_uploaded_file($_FILES['image']['tmp_name'], $uploadfile);
        }
        
        $result = $this->Sweepstake_model->createSweepstake($request);
        return returnResponse(true, [$result]);
    }

    public function getAllRegisteredUser() {
        $request = getRequest();
        $result = $this->Sweepstake_model->getAllRegisteredUser($request);
        return returnResponse(true, ["data"], $result);
    }
    
    public function setWinner() {
        $request = getRequest();
        
        $result = $this->Sweepstake_model->setWinner($request);
        return returnResponse(true, ["finished"]);
    }
}