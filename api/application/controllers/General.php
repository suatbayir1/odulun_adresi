<?php

class General extends CI_Controller {
    public function __construct()
    {
        parent::__construct();
        $this->load->model("General_model");
        getHeader();
    }

    public function sendMessageToAdmin() {
        $request = getRequest();

        $result = $this->General_model->sendMessageToAdmin($request);
        return returnResponse(true, [$result]);
    }

    public function getHomeGeneralInfo() {
        $result = $this->General_model->getHomeGeneralInfo();
        return returnResponse(true, ["get_general_info"], $result);
    }

    public function updateGeneralInfo() {
        $request = getRequest();
        $result = $this->General_model->updateGeneralInfo($request);
        return returnResponse(true, ["general_info_updated"]);
    }

    public function getGeneralInfo() {
        $result = $this->General_model->getGeneralInfo();
        return returnResponse(true, ["get_genera_info"], $result);
    }

    public function getAllCities() {
        $result = $this->General_model->getAllCities();
        return returnResponse(true, ["cities"], $result);
    }

    public function getTowns() {
        $request = getRequest();
        $result = $this->General_model->getTowns($request);
        return returnResponse(true, ["towns"], $result);
    }

    public function getMultipleTowns() {
        $request = getRequest();
        $result = $this->General_model->getMultipleTowns($request);
        return returnResponse(true, ["towns"], $result);
    }

    public function changeLogo() {
        if(getimagesize($_FILES['image']['tmp_name']) == FALSE ) {
            return returnResponse(true, ["image_not_found"]);
        } else {   
            // $uploaddir = '/opt/lampp/htdocs/kemalproje/frontend/src/assets/img/';
            $uploaddir = '../images/';
            $uploadfile = $uploaddir . basename($_POST["filename"]);

            if (move_uploaded_file($_FILES['image']['tmp_name'], $uploadfile)) {
              $this->General_Model->changeLogo($_POST["filename"], $_POST["username"]);
              return returnResponse(true, ["image_changed"]);
            } else {
                  return returnResponse(true, ["error"]);
            }
        }
    }
}
