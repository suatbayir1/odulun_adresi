<?php

class User extends CI_Controller {
    public function __construct()
    {
        parent::__construct();
        getHeader();
        $this->load->model('User_model');
    }

    public function getBestPlayerByNumber() {
        $request = getRequest();
        $payload =  [];

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

        $result = $this->User_model->getBestPlayerByNumber($payload);
        $totalRecordCount = $this->User_model->getPlayerRecordCount();

        if(empty($result)) {
            return returnResponse(false, ["users_empty"]);
        }
        return returnResponse(true, ["get_best_users_successfully"], $result, ["totalRecordCount" => $totalRecordCount]);
    }

    public function getUserInfo() {
        $request = getRequest();

        if (!isset($request["username"])) {
            return returnResponse(false, ["username_cannot_be_empty"]);
        }


        $result = $this->User_model->getUserInfo($request["username"]);

        if(empty($result)) {
            return returnResponse(false, ["user_not_found"]);
        }
        return returnResponse(true, ["get_user_successfully"], $result);
    }

    public function updateUser() {
        $request = getRequest();

        $result = $this->User_model->updateUser($request);

        if ($result) {
            return returnResponse(true, ["update_user_successfully"]);
        }
        return returnResponse(false, ["user_could_not_be_updated"]);
    }

    public function changeUserPassword() {
        $request = getRequest();

        $result = $this->User_model->changeUserPassword($request);

        if ($result === "password_changed_successfully") {
            return returnResponse(true, ["password_changed_successfully"]);
        }
        return returnResponse(false, [$result]);
    }

    public function getAllUsers() {
        $request = getRequest();
        $result = $this->User_model->getAllUsers($request);
        return returnResponse(true, ["get_all_users"], $result);
    }

    public function removeUser() {
        $request = getRequest();
        $result = $this->User_model->removeUser($request);
        return returnResponse(true, ["removed_user"]);
    }

    public function passiveUser() {
        $request = getRequest();
        $result = $this->User_model->passiveUser($request);
        return returnResponse(true, ["passive_user"]);
    }

    public function activeUser() {
        $request = getRequest();
        $result = $this->User_model->activeUser($request);
        return returnResponse(true, ["active_user"]);
    }

    public function getUsersBySweepstakeWins() {
        $request = getRequest();
        $result = $this->User_model->getUsersBySweepstakeWins($request);
        return returnResponse(true, ["get_sweepstake_users"], $result);
    }

    public function isUserAdmin() {
        $request = getRequest();
        $result = $this->User_model->isUserAdmin($request);
        return returnResponse(true, [$result]);
    }

    public function isTeamMemberGreaterThanThree() {
        $request = getRequest();
        $result = $this->User_model->isTeamMemberGreaterThanThree($request);
        return returnResponse(true, [$result]);
    }

    public function changeUserProfileImage() {
        if(getimagesize($_FILES['image']['tmp_name']) == FALSE ) {
            // echo "Please select an Image..";
            return returnResponse(true, ["image_not_found"]);
        } else {   
            // $uploaddir = '/opt/lampp/htdocs/kemalproje/frontend/src/assets/img/';
            $uploaddir = '../images/';
            $uploadfile = $uploaddir . basename($_POST["filename"]);

            print_r($uploadfile);
            print_r($_FILES["image"]["tmp_name"]);

            if (move_uploaded_file($_FILES['image']['tmp_name'], $uploadfile)) {
              $this->User_model->changeUserProfileImage($_POST["filename"], $_POST["username"]);
              return returnResponse(true, ["image_changed"]);
            } else {
                  return returnResponse(true, ["error"]);
            }
        }
    }

    public function addRemoveScore() {
        $request = getRequest();
        $result = $this->User_model->addRemoveScore($request);
        return returnResponse(true, [$result]);
    }

    public function getChampionUser() {
        $result = $this->User_model->getChampionUser();
        
        if ($result != "empty_user_list") {
            return returnResponse(true, ["get_champion"], $result);
        }
        return "not_found_champion";
    }
}