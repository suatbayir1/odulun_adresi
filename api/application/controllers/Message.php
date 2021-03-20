<?php

class Message extends CI_Controller {
    public function __construct()
    {
        parent::__construct();
        getHeader();
        $this->load->model('Message_model');
    }

    public function getAllMessage() {
        $result = $this->Message_model->getAllMessage();
        return returnResponse(true, ["get_messsages"], $result);
    }
}